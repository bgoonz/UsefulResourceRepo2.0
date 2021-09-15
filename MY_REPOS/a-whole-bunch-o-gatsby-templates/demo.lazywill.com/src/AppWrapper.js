import React, { Component } from "react";
import Loadable from "react-loadable";
import { BrowserRouter } from "react-router-dom";

import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

import Loading from "./components/shared/Loading/";

const httpLink = new HttpLink({
  uri: "https://api.graph.cool/simple/v1/cjbgvexpt0hsm0176hz0flrix"
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

const AsyncAppContainer = Loadable({
  loader: () => import("./AppContainer"),
  loading: Loading
});

class AppWrapper extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <AsyncAppContainer />
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default AppWrapper;
