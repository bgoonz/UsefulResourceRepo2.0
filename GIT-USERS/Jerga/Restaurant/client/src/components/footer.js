import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router";

class Footer extends Component {
  render() {
    return (
      <footer>
        <div className="row">
          <div className="col span-1-of-2">
            <ul className="footer-nav">
              <li>
                <a href="#">About Me</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>
          <div className="col span-1-of-2">
            <ul className="social-links">
              <li>
                <a href="#">
                  <i className="ion-social-linkedin"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="ion-social-skype-outline"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="ion-social-googleplus"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div class="row">
          <p>Copyright &copy; 2016 Filip_Jerga. All rights reserved.</p>
        </div>
      </footer>
    );
  }
}

export default Footer;
