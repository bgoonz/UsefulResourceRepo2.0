import React from "react";
import EditableComponent from "./EditableComponent";

export class EditableTextarea extends React.Component {
  render() {
    const { className, rows, cols } = this.props;
    return (
      <EditableComponent
        {...this.props}
        renderComponent={(value, onChange, onKeyDown) => (
          <textarea
            onKeyDown={onKeyDown}
            onChange={onChange}
            className={`editable-item ${className}`}
            value={value}
            rows={rows}
            cols={cols}
          />
        )}
      />
    );
  }
}
