import { types } from "../actions/types";

export const searchTextReducer = (state = "", action) => {
  switch (action.type) {
    case types.SET_SEARCH_TEXT:
      return action.searchText;
    default:
      return state;
  }
};

export const filterTypeReducer = (state = "", action) => {
  switch (action.type) {
    case types.SET_FILTER_TYPE:
      return action.filterType;
    default:
      return state;
  }
};
