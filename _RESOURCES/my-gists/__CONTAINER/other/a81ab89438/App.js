import React, { Component } from "react";
import "./App.css";
import ServiceApp from "./ServiceApp";
import { onAuthStateChanged, storeAuthUser } from "./actions/action";
import initFunction from "./store/Store";
import { Provider } from "react-redux";

const store = initFunction();
class App extends Component {
  componentDidMount() {
    this.unsubscribeAuth = onAuthStateChanged((authUser) => {
      store.dispatch(storeAuthUser(authUser));
    });
  }

  componentWillUnmount() {
    this.unsubscribeAuth();
  }

  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <ServiceApp />
        </Provider>
      </div>
    );
  }
}

export default App;
