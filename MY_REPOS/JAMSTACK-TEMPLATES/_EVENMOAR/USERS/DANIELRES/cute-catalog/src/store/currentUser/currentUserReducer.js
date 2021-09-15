import {
  CURRENT_USER_LOGGED_OUT,
  FETCH_CURRENT_USER_FAILURE,
  FETCH_CURRENT_USER_REQUEST,
  FETCH_CURRENT_USER_SUCCESS,
} from "../types";

export const initialState = {
  currentUser: {},
  isLoading: false,
  isLoggedIn: false,
};

export default (state = initialState, { type, payload, error }) => {
  switch (type) {
    case CURRENT_USER_LOGGED_OUT:
      return {
        ...initialState,
      };

    case FETCH_CURRENT_USER_FAILURE:
      return {
        ...state,
        error,
        isLoading: false,
      };

    case FETCH_CURRENT_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case FETCH_CURRENT_USER_SUCCESS:
      return {
        ...state,
        currentUser: payload.currentUser,
        isLoading: false,
        isLoggedIn: true,
        error: null,
      };

    default:
      return state;
  }
};
