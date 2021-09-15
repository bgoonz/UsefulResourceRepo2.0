import React from "react";
import ResourceHome from "./pages/ResourceHome";
import ResourceNew from "./pages/ResourceNew";
import ResourceDetail from "./pages/ResourceDetail";
import About from "./pages/About";
import Header from "./components/Header";
import SettingsProvider from "./context/SettingsProvider";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <SettingsProvider>
      {(settings) => (
        <div className={`resource-app ${settings.theme}`}>
          <div className="container">
            <Router>
              <Header />
              <Switch>
                <Route path="/" exact>
                  <ResourceHome />
                </Route>
                <Route path="/resources/new">
                  <ResourceNew />
                </Route>
                <Route path="/resources/:id">
                  <ResourceDetail />
                </Route>
                <Route path="/about">
                  <About />
                </Route>
              </Switch>
            </Router>
          </div>
        </div>
      )}
    </SettingsProvider>
  );
};

export default App;
