import React from "react";
import RelationshipForm from "../common/hero_form_rel";
import * as actions from "../../actions/index";
import { connect } from "react-redux";
import { reset } from "redux-form";

class CreateRelationship extends React.Component {
  handleSubmit(values) {
    var { dispatch } = this.props;
    dispatch(actions.setRelation({ yourHeroName: this.props.name, ...values }));
    dispatch(reset("hero"));
  }

  render() {
    return <RelationshipForm onSubmit={this.handleSubmit.bind(this)} />;
  }
}

export default connect()(CreateRelationship);
