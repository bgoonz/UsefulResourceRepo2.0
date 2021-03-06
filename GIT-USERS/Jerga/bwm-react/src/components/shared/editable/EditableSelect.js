import React from "react";
import { EditableComponent } from "./EditableComponent";

export class EditableSelect extends EditableComponent {
  renderOptions(options) {
    return options.map((option, index) => (
      <option key={index} value={option}>
        {" "}
        {`${option}`}{" "}
      </option>
    ));
  }

  renderComponentView() {
    const { value, isActive } = this.state;
    const { className, options } = this.props;

    if (isActive) {
      return (
        <React.Fragment>
          <select
            onChange={(event) => this.handleChange(event)}
            value={value}
            className={className}
          >
            {this.renderOptions(options)}
          </select>
          <button
            onClick={() => this.update()}
            className="btn btn-success btn-editable"
            type="button"
          >
            {" "}
            Save{" "}
          </button>
          <button
            onClick={() => this.disableEdit()}
            className="btn btn-warning btn-editable"
            type="button"
          >
            {" "}
            Close{" "}
          </button>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <span className={className}> {`${value}`} </span>
        <button
          onClick={() => this.enableEdit()}
          className="btn btn-warning btn-editable"
          type="button"
        >
          {" "}
          Edit{" "}
        </button>
      </React.Fragment>
    );
  }

  render() {
    return (
      <div className="editableComponent" style={this.props.containerStyle}>
        {this.renderComponentView()}
      </div>
    );
  }
}
