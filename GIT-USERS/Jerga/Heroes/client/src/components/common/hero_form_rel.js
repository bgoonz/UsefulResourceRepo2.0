import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";

class RelationshipForm extends Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="hero-form-rel__main__base">
        <form onSubmit={handleSubmit}>
          <div className="hero-form-rel__main__base__input-text">
            <Field
              name="heroName_rel"
              component="input"
              type="text"
              placeholder="Hero's name"
            />
          </div>
          <div className="hero-form-rel__main__base__input-select">
            <Field name="relationship_rel" component="select">
              <option></option>
              <option value="Alliance">Alliance</option>
              <option value="Neutral">Neutral</option>
              <option value="Archenemy">Archenemy</option>
            </Field>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

// Decorate the form component
RelationshipForm = reduxForm({
  form: "hero", // a unique name for this form
})(RelationshipForm);

export default RelationshipForm;
