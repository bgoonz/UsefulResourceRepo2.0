import React from "react";
import { connect } from "react-redux";

const PostEdit = ({ name, body, update, save }) => (
  <div>
    <div>
      <label htmlFor="name">post name:</label>
      <input
        type="text"
        name="name"
        value={name || ""}
        onChange={update("name")}
      />
    </div>

    <div>
      <label htmlFor="body">body:</label>
      <input
        type="text"
        name="body"
        value={body || ""}
        onChange={update("body")}
      />
    </div>
    <button onClick={save}>SAVE</button>
  </div>
);

const mapState = (state) => state.model;

const mapDispatch = (dispatch) => ({
  update: (name) => (event) => {
    const action = {
      type: "UPDATE_FORM",
      payload: {
        name,
        value: event.target.value,
      },
    };

    dispatch(action);
  },
  save: () => dispatch({ type: "SAVE_POST" }),
});

export default connect(mapState, mapDispatch)(PostEdit);
