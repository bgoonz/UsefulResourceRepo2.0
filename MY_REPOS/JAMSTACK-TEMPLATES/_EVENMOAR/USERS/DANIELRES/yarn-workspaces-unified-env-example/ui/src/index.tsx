// import "core-js/stable";
import * as React from "react";
import * as ReactDOM from "react-dom";
import "regenerator-runtime/runtime";
import "./global.css";
import App from "./scenes/App";
import { Providers } from "./services";

if (module.hot) module.hot.accept();

ReactDOM.render(
  <Providers>
    <App />
  </Providers>,
  document.getElementById("root")
);
