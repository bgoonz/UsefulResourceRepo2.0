import { combineReducers } from "redux";

export const itemsReducer = (resource) => {
  return (state = [], action) => {
    if (resource !== action.resource) {
      return state;
    }

    switch (action.type) {
      case "REQUEST_DATA":
        return [];
      case "REQUEST_DATA_COMPLETE":
        return action.data;
      case "DELETE_RESOURCE":
        const index = state.findIndex((i) => i._id === action.id);
        return state.filter((item, itemIndex) => index !== itemIndex);
      default:
        return state;
    }
  };
};

export const errorsReducer = (resource) => {
  return (state = [], action) => {
    if (resource !== action.resource) {
      return state;
    }

    switch (action.type) {
      case "DELETE_RESOURCE":
      case "REQUEST_DATA":
        return [];
      case "REQUEST_ERROR":
        return action.errors;
      default:
        return state;
    }
  };
};

export const isFetchingReducer = (resource) => {
  return (state = false, action) => {
    if (resource !== action.resource) {
      return state;
    }
    switch (action.type) {
      case "REQUEST_DATA":
        return true;
      case "REQUEST_DATA_COMPLETE":
        return false;
      default:
        return state;
    }
  };
};

export const createList = (resource) => {
  const items = itemsReducer(resource);
  const isFetching = isFetchingReducer(resource);
  const errors = errorsReducer(resource);

  return combineReducers({
    items,
    isFetching,
    errors,
  });
};
