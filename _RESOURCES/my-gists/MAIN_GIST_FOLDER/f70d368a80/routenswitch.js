import { Route, Switch } from "react";
import Home from "./components/Home";
<Switch>
  <Route exact path="/">
    <Home />
  </Route>
  <Route exact path="/users">
    <Users />
  </Route>
</Switch>;
