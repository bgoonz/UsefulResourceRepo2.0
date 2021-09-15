import { FETCH_SERVICES } from "../actionTypes";

const INITIAL_STATE = {
  items: [],
};

const servicesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_SERVICES:
      return { ...state, items: action.services };
    default:
      return state;
  }
};

export default servicesReducer;
