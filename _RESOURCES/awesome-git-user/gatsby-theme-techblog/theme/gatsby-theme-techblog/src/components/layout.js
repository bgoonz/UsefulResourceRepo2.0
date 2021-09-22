import React from "react";
import Header from "./header";
import Footer from "./footer";
import "./layout.css";

const Layout = ({ children }) => (
  <>
    <Header />
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `0px 1.0875rem 1.45rem`,
        paddingTop: 0,
      }}
    >
      {children}
    </div>
    <Footer />
  </>
);

export default Layout;
