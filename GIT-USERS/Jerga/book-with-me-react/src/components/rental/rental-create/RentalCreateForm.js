import { Field, reduxForm } from "redux-form";
import React from "react";
import { BwmInput } from "components/shared/form/BwmInput";
import { BwmSelect } from "components/shared/form/BwmSelect";
import { BwmResError } from "components/shared/form/BwmError";
import { BwmFileUpload } from "components/shared/form/BwmFileUpload";
import { BwmTextField } from "components/shared/form/BwmTextField";
import { minLength6, required } from "components/shared/form/validators";

class RentalCreateForm extends React.Component {
  render() {
    const {
      handleSubmit,
      pristine,
      submitting,
      submitCb,
      valid,
      errors,
      options,
    } = this.props;

    return (
      <form onSubmit={handleSubmit(submitCb)}>
        <Field
          name="title"
          component={BwmInput}
          type="text"
          label="Title"
          className="form-control"
          validate={[required, minLength6]}
        />
        <Field
          className="form-control"
          name="city"
          component={BwmInput}
          type="text"
          label="City"
        />
        <Field
          className="form-control"
          name="street"
          component={BwmInput}
          type="text"
          label="Street"
        />

        <Field
          className="form-control"
          name="description"
          component={BwmTextField}
          label="Description"
          rows="6"
          validate={[required, minLength6]}
        />

        <Field
          className="form-control"
          name="category"
          options={options}
          component={BwmSelect}
          label="Category"
          validate={required}
        />

        <Field
          className="form-control"
          name="image"
          component={BwmFileUpload}
          label="Image"
          validate={required}
        />

        <Field
          className="form-control"
          name="bedrooms"
          component={BwmInput}
          type="number"
          label="Bedrooms"
        />

        <Field
          className="form-control"
          name="dailyRate"
          component={BwmInput}
          type="number"
          symbol="$"
          label="Daily Rate"
        />

        <Field
          className="form-control"
          name="shared"
          component={BwmInput}
          type="checkbox"
          label="Shared"
        />

        <button
          className="btn btn-bwm"
          type="submit"
          disabled={!valid || pristine || submitting}
        >
          Create Rental
        </button>
        <BwmResError errors={errors} />
      </form>
    );
  }
}

export default reduxForm({
  form: "rentalForm",
  initialValues: { shared: false },
})(RentalCreateForm);
