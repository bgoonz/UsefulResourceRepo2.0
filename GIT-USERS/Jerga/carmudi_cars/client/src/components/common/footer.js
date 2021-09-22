import React from "react";
import { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <footer className="footer__main__base">
        <div className="footer__main__base__container">
          <div className="footer__main__base__logo">
            <img src="http://filipjerga.com/logo_black.png" alt="logo" />
          </div>
          <div className="footer__main__base__copyright">
            <p>&copy; 2016 by Carmudi Philippines, Inc.</p>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
