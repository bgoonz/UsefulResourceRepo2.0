import React from "react";
import EditableComponent from "./EditableComponent";

export class EditableSelect extends React.Component {
  renderOptions = (options) =>
    options.map((option) => (
      <option key={option} value={option}>{`${option}`}</option>
    ));

  render() {
    const { className, options } = this.props;
    return (
      <EditableComponent
        {...this.props}
        renderComponent={(value, onChange, onKeyDown) => (
          <select
            onKeyDown={onKeyDown}
            onChange={onChange}
            className={`editable-item ${className}`}
            value={value}
          >
            {this.renderOptions(options)}
          </select>
        )}
      />
    );
  }
}
