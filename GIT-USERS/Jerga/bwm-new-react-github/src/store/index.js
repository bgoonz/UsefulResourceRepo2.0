import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rentals from "./reducers/rentals";
import rental from "./reducers/rental";
import auth from "./reducers/auth";

export function initStore() {
  const reducers = combineReducers({
    rentals,
    rental,
    auth,
  });

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

  return store;
}
