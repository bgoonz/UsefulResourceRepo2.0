import { types } from "../actions/types";

export const carsReducer = (state = [], action) => {
  switch (action.type) {
    case types.FETCH_CARS:
      return action.carsJSON;
    default:
      return state;
  }
};
