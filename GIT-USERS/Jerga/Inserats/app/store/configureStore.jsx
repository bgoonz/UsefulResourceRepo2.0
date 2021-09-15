import * as redux from "redux";
import thunk from "redux-thunk";

import { inseratsReducers, authReducer } from "../reducers/reducers";

export var configure = (initialState = {}) => {
  var reducer = redux.combineReducers({
    inserats: inseratsReducers,
    auth: authReducer,
  });

  var store = redux.createStore(
    reducer,
    initialState,
    redux.compose(
      redux.applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : (f) => f
    )
  );
  return store;
};
