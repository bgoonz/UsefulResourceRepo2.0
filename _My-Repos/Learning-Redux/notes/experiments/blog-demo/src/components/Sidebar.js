import React from "react";
import { NavLink } from "redux-first-router-link";
import styles from "../css/Sidebar";

export default () => (
  <div className={styles.sidebar}>
    <h2>Blog Demo</h2>

    <NavLink activeClassName={styles.active} to="/">
      HOME
    </NavLink>
    <NavLink activeClassName={styles.active} to="/posts">
      POSTS
    </NavLink>
    <NavLink activeClassName={styles.active} to="/comments">
      COMMENTS
    </NavLink>

    <div style={{ height: 14 }} />

    <NavLink to="/post/create" activeClassName={styles.active}>
      NEW POST
    </NavLink>

    <NavLink to="/comment/create" activeClassName={styles.active}>
      ADD COMMENT
    </NavLink>
  </div>
);
