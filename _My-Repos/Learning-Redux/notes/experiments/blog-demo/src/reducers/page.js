import { NOT_FOUND } from "redux-first-router";

export default (state = "HOME", action = {}) =>
  components[action.type] || state;

const components = {
  HOME: "Home",
  CREATE_POST: "PostEdit",
  UPDATE_POST: "PostEdit",

  LIST_COMMENTS: "CommentList",
  CREATE_COMMENT: "CommentEdit",
  UPDATE_COMMENT: "CommentEdit",

  [NOT_FOUND]: "NotFound",
};

// NOTES: this is the primary reducer demonstrating how RFR replaces the need
// for React Router's <Route /> component.
//
// ALSO:  Forget a switch, use a hash table for perf.
