import React from "react";
import { Formik, Form } from "formik";

import FormRow from "shared/Forms/Row";

const EmailPasswordForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        let errors = {};
        if (!values.email) errors.email = "Required";
        if (!values.password) errors.password = "Required";
        return errors;
      }}
    >
      {() => (
        <Form>
          <FormRow autoComplete={false} label={null} name="email" />

          <FormRow name="password" label={null} type="password" />

          <div className="row justify-content-between no-gutters">
            <button className="btn btn-primary btn-block" type="submit">
              Sign in with email + password
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EmailPasswordForm;
