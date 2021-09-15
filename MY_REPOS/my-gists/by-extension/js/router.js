// ./src/index.js
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
const Root = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};
ReactDOM.render(
  <React.StrictMode>
    {" "}
    <Root />{" "}
  </React.StrictMode>,
  document.getElementById("root")
);
