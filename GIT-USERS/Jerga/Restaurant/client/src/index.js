import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router, Route, IndexRoute, browserHistory } from "react-router";
import { AUTH_USER } from "./actions/types";

import App from "./components/app";
import Restaurant from "./components/Restaurant";
import Signin from "./components/auth/signin";
import Signout from "./components/auth/signout";
import Signup from "./components/auth/signup";
import Feature from "./components/feature";
import RestaurantPage from "./components/RestaurantPage";
import RequireAuth from "./components/auth/require_auth";
import { loadRestaurants } from "./actions/index";
import Welcome from "./components/welcome";
import * as actions from "./actions";

var store = require("./reducers/index").configure();

const token = localStorage.getItem("token");
//if we have a token consider user to be signed in

if (token) {
  store.dispatch({ type: AUTH_USER });
}

import "./style/app.scss";
import "./style/vendors/css/Grid.css";
import "./style/vendors/css/normalize.css";
import "./style/vendors/css/ionicons.min.css";

store.dispatch(actions.loadRestaurants());

store.subscribe(() => {
  var state = store.getState();
  console.log("New state", state);
});

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={RestaurantPage} />
        <Route path="/signin" component={Signin} />
        <Route path="/signout" component={Signout} />
        <Route path="/signup" component={Signup} />
      </Route>
      <Route path="/restaurant/:id" component={Restaurant} />
    </Router>
  </Provider>,
  document.querySelector(".container")
);
