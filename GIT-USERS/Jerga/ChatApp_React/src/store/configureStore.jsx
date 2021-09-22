import * as redux from "redux";
import thunk from "redux-thunk";

import { messageReducer, channelReducer } from "../reducers/reducers.jsx";

export var configure = (initialState = {}) => {
  var reducer = redux.combineReducers({
    messages: messageReducer,
    channels: channelReducer,
  });

  var store = redux.createStore(
    reducer,
    initialState,
    redux.compose(
      redux.applyMiddleware(thunk),
      window.devToolsExtenstion ? window.devToolsExtension() : (f) => f
    )
  );

  return store;
};
