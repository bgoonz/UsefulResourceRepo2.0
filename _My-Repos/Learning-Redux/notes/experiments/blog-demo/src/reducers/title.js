export default (state = "Blog Demo", action = {}) => {
  switch (action.type) {
    case "HOME":
      return "Posts";
    case "LIST_COMMENTS":
      return "Post Profile";
    default:
      return state;
  }
};
