import { types } from "../actions/types";

export const offersReducer = (state = [], action) => {
  switch (action.type) {
    case types.FETCH_OFFERS:
      return action.offers;
    case types.ADD_OFFER:
      return [...state.data, action.offer];
    default:
      return state;
  }
};

export const activeOfferReducer = (state = {}, action) => {
  switch (action.type) {
    case types.SET_ACTIVE_OFFER:
      return action.offer;
    default:
      return state;
  }
};
