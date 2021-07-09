import React from "react";
import { connect } from "react-redux";

import TitleDisplay from "./TitleDisplay";
import TitleForm from "./TitleForm";

const Title = (props) => {
  return (
    <div>
      <h1>{props.appName}</h1>
      {!props.editing ? <TitleDisplay /> : <TitleForm />}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    appName: state.title.appName,
    editing: state.title.editing,
  };
};

export default connect(mapStateToProps)(Title);
//mapStateToProps: a function that gets the current state and returns an object that is added to the components props.
//mapActionsToProps: a object that contains action creators that are added to the component's props AND automatically dispatched when called.
