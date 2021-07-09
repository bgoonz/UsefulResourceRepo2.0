import React from "react";
import { toggleEditing, updateTitle } from "./../actions/titleActions";

import { connect } from "react-redux";

import TitleDisplay from "./TitleDisplay";
import TitleForm from "./TitleForm";

const Title = (props) => {
  const handleTitleUpdate = (title) => {
    props.dispatch(updateTitle(title));
  };

  return (
    <div>
      <h1>{props.appName}</h1>
      {!props.editing ? (
        <TitleDisplay />
      ) : (
        <TitleForm handleTitleUpdate={handleTitleUpdate} />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    appName: state.appName,
    editing: state.editing,
  };
};

export default connect(mapStateToProps)(Title);
//mapStateToProps: a function that gets the current state and returns an object that is added to the components props.
//mapActionsToProps: a object that contains action creators that are added to the component's props AND automatically dispatched when called.
