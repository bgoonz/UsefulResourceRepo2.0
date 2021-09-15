import React from "react";
import HeroForm from "../common/hero_form";
import * as actions from "../../actions/index";
import { connect } from "react-redux";
import { reset } from "redux-form";

class CreateHero extends React.Component {
  handleSubmit(values) {
    var { dispatch } = this.props;
    dispatch(actions.createHero(values));
    dispatch(reset("hero-create"));
  }

  render() {
    return <HeroForm onSubmit={this.handleSubmit.bind(this)} />;
  }
}

export default connect()(CreateHero);
