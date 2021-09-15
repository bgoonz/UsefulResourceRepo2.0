import { LOGIN_FACEBOOK_SUCCESS, LOGIN_FACEBOOK_FAIL } from "../actions/types";

export default function (state = {}, action) {
  debugger;
  switch (action.type) {
    case LOGIN_FACEBOOK_SUCCESS:
      return action.payload;
    case LOGIN_FACEBOOK_FAIL:
      return null;
    default:
      return state;
  }
}
