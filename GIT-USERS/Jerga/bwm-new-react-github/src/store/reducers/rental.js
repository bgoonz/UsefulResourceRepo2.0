import { combineReducers } from "redux";

const initRentalReducer = () => {
  const item = (state = {}, action) => {
    switch (action.type) {
      case "IS_FETCHING_RENTAL":
        return {};
      case "FETCH_RENTAL_BY_ID":
        return action.rental;
      default:
        return state;
    }
  };

  const isFetching = (state = false, action) => {
    switch (action.type) {
      case "IS_FETCHING_RENTAL":
        return true;
      case "FETCH_RENTAL_BY_ID":
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

const rental = initRentalReducer();
export default rental;
