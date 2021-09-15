import React, { createRef, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, Alert } from "reactstrap";
import PortInput from "../form/PortInput";
import PortDate from "../form/PortDate";

import moment from "moment";

const validateInputs = (values) => {
  let errors = {};

  Object.entries(values).forEach(([key, value]) => {
    if (!values[key] && key !== "endDate") {
      errors[key] = `Field ${key} is required!`;
    }
  });

  const startDate = moment(values.startDate);
  const endDate = moment(values.endDate);

  if (startDate && endDate && endDate.isBefore(startDate)) {
    errors.endDate = "End Date cannot be before start date!!!";
  }

  return errors;
};

const INITIAL_VALUES = {
  title: "",
  company: "",
  location: "",
  position: "",
  description: "",
  startDate: "",
  endDate: "",
};

const PortfolioCreateForm = ({ initialValues, onSubmit, error }) => {
  let inputs = {};

  const handleKeyPress = (value, event) => {
    if (event.key === "Enter") {
      inputs[value].focus();
    }
  };

  const setRef = (name) => (input) => {
    inputs[name] = input;
  };

  return (
    <div>
      <Formik
        initialValues={INITIAL_VALUES}
        validate={validateInputs}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting, handleSubmit }) => (
          <Form>
            <Field
              innerRef={setRef("title")}
              label="Title"
              type="text"
              name="title"
              onKeyPress={(event) => handleKeyPress("company", event)}
              component={PortInput}
            />
            <Field
              innerRef={setRef("company")}
              label="Company"
              type="text"
              name="company"
              onKeyPress={(event) => handleKeyPress("location", event)}
              component={PortInput}
            />
            <Field
              innerRef={setRef("location")}
              label="Location"
              type="text"
              name="location"
              onKeyPress={(event) => handleKeyPress("position", event)}
              component={PortInput}
            />
            <Field
              innerRef={setRef("position")}
              label="Position"
              type="text"
              name="position"
              onKeyPress={(event) => handleKeyPress("description", event)}
              component={PortInput}
            />
            <Field
              innerRef={setRef("description")}
              label="Description"
              type="textarea"
              name="description"
              onKeyPress={(event) => handleKeyPress("title", event)}
              component={PortInput}
            />
            <Field label="Start Date" name="startDate" component={PortDate} />
            <Field label="End Date" name="endDate" component={PortDate} />
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              Create
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PortfolioCreateForm;
