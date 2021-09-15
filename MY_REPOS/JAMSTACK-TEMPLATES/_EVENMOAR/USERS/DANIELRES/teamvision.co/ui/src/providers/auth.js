import Cookies from "js-cookie";
import React, { useContext } from "react";
import { useAuth0 } from "./auth0";

export const AuthContext = React.createContext();
export const useAuth = () => useContext(AuthContext);

const apiAuthenticate = token =>
  fetch("/authenticate", { headers: { Authorization: token } });

const reload = () => window.location.reload();

const logout = () => fetch("/logout").then(reload);

export default function({ children, ...initOptions }) {
  const auth0 = useAuth0();
  const isAuthenticated = Cookies.get("teamvis_authenticated");

  const login = () =>
    auth0
      .loginWithPopup()
      .then(auth0.getTokenSilently)
      .then(apiAuthenticate)
      .then(auth0.logout)
      .then(reload);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
