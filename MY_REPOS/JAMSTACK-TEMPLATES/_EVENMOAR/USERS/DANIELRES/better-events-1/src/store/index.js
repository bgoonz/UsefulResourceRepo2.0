import {
  combineReducers,
  createStore,
  applyMiddleware,
  compose as _compose,
} from "redux";
import { connectRoutes } from "redux-first-router";
import createHistory from "history/createBrowserHistory";

import { eventsReducer } from "./events";
import { messagesReducer } from "./messages";
import routesMap from "./routesMap";

const compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || _compose;

const history = createHistory();

const {
  reducer: locationReducer,
  middleware: routerMiddleware,
  enhancer: routerEnhancer,
} = connectRoutes(history, routesMap);

const rootReducer = combineReducers({
  events: eventsReducer,
  location: locationReducer,
  messages: messagesReducer,
});

const middlewares = applyMiddleware(routerMiddleware);

const store = createStore(rootReducer, compose(routerEnhancer, middlewares));

export default store;
