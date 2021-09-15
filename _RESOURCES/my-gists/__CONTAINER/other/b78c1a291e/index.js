import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { ToastProvider } from "react-toast-notifications";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <ToastProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ToastProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
