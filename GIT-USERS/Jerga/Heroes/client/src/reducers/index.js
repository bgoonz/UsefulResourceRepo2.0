import * as redux from "redux";
import thunk from "redux-thunk";
import { reducer as formReducer } from "redux-form";
import { heroReducer } from "./heroReducer";

export var configure = (initialState = {}) => {
  const reducer = redux.combineReducers({
    form: formReducer,
    heroes: heroReducer,
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
