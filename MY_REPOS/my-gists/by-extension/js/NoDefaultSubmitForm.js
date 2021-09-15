import React from "react";
class NoDefaultSubmitForm extends React.Component {
  submitForm = (e) => {
    e.preventDefault();
    window.alert("Handling form submission...");
  };
  render() {
    return (
    <form onSubmit={this.submitForm}>
      <button>Submit</button>
    </form>;
    )}
}