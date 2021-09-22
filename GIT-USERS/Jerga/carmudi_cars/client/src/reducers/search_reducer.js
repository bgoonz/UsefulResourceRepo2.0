import { types } from "../actions/types";

export const searchReducer = (state = "", action) => {
  switch (action.type) {
    case types.SET_SEARCH_TEXT:
      return action.searchText;
    default:
      return state;
  }
};
