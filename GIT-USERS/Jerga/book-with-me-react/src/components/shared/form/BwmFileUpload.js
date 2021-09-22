import React, { Component } from "react";

export class BwmFileUpload extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const {
      input: { onChange },
    } = this.props;
    // onChange(e.target.files[0])
    onChange(
      "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/13/image.jpeg"
    );
  }

  render() {
    const {
      label,
      meta: { touched, error },
    } = this.props;

    return (
      <div className="form-group">
        <label>{label}</label>
        <div>
          <input
            type="file"
            accept=".jpg, .png, .jpeg"
            onChange={this.onChange}
          />
          {touched && error && (
            <div className="alert alert-danger">{error}</div>
          )}
        </div>
      </div>
    );
  }
}
