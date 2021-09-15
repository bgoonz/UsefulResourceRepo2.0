export default (state = [], action = {}) => {
  switch (action.type) {
    case "COMMENTS_FETCHED":
      return action.payload.models.map((model) => model._id);
    case "DELETE_COMMENT":
      return state.filter((id) => id !== action.payload._id);
    default:
      return state;
  }
};

// EXAMPLE STATE:
// [0, 1, 2, 7]
