import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
// import usersReducer from './reducers/usersReducer'
// import { listingsReducer } from './reducers/listingsReducer'
// import { selectedListingReducer } from './reducers/listingsReducer'
// import bookingsReducer from './reducers/bookingsReducer'
// // import messagesReducer from './reducers/messagesReducer'

import {
  rentalReducer,
  selectedRentalReducer,
} from "./reducers/listingsReducer";
import { authReducer } from "./reducers/authReducer";
import { rentalMapReducer } from "./reducers/mapReducer";
import { bookingsReducer } from "./reducers/bookingsReducer";
import { reducer as formReducer } from "redux-form";

export const init = () => {
  const reducer = combineReducers({
    bookings: bookingsReducer,
    rentals: rentalReducer,
    rental: selectedRentalReducer,
    form: formReducer,
    auth: authReducer,
    map: rentalMapReducer,
  });

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

  return store;
};

const rootReducer = combineReducers({
  // users: usersReducer,
  // listings: listingsReducer,
  // listing: selectedListingReducer,
  // userBookings: userBookingsReducer,
  bookings: bookingsReducer,
  rentals: rentalReducer,
  rental: selectedRentalReducer,
  form: formReducer,
  auth: authReducer,
  map: rentalMapReducer,
  // messages: postsReducer
});

export default rootReducer;
