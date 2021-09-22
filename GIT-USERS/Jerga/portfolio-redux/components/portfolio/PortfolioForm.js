import React from "react";
import { Field, reduxForm } from "redux-form";
import PortfolioDate from "./inputs/PortfolioDate";

// import { required, minLength4 } from 'components/shared/form/validators';

const PortfolioCreateForm = (props) => {
  const { handleSubmit, pristine, submitting, submitCb, valid, errors } = props;
  return (
    <form onSubmit={handleSubmit(submitCb)}>
      <label>Title</label>
      <Field
        name="title"
        type="text"
        className="form-control"
        component="input"
      />
      <label>Company</label>
      <Field
        name="company"
        type="text"
        label="Company"
        className="form-control"
        component="input"
      />
      <label>Location</label>
      <Field
        name="location"
        type="text"
        label="Location"
        className="form-control"
        component="input"
      />
      <label>Position</label>
      <Field
        name="position"
        type="text"
        label="Position"
        className="form-control"
        component="input"
      />
      <label>Description</label>
      <Field
        name="description"
        type="text"
        label="Description"
        rows="6"
        className="form-control"
        component="textarea"
      />
      <div>
        <Field
          name="startAt"
          label="Start Date"
          className="form-control"
          component={PortfolioDate}
        />
      </div>
      <div>
        <Field
          name="endAt"
          label="End Date"
          componentName="endDate"
          className="form-control"
          component={PortfolioDate}
        />
      </div>
      <button
        className="btn btn-bwm btn-form"
        type="submit"
        disabled={!valid || pristine || submitting}
      >
        Create Portfolio
      </button>
    </form>
  );
};

export default reduxForm({
  form: "portfolioCreateForm",
})(PortfolioCreateForm);
