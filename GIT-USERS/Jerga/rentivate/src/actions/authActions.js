import axios from "axios";
import authService from "services/authService";
import axiosService from "services/axiosService";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";

const axiosInstance = axiosService.getInstance();

export const verifyRentalOwner = (rentalId) => {
  return axiosInstance.get(`/rentals/${rentalId}/verify-user`);
};

const loginSuccess = () => {
  const username = authService.getUsername();

  return {
    type: LOGIN_SUCCESS,
    username,
  };
};

const loginFailure = (errors) => {
  return {
    type: LOGIN_FAILURE,
    errors,
  };
};

export const register = (userData) => {
  return axios.post("/api/v1/users/register", userData).then(
    (res) => res.data,
    (err) => Promise.reject(err.response.data.errors)
  );
};

export const checkAuthState = () => {
  return (dispatch) => {
    if (authService.isAuthenticated()) {
      dispatch(loginSuccess());
    }
  };
};

export const login = (userData) => {
  return (dispatch) => {
    return axios
      .post("/api/v1/users/auth", userData)
      .then((res) => res.data)
      .then((token) => {
        authService.saveToken(token);
        dispatch(loginSuccess());
      })
      .catch(({ response }) => {
        dispatch(loginFailure(response.data.errors));
      });
  };
};

export const logout = () => {
  authService.invalidateUser();

  return {
    type: LOGOUT,
  };
};

export const createBooking = (booking) => {
  return axiosInstance
    .post("/bookings", booking)
    .then((res) => res.data)
    .catch(({ response }) => Promise.reject(response.data.errors));
};
