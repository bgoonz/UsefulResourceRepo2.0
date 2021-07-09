import React from "react";
import { connect } from "react-redux";
import Link from "redux-first-router-link";

import styles from "../css/Home";

const PostList = ({ posts }) => (
  <div className={styles.home}>
    <h1>Posts</h1>

    <Link to="/post/create">NEW POST</Link>
    <div>
      {posts.map((post) => (
        <PostRow key={post._id} {...post} />
      ))}
    </div>
  </div>
);

const mapState = (state) => ({
  posts: state.posts.map((id) => state.cache[id]),
});

export default connect(mapState)(PostList);

const PostRow = (post) => (
  <div>
    id: {post._id}
    {" | "}
    name: {post.title}
    {" | "}
    size: {post.body}
    {"  -  "}
    <Link to={{ type: "UPDATE_POST", payload: post }}>EDIT</Link>
    {" | "}
    <Link to={{ type: "LIST_COMMENTS", payload: { postId: post._id } }}>
      VIEW COMMENTS
    </Link>
    {" | "}
    <Link to={{ type: "DELETE_POST", payload: post }}>DELETE</Link>
  </div>
);
