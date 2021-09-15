import { AUTH_SUCCESS, AUTH_FAIL } from "../actions/types";

export const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        isAuth: true,
        isLoadingAuthState: false,
        user: action.user,
      };
    case AUTH_FAIL:
      return { ...state, isAuth: false, isLoadingAuthState: false, user: null };
    default:
      return state;
  }
};
