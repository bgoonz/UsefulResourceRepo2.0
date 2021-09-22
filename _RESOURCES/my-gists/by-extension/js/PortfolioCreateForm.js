import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import PortInput from "../form/PortInput";
import PortDate from "../form/PortDate";
import { Button, Alert } from "reactstrap";

import { loadGetInitialProps } from "next/dist/next-server/lib/utils";

const validateInputs = (values) => {
  let errors = {};

  Object.entries(values).forEach(([key, value]) => {
    if (!values[key] && key !== "endDate") {
      errors[key] = `Field ${key} is required`;
    }
  });

  const startDate = new Date(values.startDate);
  const endDate = new Date(values.endDate);
  console.log("ilam", startDate);

  if (startDate && endDate && endDate.getTime() < startDate.getTime()) {
    errors.endDate = "end date cannot be before startdate";
  }

  return errors;
};

const PortfolioCreateForm = ({ initialValues, onSubmit, error }) => (
  <div>
    <Formik
      initialValues={initialValues}
      validate={validateInputs}
      onSubmit={(values, actions) => {
        return onSubmit(values, { setSubmitting: actions.setSubmitting });
      }}
      // onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type="text" name="title" component={PortInput} label="Title" />

          <Field
            type="text"
            name="company"
            component={PortInput}
            label="Company"
          />

          <Field
            type="text"
            name="location"
            component={PortInput}
            label="Location"
          />

          <Field
            type="text"
            name="position"
            component={PortInput}
            label="Position"
          />

          <Field
            type="textarea"
            name="description"
            component="textarea"
            label="Description"
          />

          <Field name="startDate" component={PortDate} label="Start Date" />

          <Field
            name="endDate"
            component={PortDate}
            label="End Date"
            canBeDisabled={true}
          />
          {error && <Alert color="danger">{error}</Alert>}
          <Button
            color="success"
            size="lg"
            type="submit"
            disabled={isSubmitting}
          >
            Create
          </Button>
        </Form>
      )}
    </Formik>
  </div>
);

export default PortfolioCreateForm;
