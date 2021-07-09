export default (state = [], action = {}) => {
  switch (action.type) {
    case "CATEGORIES_FETCHED":
      return action.payload.models.map((model) => model._id);
    default:
      return state;
  }
};

// EXAMPLE STATE:
// [0, 1, 2, 7]
