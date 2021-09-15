import React from "react";
import { Field, reduxForm } from "redux-form";
import { BwmInput } from "components/shared/form/BwmInput";
import { BwmResError } from "components/shared/form/BwmError";

class LoginForm extends React.Component {
  render() {
    const { handleSubmit, pristine, submitting, submitCb, valid, errors } =
      this.props;

    return (
      <form onSubmit={handleSubmit(submitCb)}>
        <Field
          name="email"
          component={BwmInput}
          type="email"
          label="Email"
          className="form-control"
        />
        <Field
          name="password"
          component={BwmInput}
          type="password"
          label="Password"
          className="form-control"
        />

        <button
          className="btn btn-bwm"
          type="submit"
          disabled={!valid || pristine || submitting}
        >
          Login
        </button>
        <BwmResError errors={errors} />
      </form>
    );
  }
}

export default reduxForm({
  form: "loginForm",
})(LoginForm);
