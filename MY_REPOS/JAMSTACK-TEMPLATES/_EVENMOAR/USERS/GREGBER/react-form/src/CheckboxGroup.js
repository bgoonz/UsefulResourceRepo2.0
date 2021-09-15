import React, {PropTypes} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import ControlWrapper from './ControlWrapper';
import ControlMixin from './ControlMixin';
import Formsy from 'formsy-react';

const DEFAULT_VALUE = [];

export default React.createClass({
  displayName: 'CheckboxGroup',

  propTypes: {
    className: PropTypes.string,
    onChange: PropTypes.func,
    options: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.object,
    ]),
    value: PropTypes.arrayOf(PropTypes.string),
  },

  getDefaultProps() {
    return {value: DEFAULT_VALUE, options: []};
  },

  mixins: [Formsy.Mixin, ControlMixin, PureRenderMixin],

  /**
   * Render checkboxes.
   *
   * @returns {ReactElement[]}
   */

  renderCheckboxes() {
    return this.getOptions().map(this.renderCheckbox);
  },

  /**
   * Render checkbox input.
   *
   * @returns {ReactElement}
   */

  renderCheckbox(entry, index) {
    const {className} = this.props;
    const checked = this.props.value === DEFAULT_VALUE || this.props.value === null
      ? null : this.props.value.indexOf(entry.value) !== -1;
    const props = {
      ...this.getControlProps(),
      id: null,
      className: className === 'form-control' ? null : className,
      value: entry.value,
      type: 'checkbox',
      checked,
      ref: index,
      onChange: this.onChange,
    };
    return (
      <label
        className="checkbox-inline"
        key={index}
      >
        <input {...props} />{entry.label}
      </label>
    );
  },

  /**
   * Called when the value changes.
   *
   * @param {SyntheticEvent} event
   */

  onChange() {
    const value = this.getOptions().reduce((value, option, index) => {
      if (this.refs[index].checked)
        value.push(option.value);
      return value;
    }, []);
    this.changeValue(value);
  },

  render() {
    return (
      <ControlWrapper {...this.getWrapperProps()}>
        {this.renderCheckboxes()}
      </ControlWrapper>
    );
  },
});
