import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";

import Product from "../pages/Product";
import Products from "../Products";

import Admin from "../pages/Admin";
import Profile from "../pages/Profile";
import LoginBox from "../pages/Login/LoginBox";
import RegisterBox from "../pages/Register/RegisterBox";

import Navbar from "./Navbar";

import Modals from "Modals";

import GlobalStyle from "./GlobalStyle";

const App = ({ page }) => (
  <div className="container">
    <GlobalStyle />
    <Modals />

    <Navbar />
    <div className="pt-3">
      {page === "ADMIN" && (
        <>
          <h2>Admin</h2>
          <Admin />
        </>
      )}

      {page === "HOME" && <Products />}

      {page === "LOGIN" && <LoginBox />}

      {page === "PRODUCT" && <Product />}

      {page === "PROFILE" && (
        <>
          <h2>Profile</h2>
          <Profile />
        </>
      )}

      {page === "REGISTER" && <RegisterBox />}
    </div>
  </div>
);

export default App;
