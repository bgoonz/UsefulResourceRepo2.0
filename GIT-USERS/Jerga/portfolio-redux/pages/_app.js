import React from "react";
import App, { Container } from "next/app";
import { Provider } from "react-redux";
import auth0Client from "../services/Auth";
import { withRouter } from "next/router";
import { initializeStore } from "../reducers";

import "@fortawesome/fontawesome-svg-core/styles.css";
import "@fortawesome/fontawesome-free/css/fontawesome.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStroopwafel, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

import * as actions from "../actions";

library.add(faStroopwafel, faPlusCircle);

const isServer = typeof window === "undefined";
const __NEXT_REDUX_STORE__ = "__NEXT_REDUX_STORE__";

function getOrCreateStore(initialState) {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    return initializeStore(initialState || {});
  }

  // Create store if unavailable on the client and set it on the window object
  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = initializeStore(initialState);
  }

  return window[__NEXT_REDUX_STORE__];
}

class MyApp extends App {
  static async getInitialProps({ Component, router, ctx, ctx: { req } }) {
    let pageProps = {};

    const reduxStore = getOrCreateStore();
    const loggedInUser = process.browser
      ? await auth0Client.getTokenForBrowser()
      : await auth0Client.getTokenForServer(req);

    if (loggedInUser) {
      reduxStore.dispatch(actions.authSuccess(loggedInUser));
      ctx.user = loggedInUser;
    }
    // Provide the store to getInitialProps of pages
    ctx.reduxStore = reduxStore;

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps, initialReduxState: reduxStore.getState() };
  }

  constructor(props) {
    super(props);
    this.reduxStore = getOrCreateStore(props.initialReduxState);
  }

  async componentDidMount() {
    if (this.props.router.pathname === "/callback") return;

    // try {
    //   await auth0Client.silentAuth();
    //   this.reduxStore.dispatch(actions.authSuccess());

    // } catch (err) {
    //   if (err.error === 'login_required') return;
    //   console.log(err.error);
    //   this.reduxStore.dispatch(actions.authFail());
    // }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <Provider store={this.reduxStore}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

export default withRouter(MyApp);
