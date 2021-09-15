import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { leanReducer } from "lean-redux";
import { routerReducer, routerMiddleware } from "react-router-redux";
import createHistory from "history/createBrowserHistory";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const history = createHistory();
const middleware = routerMiddleware(history);

leanReducer.setGlobalScope("lean");

const store = createStore(
  combineReducers({
    lean: leanReducer,
    router: routerReducer,
  }),
  composeEnhancers(applyMiddleware(middleware))
);

export default store;
export { history };
