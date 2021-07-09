import React from "react";
import { connect } from "react-redux";
import styles from "../css/Home";

import PostList from "./PostList";
import Select from "../widgets/Select";

const Home = ({ categories, selectCategory }) => (
  <div className={styles.home}>
    <h1>Posts</h1>

    <Select
      name="select category:"
      options={[{ _id: "all", name: "all" }, ...categories]}
      onChange={selectCategory}
    />

    <PostList />
  </div>
);

const mapState = (state) => ({
  postId: state.postId,
  categories: state.categories.map((id) => state.cache[id]),
});

const mapDispatch = (dispatch) => ({
  selectCategory: (e) => {
    const action = {
      type: "SELECT_CATEGORY",
      payload: {
        categoryId: e.target.value,
      },
    };

    dispatch(action);
  },
});

export default connect(mapState, mapDispatch)(Home);
