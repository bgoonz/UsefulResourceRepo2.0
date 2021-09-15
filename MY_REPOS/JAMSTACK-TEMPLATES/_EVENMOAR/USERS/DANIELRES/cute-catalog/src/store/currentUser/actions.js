import * as api from "api";
import {
  CURRENT_USER_LOGGED_OUT,
  FETCH_CURRENT_USER_FAILURE,
  FETCH_CURRENT_USER_REQUEST,
  FETCH_CURRENT_USER_SUCCESS,
} from "store/types";

export const logout = () => (dispatch) => {
  api.onLogout().then(() => dispatch({ type: CURRENT_USER_LOGGED_OUT }));
};

export const fetchCurrentUser = () => async (dispatch) => {
  dispatch({ type: FETCH_CURRENT_USER_REQUEST });

  try {
    const { currentUser } = await api.fetchCurrentUser();
    dispatch({ type: FETCH_CURRENT_USER_SUCCESS, payload: { currentUser } });
    return currentUser;
  } catch (error) {
    dispatch({ type: FETCH_CURRENT_USER_FAILURE, error: error.message });
    throw error;
  }
};
