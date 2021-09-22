import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

import "font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import 'popper.js/dist/popper.min.js';
import "bootstrap/dist/js/bootstrap.min.js";

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
