import React, { useState } from "react";
import { Link } from "gatsby";
import Header from "./header";
import Footer from "./footer";

export default function Layout({ children }) {
  const [sidebarClass, setSidebarClass] = useState("sidebar");

  const handleSlide = () => {
    setSidebarClass("sidebar-show");
  };
  const handleClose = (e) => {
    e.preventDefault();
    setSidebarClass("sidebar-hide");
  };

  return (
    <div className="layout">
      <Header isOpen={handleSlide} />
      <main>{children}</main>
      <div id="sidebar" className={sidebarClass}>
        <Link to="/">
          <h3 className="sidebar-link">home</h3>
        </Link>
        <Link to="/about">
          <h3 className="sidebar-link">about</h3>
        </Link>
        <Link to="/portfolio">
          <h3 className="sidebar-link">portfolio</h3>
        </Link>
        <Link to="/posts">
          <h3 className="sidebar-link">posts</h3>
        </Link>
        <button className="sidebar-btn" onClick={handleClose}>
          CLOSE
        </button>
      </div>
      <Footer />
    </div>
  );
}
