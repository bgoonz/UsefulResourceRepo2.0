import React from "react";
import { connect } from "react-redux";
import Link from "redux-first-router-link";

import styles from "../css/Home";

const CommentList = ({ comments, post }) => (
  <div className={styles.home}>
    <h1>{!post ? "All Comments" : `${post.name} > Comments`}</h1>

    <Link to="/comment/create">ADD COMMENT</Link>

    <div>
      {comments.map((comment) => (
        <CommentRow key={comment._id} {...comment} />
      ))}
    </div>
  </div>
);

const mapState = (state) => {
  const postId = state.location.payload.postId;
  const post = postId && state.cache[postId];

  return {
    post,
    comments: state.comments.map((id) => state.cache[id]),
  };
};

export default connect(mapState)(CommentList);

const CommentRow = (comment) => (
  <div>
    id: {comment._id}
    {" | "}
    name: {comment.name}
    {"  -  "}
    <Link to={action(comment)}>EDIT COMMENT</Link>
    {" | "}
    <Link to={{ type: "DELETE_COMMENT", payload: comment }}>DELETE</Link>
  </div>
);

const action = (payload) => ({ type: "EDIT_COMMENT", payload });
