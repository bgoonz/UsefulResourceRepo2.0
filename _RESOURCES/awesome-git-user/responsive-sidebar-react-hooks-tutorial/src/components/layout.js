import React, { Fragment } from "react";
import Header from "./header";
import Toggle from "./toggle";
import "./layout.css";
import Sidebar from "./sidebar";

const Layout = ({ children }) => {
  return (
    <Fragment>
      <Header />
      <Sidebar />
      <Toggle />
      <p>{children}</p>
    </Fragment>
  );
};

export default Layout;
