import "./index.css";

import React from "react";
import ReactDOM from "react-dom";

import { unregister } from "./registerServiceWorker";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));
// registerServiceWorker();
unregister();
