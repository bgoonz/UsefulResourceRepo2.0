export const logout = (uid) => (dispatch) => {
  api.setUserOnlineStatus(uid, false);
  api.logout().then((_) => dispatch({ user: null, type: SET_AUTH_USER }));
};
