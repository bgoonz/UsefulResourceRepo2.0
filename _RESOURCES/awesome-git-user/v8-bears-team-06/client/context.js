import React from "react";

export const AuthContext = React.createContext({
  token: null,
  login: (token) => {},
  logout: () => {},
  isLoggedIn: false,
});
