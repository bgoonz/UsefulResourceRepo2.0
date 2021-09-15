import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "../reducers";

const store: any = createStore(reducers, {}, compose(applyMiddleware(thunk)));

export default store;
