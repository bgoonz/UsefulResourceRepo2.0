import * as types from "../actions/types";
import initialState from "./initialState";

export const restaurantReducer = (state = initialState.restaurants, action) => {
  switch (action.type) {
    case types.LOAD_RESTAURANTS:
      return action.restaurants;

    default:
      return state;
  }
};
