import React from "react";
import { Component } from "react";
import { Link } from "react-router";

class Header extends Component {
  render() {
    return (
      <header className="header__main__base">
        <div className="header__main__base__logo">
          <Link to="/">
            <img src="http://filipjerga.com/logo_white.png" alt="carmudi" />
          </Link>
        </div>
      </header>
    );
  }
}

export default Header;
