import React from "react";
class AlertButton extends React.Component {
  constructor() {
    super();
    this.showAlert = this.showAlert.bind(this); // binding context
  }
  showAlert() {
    console.log(this);
  }
  render() {
    return (
      <button type="button" onClick={this.showAlert}>
        Submit
      </button>
    );
  }
}
export default AlertButton;