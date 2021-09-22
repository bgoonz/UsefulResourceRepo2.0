import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router";

class Footer extends Component {
  render() {
    return (
      <footer>
        <div className="row">
          <div className="col span-1-of-2">
            <ul className="footer-nav"></ul>
          </div>
          <div className="col span-1-of-2">
            <ul className="social-links"></ul>
          </div>
        </div>

        <div className="row">
          <p>Copyright &copy; 2016 Filip_Jerga. All rights reserved.</p>
        </div>
      </footer>
    );
  }
}

export default Footer;
