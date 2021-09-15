import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router, Route, IndexRoute, browserHistory } from "react-router";

// Components
import App from "./src/components/app";
import Cards_main from "./src/components/cards_components/Cards_main";

//Actions
import * as actions from "./src/actions/index";

//Styles
import "./src/style/vendors/css/Grid.css";
import "./src/style/vendors/css/normalize.css";
import "./src/style/vendors/css/ionicons.min.css";
import "./src/style/resources/sass/app.scss";

var store = require("./src/reducers/index").configure();

store.dispatch(actions.fetchHeroes());

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Cards_main} />
      </Route>
    </Router>
  </Provider>,
  document.querySelector(".container")
);
