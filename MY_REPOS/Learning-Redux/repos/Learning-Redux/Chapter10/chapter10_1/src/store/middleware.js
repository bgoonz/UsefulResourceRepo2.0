import { applyMiddleware } from "redux";

import thunkMiddleware from "redux-thunk";
import { routerMiddleware } from "react-router-redux";
import createHistory from "history/createBrowserHistory";

export default function createMiddleware(history) {
  return applyMiddleware(
    thunkMiddleware,
    routerMiddleware(history || createHistory())
  );
}
