import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router";

class Header extends Component {
  renderLinks() {
    if (this.props.isAuthenticated) {
      return (
        <li className="nav-item">
          <Link className="nav-link" to="/signout">
            {" "}
            Sign Out{" "}
          </Link>
        </li>
      );
    } else {
      return [
        <li key={1} className="nav-item">
          <Link className="nav-link" to="/signin">
            {" "}
            Sign In{" "}
          </Link>{" "}
        </li>,
        <li key={2} className="nav-item">
          {" "}
          <Link className="nav-link" to="/signup">
            {" "}
            Sign Up{" "}
          </Link>{" "}
        </li>,
      ];
    }
  }

  render() {
    return (
      <header>
        <nav>
          <div className="row">
            <a className="logo" href="#">
              RESTAURANTS.IO
            </a>

            <ul className="main-nav">
              <li>
                {" "}
                <a href="#projects">Restaurants</a>
              </li>
              <li>
                {" "}
                <a href="#"> Sign Up</a>
              </li>
              <li>
                {" "}
                <a href="#"> Contact</a>
              </li>
            </ul>
          </div>
        </nav>

        <div className="full-width-hr"></div>
      </header>
    );
  }
}

function mapStateToProps(state) {
  return { isAuthenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(Header);
