import * as redux from "redux";
import thunk from "redux-thunk";
import { rentalsReducer, selectedRentalReducer } from "./rentals-reducer";
import { authReducer } from "./auth-reducer";
import { bookingReducer } from "./booking-reducer";
import { bookingsReducer } from "./booking-reducer";
import { reducer as formReducer } from "redux-form";

export const init = () => {
  const reducer = redux.combineReducers({
    rentals: rentalsReducer,
    selectedRental: selectedRentalReducer,
    form: formReducer,
    auth: authReducer,
    booking: bookingReducer,
    bookings: bookingsReducer,
  });
  const store = redux.createStore(reducer, redux.applyMiddleware(thunk));

  return store;
};
