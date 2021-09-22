import React from "react";
import { Link } from "react-router-dom";
import "../../styles/header.css";

const Header = () => {
  return (
    <div className="header">
      <h1 className="header-title">React Plot</h1>
      <Link className="links" to="/">
        Home
      </Link>
    </div>
  );
};

export default Header;
