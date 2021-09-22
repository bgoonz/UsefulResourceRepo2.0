import React, { createContext } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

// setup context
export const UserContext = createContext();
const userName = "John Doe";

ReactDOM.render(
  <UserContext.Provider value={userName}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </UserContext.Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
