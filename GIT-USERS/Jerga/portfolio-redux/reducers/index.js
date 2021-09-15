import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import { authReducer } from "./auth-reducer";
import { reducer as formReducer } from "redux-form";

export function initializeStore(initialState) {
  const INITAL_STATE = "test";

  const reducer = combineReducers({
    test: (state = INITAL_STATE) => state,
    auth: (
      state = initialState.auth || { isAuth: false, isLoadingAuthState: false },
      action
    ) => authReducer(state, action),
    form: formReducer,
  });

  // const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
}
