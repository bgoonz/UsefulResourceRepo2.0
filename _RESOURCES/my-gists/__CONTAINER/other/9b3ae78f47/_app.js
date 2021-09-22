import App from "next/app";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import React from "react";

import "styles/main.scss";
import "react-toastify/dist/ReactToastify.css";
import configureStore from "redux/store";
import { loadState, saveState } from "../localStorage";
import { setRhomeKey } from "redux/actions/auth";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const appProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    //console.log("appProps: ", appProps);
    return { appProps: appProps };
  }

  componentDidMount() {
    const persistedState = loadState();
    store.dispatch(setRhomeKey(persistedState.auth || {}));
  }

  render() {
    const { Component, appProps } = this.props;

    return (
      <Provider store={store}>
        <Component {...appProps} />
      </Provider>
    );
  }
}

//redux store setup
const store = configureStore();

//Things you want to be persisted all time
store.subscribe(() => {
  const auth = store.getState().auth;

  // save state only when you have data
  if (Object.keys(auth).length !== 0) {
    saveState({
      auth: store.getState().auth,
    });
  }
});

const makeStore = () => store;

export default withRedux(makeStore)(MyApp);
