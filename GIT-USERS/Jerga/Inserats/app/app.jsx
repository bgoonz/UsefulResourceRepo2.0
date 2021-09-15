var React = require("react");
var ReactDOM = require("react-dom");
var { Provider } = require("react-redux");

import Login from "./components/Login";
import firebase, { firebaseRef } from "./firebase";
import * as actions from "./actions";

var store = require("./store/configureStore").configure();

var { Route, Router, IndexRoute, hashHistory } = require("react-router");

import InseratApp from "./components/InseratsApp";
import InseratHome from "./components/InseratHome";
import InseratManage from "./components/InseratManage";
import ViewInserat from "./components/ViewInserat";

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(actions.login(user.uid));
    hashHistory.push("/addinserat");
  } else {
    store.dispatch(actions.logout());
    hashHistory.push("/");
  }
});

store.subscribe(() => {
  var state = store.getState();
  console.log("New state", state);
});

store.dispatch(actions.startAddInserats());

//Load Foundation
$(document).foundation();

// App css
require("style!css!sass!applicationStyles");

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={InseratApp}>
        <IndexRoute component={InseratHome} />
        <Route path="addinserat" component={InseratManage} />
        <Route path="viewinserats" component={ViewInserat} />
        <Route path="login" component={Login} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById("app")
);
