import {
  combineReducers,
  createStore,
  applyMiddleware,
  compose as _compose,
} from "redux";
import thunk from "redux-thunk";

import nowReducer from "./now";
import portfolioReducer from "./portfolio";
import portfolioFormReducer from "./portfolioForm";

const compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || _compose;

export const rootReducer = combineReducers({
  now: nowReducer,
  portfolio: portfolioReducer,
  portfolioForm: portfolioFormReducer,
});

const middlewares = applyMiddleware(thunk);

const store = createStore(rootReducer, compose(middlewares));

export default store;
