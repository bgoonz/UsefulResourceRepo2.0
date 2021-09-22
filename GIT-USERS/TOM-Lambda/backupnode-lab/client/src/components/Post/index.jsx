import React from "react";

const Post = props => {
  return (
    <div className="post-wrapper">
      <h2>{props.title}</h2>
      <h3>{props.contents}</h3>
    </div>
  );
};

export default Post;
