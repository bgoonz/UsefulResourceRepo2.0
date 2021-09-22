import "./controls.scss";
import React, { Component } from "react";

export class TextInput extends Component {
  get value() {
    return this.input.value;
  }

  set value(value) {
    this.input.value = value;
  }

  render() {
    const props = this.props;
    return (
      <div className={`m-textbox ${props.className} || ""`}>
        <input type="text" {...props} ref={(c) => (this.input = c)} />
        <div className="border" />
      </div>
    );
  }
}
