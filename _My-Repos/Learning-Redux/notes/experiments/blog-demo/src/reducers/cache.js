export default (state = {}, action = {}) => {
  switch (action.type) {
    case "CATEGORIES_FETCHED":
    case "POSTS_FETCHED":
    case "COMMENTS_FETCHED":
      return action.payload.models.reduce(
        (state, model) => {
          state[model._id] = model;
          return state;
        },
        { ...state }
      );
    default:
      return state;
  }
};

/* EXAMPLE STATE:
{
  0: { id: 0, boothName: 'sdf' },
  1: { id: 2, boothName: 'sdf' },
  2: { id: 3, boothName: 'sdf' }
  3: { id: 3, boothName: 'sdf' }
}
*/
