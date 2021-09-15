import React from "react";
import reactDOM from "react-dom";
import { Router, Route, IndexRoute, browserHistory } from "react-router";
import App from "./components/app";
import BinsMain from "./components/bins/bins_main";
import BinsList from "./components/bins/bins_list";
import { Bins } from "../imports/collections/bins";

//nested routes will be provided to App.js as childrens
//Index route is always showing on the page " / "
const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={BinsList} />
      <Route path="bins/:binId" component={BinsMain} />
    </Route>
  </Router>
);

Meteor.startup(() => {
  reactDOM.render(routes, document.querySelector(".render-target"));
});
