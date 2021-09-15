import * as React from "react";
import { Auth0Provider, useAuth0 } from "../react-auth0-spa";
import Login from "../../components/Login";

const config = {
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.UI_AUTH0_CLIENT_ID,
  audience: process.env.AUTH0_AUDIENCE
};

const AccessTokenContext = React.createContext({ accessToken: null });

export default ({ children }) => {
  return (
    <Auth0Provider
      domain={config.domain}
      client_id={config.clientId}
      audience={config.audience}
      redirect_uri={window.location.origin}
    >
      <AccessTokenProvider>{children}</AccessTokenProvider>
    </Auth0Provider>
  );
};

export const useAccessToken = () => React.useContext(AccessTokenContext);

function AccessTokenProvider({ children }) {
  const [accessToken, setAccessToken] = React.useState(null);
  const { getTokenSilently, loading, setIsAuthenticated } = useAuth0();

  React.useEffect(() => {
    if (!loading) {
      if (process.env.NODE_ENV === "test") {
        try {
          const token = window.location.href
            .split("access_token=")[1]
            .split("&")[0];
          setAccessToken(token);
          setIsAuthenticated(true);
        } catch (error) {}
      } else {
        getTokenSilently().then(setAccessToken);
      }
    }
  }, [loading]);

  if (loading) return "Authenticating...";
  if (!accessToken) return <Login />;

  return (
    <AccessTokenContext.Provider value={{ accessToken }}>
      {children}
    </AccessTokenContext.Provider>
  );
}
