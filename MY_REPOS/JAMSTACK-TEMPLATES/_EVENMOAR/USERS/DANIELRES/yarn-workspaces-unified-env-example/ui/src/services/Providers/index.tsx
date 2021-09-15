import * as React from "react";
import AppStateProvider from "./AppStateProvider";
import Auth0Provider from "./Auth0Provider";
import GraphqlProvider from "./GraphqlProvider";

export default ({ children }) => (
  <Auth0Provider>
    <GraphqlProvider>
      <AppStateProvider>{children}</AppStateProvider>
    </GraphqlProvider>
  </Auth0Provider>
);
