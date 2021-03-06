import { Dropdown, IDropdownOption, ResponsiveMode } from '@fluentui/react';
import * as React from 'react';
import { IGetSliceRequest } from '../../client/datascience/data-viewing/types';
import { getLocString } from '../react-common/locReactSide';
import { measureText } from '../react-common/textMeasure';
import {
    fullSliceExpression,
    isValidSliceExpression,
    preselectedSliceExpression,
    sliceRegEx,
    validateSliceExpression as getErrorMessage
} from './helpers';

import './sliceControl.css';

// These styles are passed to the FluentUI dropdown controls
const styleOverrides = {
    color: 'var(--vscode-dropdown-foreground)',
    backgroundColor: 'var(--vscode-dropdown-background)',
    fontFamily: 'var(--vscode-font-family)',
    fontWeight: 'var(--vscode-font-weight)',
    fontSize: 'var(--vscode-font-size)',
    border: 'var(--vscode-dropdown-border)',
    ':focus': {
        color: 'var(--vscode-dropdown-foreground)'
    },
    ':active': {
        color: 'var(--vscode-dropdown-foreground)'
    },
    ':hover': {
        color: 'var(--vscode-dropdown-foreground)',
        backgroundColor: 'var(--vscode-dropdown-background)'
    }
};
const dropdownStyles = {
    root: {
        color: 'var(--vscode-dropdown-foreground)'
    },
    dropdownItems: {
        ...styleOverrides,
        selectors: {
            '@media(min-width: 300px)': {
                maxHeight: 100
            }
        }
    },
    caretDown: {
        visibility: 'hidden' // Override the FluentUI caret and use ::after selector on the caretDownWrapper in order to match VS Code. See sliceContro.css
    },
    callout: styleOverrides,
    dropdownItem: styleOverrides,
    dropdownItemSelected: {
        color: 'var(--vscode-dropdown-foreground)',
        fontFamily: 'var(--vscode-font-family)',
        fontWeight: 'var(--vscode-font-weight)',
        fontSize: 'var(--vscode-font-size)',
        backgroundColor: 'var(--vscode-dropdown-background)',
        opacity: '0.3'
    },
    dropdownItemDisabled: {
        color: 'var(--vscode-dropdown-foreground)',
        fontFamily: 'var(--vscode-font-family)',
        fontWeight: 'var(--vscode-font-weight)',
        fontSize: 'var(--vscode-font-size)',
        backgroundColor: 'var(--vscode-dropdown-background)',
        opacity: '0.3'
    },
    dropdownItemSelectedAndDisabled: {
        color: 'var(--vscode-dropdown-foreground)',
        fontFamily: 'var(--vscode-font-family)',
        fontWeight: 'var(--vscode-font-weight)',
        fontSize: 'var(--vscode-font-size)',
        backgroundColor: 'var(--vscode-dropdown-background)',
        opacity: '0.3'
    }
};

interface ISliceControlProps {
    loadingData: boolean;
    originalVariableShape: number[];
    sliceExpression: string | undefined;
    handleSliceRequest(slice: IGetSliceRequest): void;
}

interface ISliceControlState {
    inputValue: string;
    isEnabled: boolean;
    errorMessage: string;
    [key: string]: number | boolean | string;
}

