import {
  REQUEST_BOOKING,
  BOOKING_SUCCESS,
  BOOKING_FAILURE,
  CREATE_BOOKING,
  REQUEST_BOOKINGS,
  RECIEVE_BOOKINGS,
  RECIEVE_BOOKINGS_FAIL,
} from "../actions/types";
import { INITIAL_STATE } from "./initial-state";

export const bookingReducer = (state = INITIAL_STATE.booking, action) => {
  switch (action.type) {
    case CREATE_BOOKING:
      return Object.assign({}, state, {
        item: action.booking,
        errors: [],
        isBooked: false,
      });
    case REQUEST_BOOKING:
      return Object.assign({}, state, { errors: [] });
    case BOOKING_SUCCESS:
      return Object.assign({}, state, { isBooked: true });
    case BOOKING_FAILURE:
      return Object.assign({}, state, { errors: action.errors });
    default:
      return state;
  }
};

export const bookingsReducer = (state = INITIAL_STATE.bookings, action) => {
  switch (action.type) {
    case REQUEST_BOOKINGS:
      return Object.assign({}, state, {
        isFetching: true,
        items: [],
        errors: [],
      });
    case RECIEVE_BOOKINGS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.bookings,
      });
    case RECIEVE_BOOKINGS_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
        errors: action.errors,
      });
    default:
      return state;
  }
};
