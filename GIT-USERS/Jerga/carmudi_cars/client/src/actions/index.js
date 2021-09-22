import axios from "axios";
import { types } from "./types";

const fetchCarsSuccess = (JSON) => {
  const carsJSON = JSON.data;
  return {
    type: types.FETCH_CARS,
    carsJSON,
  };
};

export const fetchCars = () => {
  return (dispatch) => {
    axios.get("/cars?page=1").then((resp) => {
      return dispatch(fetchCarsSuccess(resp));
    });
  };
};

export const fetchCarsPartial = (page) => {
  return (dispatch) => {
    axios.get(`/cars?page=${page}`).then((resp) => {
      return dispatch(fetchCarsSuccess(resp));
    });
  };
};

export const setSearchText = (searchText) => {
  return {
    type: types.SET_SEARCH_TEXT,
    searchText,
  };
};

export const setCarCount = (carsCount) => {
  return {
    type: types.OVERALL_NUM_CARS,
    carsCount,
  };
};

export const setCurentPage = (page) => {
  return {
    type: types.CURENT_PAGE,
    page,
  };
};
