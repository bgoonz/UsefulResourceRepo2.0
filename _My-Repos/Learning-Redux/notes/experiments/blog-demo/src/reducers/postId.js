export default (state = "", action = {}) => {
  switch (action.type) {
    case "POSTS_FETCHED":
      if (action.payload.models.length === 0) return "";
      return action.payload.models[0]._id;
    case "SELECT_POST":
      return action.payload.postId;
    case "LIST_COMMENTS":
      return action.payload.postId;
    default:
      return state;
  }
};
