/*
Our Reducer:

export const initialState = {
    appName: "Redux Test",
    title: "Dragon Member List 🐲",
    editing: false
  };

const titleReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_TITLE":
      return {
        ...state,
        title: action.payload,
        editing: false
      };
    case "TOGGLE_EDITING":
      return {
        ...state,
        editing: !state.editing
      };
    default:
      return state;
  }
};

export default titleReducer;

*/
import React from "react";
import ReactDOM from "react-dom";

import { createStore } from "redux";
import { Provider } from "react-redux";

import reducer from "./reducers/titleReducer";

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
