import ReactDOM from "react-dom";
import React from "react";
import App from "./App.js";

import "bootstrap/dist/js/bootstrap.min.js";
import "./index.scss";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
