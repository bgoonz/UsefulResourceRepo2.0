import React from "react";
import EditableComponent from "./EditableComponent";

export class EditableInput extends React.Component {
  render() {
    return (
      <EditableComponent
        {...this.props}
        renderComponent={(value, onChange, onKeyDown) => (
          <input
            onKeyDown={onKeyDown}
            value={value}
            onChange={onChange}
            className={`editable-item ${this.props.className}`}
          ></input>
        )}
      />
    );
  }
}