export class SliceControl extends React.Component<ISliceControlProps, ISliceControlState> {
    constructor(props: ISliceControlProps) {
        super(props);
        const initialSlice = preselectedSliceExpression(this.props.originalVariableShape);
        this.state = { isEnabled: false, inputValue: initialSlice, errorMessage: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    public render() {
        const isDisabled = !this.state.isEnabled || this.props.loadingData;
        return (
            <div className="control-container">
                <details className="slicing-control">
                    <summary className="slice-summary">
                        <span className="slice-summary-detail">
                            {getLocString('DataScience.sliceSummaryTitle', 'SLICING')}
                        </span>
                        {this.renderReadonlyIndicator()}
                    </summary>
                    <form onSubmit={this.handleSubmit} className="slice-form">
                        <div className="slice-enablement-checkbox-container">
                            <div className="slice-control-row">
                                <div
                                    role="checkbox"
                                    className={`checkbox${this.state.isEnabled ? ' checked' : ''}`}
                                    onClick={this.toggleEnablement}
                                />
                                <span className="checkbox-label" onClick={this.toggleEnablement}>
                                    {getLocString('DataScience.sliceData', 'Slice Data')}
                                </span>
                            </div>
                        </div>
                        <div className="slice-control-row slice-form-container" style={{ marginTop: '10px' }}>
                            <div className="slice-control-column">
                                <input
                                    value={this.state.inputValue}
                                    onChange={this.handleChange}
                                    className={this.state.errorMessage ? 'slice-data input-invalid' : 'slice-data'}
                                    autoComplete="on"
                                    disabled={isDisabled}
                                />
                                {this.state.errorMessage ? (
                                    <div className={`error-message${isDisabled ? ' disabled' : ''}`}>
                                        {this.state.errorMessage}
                                    </div>
                                ) : null}
                            </div>
                            <input
                                className="submit-slice-button"
                                type="submit"
                                disabled={isDisabled}
                                value={getLocString('DataScience.sliceSubmitButton', 'Apply')}
                            />
                        </div>
                        {this.generateDropdowns()}
                    </form>
                </details>
            </div>
        );
    }

    private generateIndexHandler = (index: number) => {
        return (_data: React.FormEvent, option: IDropdownOption | undefined) => {
            const state: { [key: string]: number } = {};
            state[`selectedIndex${index}`] = option?.key as number;
            this.setState(state);
            this.applyDropdownsToInputBox();
        };
    };

    private generateAxisHandler = (index: number) => {
        return (_data: React.FormEvent, option: IDropdownOption | undefined) => {
            const state: { [key: string]: number } = {};
            state[`selectedAxis${index}`] = option?.key as number;
            this.setState(state);
            this.applyDropdownsToInputBox();
        };
    };

    private generateDropdowns = () => {
        const ndim = this.props.originalVariableShape.length;
        const numDropdowns = Math.max(ndim - 2, 1); // Ensure at least 1 set of dropdowns for 2D data
        const dropdowns = [];
        const styles = {
            ...dropdownStyles,
            dropdown: {
                width: measureText(Math.max(...this.props.originalVariableShape).toString(), null) + 40
            }
        };

        for (let i = 0; i < numDropdowns; i++) {
            const updateIndexHandler = this.generateIndexHandler(i);
            const updateAxisHandler = this.generateAxisHandler(i);
            const axisOptions = this.generateAxisDropdownOptions();
            const indexOptions = this.generateIndexDropdownOptions(i);
            const axisKey = this.state[`selectedAxis${i}`] as number;
            const indexKey = this.state[`selectedIndex${i}`] as number;

            dropdowns.push(
                <div className="slice-control-row slice-form-container">
                    <Dropdown
                        responsiveMode={ResponsiveMode.xxxLarge}
                        label={getLocString('DataScience.sliceDropdownAxisLabel', 'Axis')}
                        style={{ marginRight: '10px' }}
                        styles={styles}
                        disabled={!this.state.isEnabled || this.props.loadingData}
                        selectedKey={axisKey}
                        key={`axis${i}`}
                        options={axisOptions}
                        className="dropdownTitleOverrides"
                        onChange={updateAxisHandler}
                    />
                    <Dropdown
                        responsiveMode={ResponsiveMode.xxxLarge}
                        label={getLocString('DataScience.sliceDropdownIndexLabel', 'Index')}
                        styles={styles}
                        disabled={
                            !this.state.isEnabled ||
                            this.state[`selectedAxis${i}`] === undefined ||
                            this.state[`selectedAxis${i}`] === null ||
                            this.props.loadingData
                        }
                        selectedKey={indexKey}
                        key={`index${i}`}
                        options={indexOptions}
                        className="dropdownTitleOverrides"
                        onChange={updateIndexHandler}
                    />
                </div>
            );
        }
        return dropdowns;
    };

    private renderReadonlyIndicator = () => {
        if (this.state.isEnabled && this.props.sliceExpression) {
            return <span className="slice-summary-detail current-slice">{this.props.sliceExpression}</span>;
        }
    };

    private toggleEnablement = () => {
        const willBeEnabled = !this.state.isEnabled;
        const newState = { isEnabled: willBeEnabled };
        const fullSlice = fullSliceExpression(this.props.originalVariableShape);
        // Don't send slice request unless necessary
        if (willBeEnabled) {
            // Enabling slicing
            if (this.state.inputValue !== this.props.sliceExpression && this.state.inputValue !== fullSlice) {
                this.props.handleSliceRequest({ slice: this.state.inputValue });
            }
        } else {
            // Disabling slicing
            if (this.state.inputValue !== fullSlice) {
                this.props.handleSliceRequest({ slice: undefined });
            }
        }
        this.applyInputBoxToDropdowns();
        this.setState(newState);
    };

    private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.currentTarget.value ?? '';
        const errorMessage = getErrorMessage(newValue, this.props.originalVariableShape);
        this.setState({ inputValue: newValue ?? '', errorMessage });
    };

    private handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        if (
            this.state.inputValue !== this.props.sliceExpression &&
            isValidSliceExpression(this.state.inputValue, this.props.originalVariableShape)
        ) {
            // Update axis and index dropdown selections
            this.applyInputBoxToDropdowns();
            this.props.handleSliceRequest({
                slice: this.state.inputValue
            });
        }
    };

