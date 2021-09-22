import React from "react";

class EditableComponent extends React.Component {
  constructor({ entity, field }) {
    super();

    this.state = {
      value: entity[field],
      originValue: entity[field],
      isActiveInput: false,
    };
  }

  update = () => {
    const { value, originValue } = this.state;
    const { onUpdate, field } = this.props;

    if (value !== originValue) {
      onUpdate(
        { [field]: value },
        () => this.setState({ isActiveInput: false, originValue: value }),
        () => this.setState({ isActiveInput: false, value: originValue })
      );
    }
  };

  activateInput = () => this.setState({ isActiveInput: true });

  disableInput = () =>
    this.setState({ isActiveInput: false, value: this.state.originValue });

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  handleKeyDown = (event) => {
    if (event.key === "Enter") {
      this.update();
    } else if (event.key === "Escape") {
      this.disableInput();
    }
  };

  renderView = () => {
    const {
      className,
      transformView,
      viewComponent: ViewComponent,
    } = this.props;
    const { value } = this.state;
    const viewValue = transformView ? transformView(value) : `${value}`;

    if (ViewComponent) {
      return (
        <ViewComponent
          value={viewValue}
          className={`editable-item ${className}`}
        />
      );
    }

    return <span className={`editable-item ${className}`}>{viewValue}</span>;
  };

  renderComponentView = () => {
    const { value, isActiveInput } = this.state;
    const { renderComponent } = this.props;
    if (isActiveInput) {
      return (
        <>
          {renderComponent(value, this.handleChange, this.handleKeyDown)}
          <div className="button-container">
            <button
              onClick={this.update}
              className="btn btn-success btn-editable"
            >
              Save
            </button>
            <button
              onClick={this.disableInput}
              className="btn btn-danger btn-editable"
            >
              Cancel
            </button>
          </div>
        </>
      );
    }

    return (
      <>
        {this.renderView()}
        <div className="button-container">
          <button
            onClick={this.activateInput}
            className="btn btn-warning btn-editable"
          >
            Edit
          </button>
        </div>
      </>
    );
  };

  render() {
    const { containerType } = this.props;
    let containerClass = "";
    if (containerType === "inline") {
      containerClass = "editable-component-inline";
    } else if (containerType === "block") {
      containerClass = "editable-component-block";
    }
    return (
      <div className={`editable-component ${containerClass}`}>
        {this.renderComponentView()}
      </div>
    );
  }
}

export default EditableComponent;
