export const auth = function(state = null, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return action.payload;
    case 'LOGOUT_SUCCESS':
      return null;
    default:
      return state;
  }
}
