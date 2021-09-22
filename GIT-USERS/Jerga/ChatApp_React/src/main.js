import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";
import { Provider } from "react-redux";
import { Route, Router, IndexRoute, browserHistory } from "react-router";
import { firebaseRef } from "../src/firebase/index.jsx";

import * as actions from "./actions/index.jsx";

require("./main.scss");

var store = require("./store/configureStore.jsx").configure();

store.subscribe(() => {
  var state = store.getState();
  console.log("New State", state);
});

store.dispatch(actions.startFetchChannels());

// if(store.getState().channels.selectedChannel){
//     store.dispatch(actions.startFetchMessages());
// }

console.log("FROM MAIN , CHANNEL: ", store.getState().channels.selectedChannel);

firebaseRef.child("room1").on("child_added", (msg) => {
  console.log("DISPATCHING ADD MESSAGE ", msg.val());
  let msgVal = msg.val();
  msgVal.key = msg.key;

  store.dispatch(actions.queryMessage(msgVal));
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("container")
);
