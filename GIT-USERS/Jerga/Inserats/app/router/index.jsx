import React from "react";

var { Route, Router, IndexRoute, hashHistory } = require("react-router");

import InseratApp from "../components/InseratsApp";
import InseratManage from "../components/InseratManage";
import InseratHome from "../components/InseratHome";

export default (
  <Router history={hashHistory}>
    <Route path="/" component={InseratApp}>
      <Route path="addInserat" component={InseratManage} />
    </Route>
  </Router>
);