    private applyInputBoxToDropdowns = () => {
        setTimeout(() => {
            const shape = this.state.inputValue;
            if (shape.startsWith('[') && shape.endsWith(']')) {
                const dropdowns: { axis: number; index: number }[] = [];
                let numRangeObjects = 0;
                shape
                    .substring(1, shape.length - 1)
                    .split(',')
                    .forEach((shapeEl, idx) => {
                        // Validate the slice object
                        const match = sliceRegEx.exec(shapeEl);
                        if (match?.groups?.Start && !match.groups.Stop) {
                            // Can map index expressions like [2, :, :] to dropdowns
                            dropdowns.push({ axis: idx, index: parseInt(match.groups.Start) });
                        } else if (match?.groups?.StopRange !== undefined || match?.groups?.StartRange !== undefined) {
                            // Can't map expressions like [0:, :] to dropdown
                            numRangeObjects += 1;
                        }
                    });
                const state = {};
                const ndim = this.props.originalVariableShape.length;
                if (numRangeObjects === 0 && dropdowns.length === Math.max(1, ndim - 2)) {
                    // Apply values to dropdowns
                    for (let i = 0; i < dropdowns.length; i++) {
                        const selection = dropdowns[i];
                        (state as any)[`selectedAxis${i.toString()}`] = selection.axis;
                        (state as any)[`selectedIndex${i.toString()}`] = selection.index;
                    }
                } else {
                    // Unset dropdowns
                    for (const key in this.state) {
                        if (key.startsWith('selected')) {
                            (state as any)[key] = null;
                        }
                    }
                }
                this.setState(state);
            }
        });
    };

    private applyDropdownsToInputBox = () => {
        setTimeout(() => {
            const shape = this.props.originalVariableShape.map(() => ':');
            const ndim = this.props.originalVariableShape.length;
            const numDropdowns = Math.max(ndim - 2, 1); // Ensure at least 1 set of dropdowns for 2D data
            let numSpecifiedIndices = 0; // Ensure enough dropdowns have been specified

            for (let i = 0; i < numDropdowns; i++) {
                const selectedAxisKey = this.state[`selectedAxis${i}`] as number;
                const selectedIndexKey = this.state[`selectedIndex${i}`] as number;
                if (
                    selectedAxisKey !== null &&
                    selectedAxisKey !== undefined &&
                    selectedIndexKey !== null &&
                    selectedIndexKey !== undefined
                ) {
                    shape[selectedAxisKey] = selectedIndexKey.toString();
                    numSpecifiedIndices += 1;
                }
            }

            const newSliceExpression = '[' + shape.join(', ') + ']';
            const fullSlice = fullSliceExpression(this.props.originalVariableShape);
            if (
                numSpecifiedIndices === numDropdowns &&
                newSliceExpression !== this.props.sliceExpression &&
                newSliceExpression !== fullSlice
            ) {
                this.setState({ inputValue: newSliceExpression });
                this.props.handleSliceRequest({ slice: newSliceExpression });
            }
        });
    };

    private generateAxisDropdownOptions = () => {
        const selectedAxes = new Set();
        for (const key in this.state) {
            if (key.startsWith('selectedAxis')) {
                selectedAxes.add(this.state[key]);
            }
        }
        // Disable axes which are already selected in other dropdowns
        // in order to prevent users from selecting the same axis twice
        return this.props.originalVariableShape.map((_val, idx) => {
            return { key: idx, text: idx.toString(), disabled: selectedAxes.has(idx) };
        });
    };

    private generateIndexDropdownOptions = (dropdownIndex: number) => {
        const axisSelection = this.state[`selectedAxis${dropdownIndex}`];
        if (axisSelection !== undefined) {
            const range = this.props.originalVariableShape[axisSelection as number];
            const result = [];
            for (let i = 0; i < range; i++) {
                result.push({ key: i, text: i.toString() });
            }
            return result;
        }
        return [];
    };
}
