import React, { Component } from "react";
import { Provider } from "react-redux";
import RentalApp from "./RentalApp";

import "./App.css";
import "bootstrap-daterangepicker/daterangepicker.css";

const store = require("./reducers").init();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RentalApp />
      </Provider>
    );
  }
}

export default App;
