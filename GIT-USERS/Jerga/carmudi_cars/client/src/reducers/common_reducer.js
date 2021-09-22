import { types } from "../actions/types";

export const carsCountReducer = (state = "", action) => {
  switch (action.type) {
    case types.OVERALL_NUM_CARS:
      return action.carsCount;
    default:
      return state;
  }
};

export const currentPageReducer = (state = "", action) => {
  switch (action.type) {
    case types.CURENT_PAGE:
      return action.page;
    default:
      return state;
  }
};
