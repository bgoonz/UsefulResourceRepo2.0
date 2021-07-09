import React from "react";
import { connect } from "react-redux";
import Select from "../widgets/Select";

const CommentEdit = ({
  message,
  postId,
  currentPostId,
  posts,
  update,
  save,
}) => {
  postId = postId || currentPostId || posts[0]._id;

  return (
    <div>
      <div>
        <label htmlFor="message">message:</label>
        <input
          type="text"
          name="message"
          value={message || ""}
          onChange={update("message", postId)}
        />
      </div>

      <Select
        name="postId"
        options={posts}
        value={postId}
        onChange={update("postId", postId)}
      />

      <button onClick={save}>SAVE</button>
    </div>
  );
};

const mapState = (state) => ({
  ...state.model,
  currentPostId: state.postId,
  posts: state.posts.map((id) => state.cache[id]),
});

const mapDispatch = (dispatch) => ({
  update: (name, postId) => (e) => {
    const action = {
      type: "UPDATE_FORM",
      payload: {
        postId,
        name,
        value: e.target.value,
      },
    };

    dispatch(action);
  },
  save: () => dispatch({ type: "SAVE_COMMENT" }),
});

export default connect(mapState, mapDispatch)(CommentEdit);
