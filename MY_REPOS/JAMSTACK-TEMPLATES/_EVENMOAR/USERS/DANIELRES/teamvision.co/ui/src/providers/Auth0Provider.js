import React from "react";

import history from "../utils/history";
import { Auth0Provider } from "./auth0";

const {
  REACT_APP_AUTH0_AUDIENCE,
  REACT_APP_AUTH0_DOMAIN,
  REACT_APP_AUTH0_CLIENT_ID
} = process.env;

const onRedirectCallback = appState => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};
export default function({ children }) {
  return (
    <Auth0Provider
      domain={REACT_APP_AUTH0_DOMAIN}
      client_id={REACT_APP_AUTH0_CLIENT_ID}
      audience={REACT_APP_AUTH0_AUDIENCE}
      redirect_uri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
}
