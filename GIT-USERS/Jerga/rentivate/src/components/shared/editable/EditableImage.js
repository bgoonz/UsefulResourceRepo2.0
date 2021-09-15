import React from "react";
import { EditableComponent } from "./EditableComponent";
import { FileUpload } from "../form/FileUpload";

export class EditableImage extends EditableComponent {
  constructor() {
    super();

    this.handleImageUpload = this.handleImageUpload.bind(this);
  }

  handleImageUpload(image) {
    this.setState({ value: image });

    this.update();
  }

  render() {
    const { isActive, value } = this.state;

    return (
      <div className="editableComponent">
        {!isActive && (
          <React.Fragment>
            <img src={value} alt="" />
            <button
              onClick={() => this.enableEdit()}
              className="btn btn-warning btn-editable btn-editable-image"
              type="button"
            >
              {" "}
              Edit
            </button>
          </React.Fragment>
        )}

        {isActive && (
          <React.Fragment>
            <button
              onClick={() => this.disableEdit()}
              className="btn btn-warning btn-editable btn-editable-image"
              type="button"
            >
              {" "}
              Close
            </button>
            <FileUpload onChange={this.handleImageUpload}></FileUpload>
          </React.Fragment>
        )}
      </div>
    );
  }
}
