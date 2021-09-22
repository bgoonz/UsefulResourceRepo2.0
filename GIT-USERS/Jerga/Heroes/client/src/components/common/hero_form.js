import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";

class HeroForm extends Component {
  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <div className="hero-form__main__base">
        <form onSubmit={handleSubmit}>
          <div className="hero-form__main__base__input-text">
            <Field
              name="heroName"
              component="input"
              type="text"
              placeholder="Hero's name"
            />
          </div>
          <div className="hero-form__main__base__input-text">
            <Field
              name="relHero"
              component="input"
              type="text"
              placeholder="Relationship To..."
            />
          </div>
          <div className="hero-form__main__base__input-select">
            <Field name="relationship" component="select">
              <option></option>
              <option value="Alliance">Alliance</option>
              <option value="Neutral">Neutral</option>
              <option value="Archenemy">Archenemy</option>
            </Field>
          </div>
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

// Decorate the form component
HeroForm = reduxForm({
  form: "hero-create", // a unique name for this form
})(HeroForm);

export default HeroForm;
