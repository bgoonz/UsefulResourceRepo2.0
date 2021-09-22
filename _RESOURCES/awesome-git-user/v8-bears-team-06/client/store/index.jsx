import React, { useState } from "react";
import Cookie from "js-cookie";

import { AuthContext } from "../context";

export const StoreProvider = ({ children, token: initialToken }) => {
  const [token, setToken] = useState(initialToken);
  const contextValue = {
    login: (newToken) => {
      setToken(newToken);
      Cookie.set("token", newToken);
    },
    logout: () => {
      Cookie.remove("token");
      setToken("");
    },
    isLoggedIn: !!token,
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
