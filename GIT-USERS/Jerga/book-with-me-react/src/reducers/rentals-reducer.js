import {
  RECIEVE_RENTALS,
  RECIEVE_SELECTED_RENTAL,
  REQUEST_SELECTED_RENTAL,
  FETCH_RENTALS_FAILURE,
  REQUEST_RENTALS_SEARCH,
  REQUEST_RENTALS,
  CREATE_RENTAL_SUCCESS,
  CREATE_RENTAL_FAIL,
} from "../actions/types";
import { INITIAL_STATE } from "./initial-state";

export const rentalsReducer = (state = INITIAL_STATE.rentals, action) => {
  switch (action.type) {
    case RECIEVE_RENTALS:
      return Object.assign({}, state, {
        items: action.rentals,
        isFetching: false,
        errors: [],
      });
    case FETCH_RENTALS_FAILURE:
      return Object.assign({}, state, {
        items: [],
        isFetching: false,
        errors: action.errors,
      });
    case REQUEST_RENTALS:
      return Object.assign({}, state, {
        items: [],
        isSearch: false,
        isFetching: true,
        searchCity: "",
      });
    case REQUEST_RENTALS_SEARCH:
      return Object.assign({}, state, {
        items: [],
        isSearch: true,
        isFetching: true,
        searchCity: action.city,
      });
    case CREATE_RENTAL_SUCCESS:
      return Object.assign({}, state, {
        items: [...state.items, action.rental],
      });
    case CREATE_RENTAL_FAIL:
      return Object.assign({}, state, { errors: action.errors });
    default:
      return state;
  }
};

export const selectedRentalReducer = (state = INITIAL_STATE.rental, action) => {
  switch (action.type) {
    case REQUEST_SELECTED_RENTAL:
      return Object.assign({}, state, { isFetching: true });
    case RECIEVE_SELECTED_RENTAL:
      return Object.assign({}, state, {
        isFetching: false,
        item: action.selectedRental,
      });
    default:
      return state;
  }
};
