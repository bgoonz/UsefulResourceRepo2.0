import React from "react";
class AlertButton extends React.Component {
  showAlert = () => {
    window.alert("Button Clicked!");
  };
  render() {
    return (
      <button type="button" onClick={this.showAlert}>
        Submit
      </button>
    );
  }
}