import * as redux from "redux";
import thunk from "redux-thunk";
import { carsReducer } from "./cars_reducer";
import { searchReducer } from "./search_reducer";
import { carsCountReducer, currentPageReducer } from "./common_reducer";

export var configure = (initialState = {}) => {
  const reducer = redux.combineReducers({
    carsJson: carsReducer,
    searchText: searchReducer,
    carsCount: carsCountReducer,
    currentPage: currentPageReducer,
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
