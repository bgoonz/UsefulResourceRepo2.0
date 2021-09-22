import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import "../styles/layout.scss";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
