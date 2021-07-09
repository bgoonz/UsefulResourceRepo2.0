import React, { useState, useReducer } from "react";

import {
  TOGGLE_EDITING,
  SET_TITLE,
  titleReducer,
} from "../reducers/titleReducer";

const Title = () => {
  // const [title, setTitle] = useState('Hello earthlings!');
  // const [editing, setEditing] = useState(false);

  const [state, dispatch] = useReducer(titleReducer, {
    title: "hello from reducer",
    editing: false,
  });

  const [newTitleText, setNewTitleText] = useState("");

  const handleChanges = (e) => {
    setNewTitleText(e.target.value);
  };

  return (
    <div>
      {!state.editing ? (
        <h1>
          {state.title}{" "}
          <i
            onClick={() => {
              // setEditing(!editing)
              dispatch({ type: TOGGLE_EDITING });
            }}
            className="far fa-edit"
          />
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
              dispatch({ type: SET_TITLE, payload: newTitleText });
              // dispatch({ type: 'TO'}) ...
              // setTitle(newTitleText);
              // setEditing(false);
            }}
          >
            Update title
          </button>
        </div>
      )}
    </div>
  );
};

export default Title;
