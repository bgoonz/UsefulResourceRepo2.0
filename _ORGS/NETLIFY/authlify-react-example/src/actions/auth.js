import Authlify from 'authlify-js';

const authlify = new Authlify({APIUrl: 'http://localhost:9999'});

export function loginSuccess(user) {
  const { email, data, created_at, updated_at } = user;
  return {type: 'LOGIN_SUCCESS', payload: {
    email, data, created_at, updated_at,
    tokenResponse: user.tokenResponse
  }};
}

export function logoutUser() {
  return {type: 'LOGOUT_SUCCESS', payload: null};
}

export function login(email, password) {
  return (dispatch, getState) => {
    return authlify.login(email, password).then(
      (user) => dispatch(loginSuccess(user))
    );
  };
}

export function logout() {
  return (dispatch, getState) => {
    const { tokenResponse } = getState().auth;
    const user = authlify.user(tokenResponse);
    return user.logout().then(
      () => dispatch(logoutUser())
    );
  };
}

export function signup(email, password, data) {
  return (dispatch, getState) => {
    return authlify.signup(email, password, data).then(
      (success) => dispatch({type: 'SIGNUP_SUCCESS'})
    );
  };
}

export function sendRecovery(email) {
  return (dispatch, getState) => {
    return authlify.requestPasswordRecovery(email).then(
      (success) => dispatch({type: 'RECOVER_REQUEST_SUCCESS'})
    );
  };
}

export function recover(code) {
  return (dispatch, getState) => {
    return authlify.recover(code).then(
      (user) => dispatch(loginSuccess(user))
    );
  };
}

export function confirm(code) {
  return (dispatch, getState) => {
    return authlify.confirm(code).then(
      (user) => dispatch(loginSuccess(user))
    );
  };
}

export function updateUser(updates) {
  return (dispatch, getState) => {
    const { tokenResponse } = getState().auth;
    const user = authlify.user(tokenResponse);
    return user.update({email: updates.email, password: updates.password, data: updates.data}).then(
      (user) => dispatch(loginSuccess(user))
    );
  }
}
