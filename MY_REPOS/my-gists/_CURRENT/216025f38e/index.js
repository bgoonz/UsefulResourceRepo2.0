// ./src/index.js
import React from "react";
import ReactDOM from "react-dom";
import Message from "./Message";
ReactDOM.render(
  <React.StrictMode>
    <Message text="Hello world!" />
  </React.StrictMode>,
  document.getElementById("root")
);
