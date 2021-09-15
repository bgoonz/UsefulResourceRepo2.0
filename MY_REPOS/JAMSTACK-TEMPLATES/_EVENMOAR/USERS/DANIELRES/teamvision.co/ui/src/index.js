import ApolloClient from "apollo-boost";
import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import * as Sentry from "@sentry/browser";

import "./css/tailwind.css";

import * as serviceWorker from "./serviceWorker";
import Auth0Provider from "./providers/Auth0Provider";
import AuthProvider from "./providers/auth";

import App from "./scenes/App";

Sentry.init({ dsn: process.env.REACT_APP_SENTRY_DSN });

const client = new ApolloClient();

ReactDOM.render(
  <Auth0Provider>
    <AuthProvider>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </AuthProvider>
  </Auth0Provider>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
