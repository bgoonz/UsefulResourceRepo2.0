import { Field, reduxForm } from "redux-form";
import React from "react";
import { BwmInput } from "components/shared/form/BwmInput";
import { BwmResError } from "components/shared/form/BwmError";

class RegisterForm extends React.Component {
  render() {
    const { handleSubmit, pristine, submitting, submitCb, valid, errors } =
      this.props;

    return (
      <form onSubmit={handleSubmit(submitCb)}>
        <Field
          name="username"
          component={BwmInput}
          type="text"
          label="Username"
          className="form-control"
        />
        <Field
          className="form-control"
          name="email"
          component={BwmInput}
          type="email"
          label="Email"
        />
        <Field
          className="form-control"
          name="password"
          component={BwmInput}
          type="password"
          label="Password"
        />
        <Field
          className="form-control"
          name="passwordConfirmation"
          component={BwmInput}
          type="password"
          label="Password Confirmation"
        />
        <button
          className="btn btn-bwm"
          type="submit"
          disabled={!valid || pristine || submitting}
        >
          Register
        </button>
        <BwmResError errors={errors} />
      </form>
    );
  }
}

function validate(formProps) {
  const errors = {};

  if (!formProps.username) {
    errors.username = "Please enter a username";
  }

  if (!formProps.email) {
    errors.email = "Please enter a email";
  }

  if (!formProps.password) {
    errors.password = "Please enter a password";
  }

  if (!formProps.passwordConfirmation) {
    errors.passwordConfirmation = "Please enter a passwordConfirm";
  }

  if (formProps.password !== formProps.passwordConfirmation) {
    errors.password = "Passwords must match";
  }

  return errors;
}

export default reduxForm({
  form: "registerForm",
  validate,
})(RegisterForm);
