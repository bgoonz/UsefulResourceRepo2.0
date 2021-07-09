import React from "react";
import ReactDOM from "react-dom";

import { createStore } from "redux";
import { Provider } from "react-redux";

// import reducer from './reducers/titleReducer';
import reducer from "./reducers";

import Title from "./components/Title";
import DragonList from "./components/DragonList";
import "./styles.css";

const store = createStore(reducer);

function App() {
  return (
    <div className="App">
      <Title />
      <DragonList />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
