// ./src/AlertButton.js
import React from "react";
class AlertButton extends React.Component {
  showAlert = () => {
    window.alert("Button clicked!");
    console.log(this);
  };
  render() {
    return (
      <button type="button" onClick={this.showAlert}>
        Click Me
      </button>
    );
  }
}
export default AlertButton;