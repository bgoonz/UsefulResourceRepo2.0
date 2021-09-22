import {
  GET_EMPLOYEES,
  GET_ERRORS,
  EMPLOYEES_LOADING,
  CLEAR_ERRORS,
} from "./types";
import axios from "axios";

export const getEmployees = () => (dispatch) => {
  dispatch(setLinksLoading());
  axios
    .get("api/employees")
    .then((res) =>
      dispatch({
        type: GET_EMPLOYEES,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: {},
      })
    );
};

export const addEmployees = (expData, history) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .post("api/employees", expData)
    .then((res) => history.push("/employees"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const setLinksLoading = () => {
  return {
    type: EMPLOYEES_LOADING,
  };
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
