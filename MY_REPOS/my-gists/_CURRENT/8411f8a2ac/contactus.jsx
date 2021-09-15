import React from "react";
class ContactUs extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      phone: "",
      phoneType: "",
      comments: "",
      validationErrors: [],
    };
  }
  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  // Vanilla JS Function for validating inputs
  validate(name, email) {
    const validationErrors = [];
    if (!name) {
      validationErrors.push("Please provide a Name");
    }
    if (!email) {
      validationErrors.push("Please provide an Email");
    }
    return validationErrors;
  }
  onSubmit = (e) => {
    // Prevent the default form behavior
    // so the page doesn't reload.
    e.preventDefault();
    // Retrieve the contact us information from state.
    const { name, email, phone, phoneType, comments } = this.state;
    // Get Validation Errors - proceeding destructuring values from this.state.
    const validationErrors = this.validate(name, email);
    // If we have errors...
    if (validationErrors.length > 0) {
      this.setState({ validationErrors });
    } else {
      // Proceed normally
      // Create a new object for the contact us information.
      const contactUsInformation = {
        name,
        email,
        phone,
        phoneType,
        comments,
        submittedOn: new Date(),
      };
      console.log(contactUsInformation);
      // Reset the form state.
      this.setState({
        name: "",
        email: "",
        phone: "",
        phoneType: "",
        comments: "",
        validationErrors: [],
      });
    }
  };
  render() {
    const {
      name,
      email,
      phone,
      phoneType,
      comments,
      validationErrors,
    } = this.state;
    return (
      <div>
        <h2>Contact Us</h2>
        {validationErrors.length > 0 && (
          <div>
            The following errors were found:
            <ul>
              {validationErrors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        <form onSubmit={this.onSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              name="name"
              type="text"
              onChange={this.onChange}
              value={name}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              name="email"
              type="text"
              onChange={this.onChange}
              value={email}
            />
          </div>
          <div>
            <label htmlFor="phone">Phone:</label>
            <input
              id="phone"
              name="phone"
              type="text"
              onChange={this.onChange}
              value={phone}
            />
            <select name="phoneType" onChange={this.onChange} value={phoneType}>
              <option value="">Select a phone type...</option>
              {this.props.phoneTypes.map((phoneType) => (
                <option key={phoneType}>{phoneType}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="comments">Comments:</label>
            <textarea
              id="comments"
              name="comments"
              onChange={this.onChange}
              value={comments}
            />
          </div>
          <div>
            <button>Submit</button>
          </div>
        </form>
      </div>
    );
  }
}
ContactUs.defaultProps = {
  phoneTypes: ["Home", "Work", "Mobile"],
};
export default ContactUs;