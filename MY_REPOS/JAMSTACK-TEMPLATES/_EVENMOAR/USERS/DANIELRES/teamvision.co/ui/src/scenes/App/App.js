import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import { useAuth } from "../../providers/auth";
import history from "../../utils/history";
import Person from "../Person";
import Persons from "../Persons";
import PersonTag from "../PersonTag";
import Profile from "../Profile";
import Tag from "../Tag";
import Tags from "../Tags";
import Navbar from "./Navbar";

function Home() {
  return <div className="card">Welcome aboard!</div>;
}

function NoMatch() {
  return <div className="card">Page not found :(</div>;
}

export default function App() {
  const { isAuthenticated, login } = useAuth();

  if (isAuthenticated)
    return (
      <Router history={history}>
        <Navbar />

        <div className="my-4 md:mx-4">
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/persons/:id/:tag" component={PersonTag} />
            <Route path="/persons/:id" component={Person} />
            <Route path="/persons" component={Persons} />
            <Route path="/profile" component={Profile} />
            <Route path="/tags/:id" component={Tag} />
            <Route path="/tags" component={Tags} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    );

  return (
    <div className="container mx-auto mt-10 card text-center ">
      <div className="my-10">
        <button className="btn" onClick={login}>
          Login
        </button>
      </div>
    </div>
  );
}
