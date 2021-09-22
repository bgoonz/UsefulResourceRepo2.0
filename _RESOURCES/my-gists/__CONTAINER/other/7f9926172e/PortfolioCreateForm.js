import React from "react";
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

class PortfolioCreateForm extends React.Component {
  constructor() {
    super();
    this.inputs = [];
  }

  handleKeyPress = (value, event) => {
    if (event.key === "Enter") {
      this.inputs[value].focus();
    }
  };

  setRef = (name) => (input) => {
    this.inputs[name] = input;
  };

  render() {
    const { initialValues, onSubmit, error } = this.props;
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
                setRef={this.setRef("title")}
                label="Title"
                type="text"
                name="title"
                onKeyPress={(event) => this.handleKeyPress("company", event)}
                component={PortInput}
              />
              <Field
                setRef={this.setRef("company")}
                label="Company"
                type="text"
                name="company"
                component={PortInput}
                onKeyPress={(event) => this.handleKeyPress("location", event)}
              />
              <Field
                setRef={this.setRef("location")}
                label="Location"
                type="text"
                name="location"
                component={PortInput}
                onKeyPress={(event) => this.handleKeyPress("position", event)}
              />
              <Field
                setRef={this.setRef("position")}
                label="Position"
                type="text"
                name="position"
                component={PortInput}
                onKeyPress={(event) =>
                  this.handleKeyPress("description", event)
                }
              />
              <Field
                setRef={this.setRef("description")}
                label="Description"
                type="textarea"
                name="description"
                component={PortInput}
                onKeyPress={(event) => this.handleKeyPress("title", event)}
              />

              <button
                onClick={handleSubmit}
                type="button"
                disabled={isSubmitting}
              >
                Create
              </button>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

export default PortfolioCreateForm;
