import React, { useState, useReducer } from "react";
import { connect } from "react-redux";

// import { initialState, titleReducer } from '../reducers/titleReducer';

import { toggleEditing, updateTitle } from "../actions";

const Title = (props) => {
  const [newTitleText, setNewTitleText] = useState();
  // const [state, dispatch] = useReducer(titleReducer, initialState);

  const handleChanges = (e) => {
    setNewTitleText(e.target.value);
  };

  return (
    <div>
      {!props.editing ? (
        <h1>
          {props.title}{" "}
          <i
            className="far fa-edit"
            onClick={() => {
              // dispatch({ type: 'TOGGLE_EDITING' })
              props.toggleEditing();
            }}
          >
            ✎
          </i>
        </h1>
      ) : (
        <div>
          <input
            className="title-input"
            type="text"
            name="newTitleText"
            value={newTitleText}
            onChange={handleChanges}
          />
          <button
            onClick={() => {
              // dispatch({ type: 'UPDATE_TITLE', payload: newTitleText })
              props.updateTitle(newTitleText);
            }}
          >
            Update title
          </button>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    // titleOnProps: state.title,
    title: state.title.title,
    editing: state.title.editing,
  };
};

export default connect(mapStateToProps, {
  toggleEditing, // toggleEditing: toggleEditing
  updateTitle,
})(Title);
