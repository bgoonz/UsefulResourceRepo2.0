export default (state = {}, action = {}) => {
  switch (action.type) {
    case "UPDATE_FORM":
      const { postId, name, value } = action.payload;

      return {
        ...state,
        postId,
        [name]: value,
      };

    case "CLEAR_FORM":
    case "LIST_POSTS":
    case "LIST_COMMENTS":
    case "LIST_ALL_COMMENTS":
      return {};

    case "UPDATE_COMMENT":
    case "UPDATE_POST":
      return action.payload;
    default:
      return state;
  }
};

/* EXAMPLE STATE:
{
  name: 'Madison Square Garden',
  size: 7000
}
*/
