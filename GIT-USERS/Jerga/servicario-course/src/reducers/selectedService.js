import { FETCH_SERVICE_SUCCESS, REQUEST_SERVICE } from "types";
import { combineReducers } from "redux";

const initSelectedService = () => {
  const item = (state = {}, action) => {
    switch (action.type) {
      case FETCH_SERVICE_SUCCESS:
        return action.service;
      default:
        return state;
    }
  };

  const isFetching = (state = false, action) => {
    switch (action.type) {
      case REQUEST_SERVICE:
        return true;
      case FETCH_SERVICE_SUCCESS:
        return false;
      default:
        return state;
    }
  };

  return combineReducers({
    item,
    isFetching,
  });
};

const selectedService = initSelectedService();
export default selectedService;
