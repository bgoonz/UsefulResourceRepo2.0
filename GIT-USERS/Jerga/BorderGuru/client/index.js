import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router, Route, IndexRoute, browserHistory } from "react-router";

import App from "./src/components/app";
import OffersPage from "./src/components/offers/OffersPage";

import * as actions from "./src/actions/index";

//Auth - For Future USE
import Signin from "./src/components/auth/signin";
import Signout from "./src/components/auth/signout";
import Signup from "./src/components/auth/signup";

//Styles

import "./src/style/vendors/css/Grid.css";
import "./src/style/vendors/css/normalize.css";
import "./src/style/vendors/css/ionicons.min.css";
import "./src/style/app.scss";

var store = require("./src/reducers/index").configure();

store.dispatch(actions.fetchOffers()); //load initial data

// DEBUG
// store.subscribe(() => {
//   var state = store.getState();
//   console.log('New state', state);
// });

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={OffersPage} />
      </Route>
    </Router>
  </Provider>,
  document.querySelector(".container")
);
