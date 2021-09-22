import React from "react";
import Header from "./components/shared/Header";
import Routes from "./Routes";

import { BrowserRouter as Router } from "react-router-dom";
import { StoreProvider } from "./store/connect";
import store from "./store";

const App = () => {
  return (
    <StoreProvider store={store}>
      <Router>
        <Header />
        <Routes />
      </Router>
    </StoreProvider>
  );
};

export default App;
