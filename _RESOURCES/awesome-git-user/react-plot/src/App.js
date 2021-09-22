import React from "react";
import { Route } from "react-router-dom";
import Home from "./pages/home";
import Functions from "./pages/functions";
import Sandbox from "./pages/sandbox";
import CircleDrag from "./components/animations/circleDrag";
import "./App.css";

function App() {
  return (
    <div>
      <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/functions" component={Functions} />
        <Route exact path="/sandbox" component={Sandbox} />
        <Route exact path="/circledrag" component={CircleDrag} />
      </div>
    </div>
  );
}

export default App;
