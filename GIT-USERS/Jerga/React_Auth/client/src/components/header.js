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
      <nav className="navbar nav-light">
        <Link to="/" className="navbar-brand">
          {" "}
          Redux Auth{" "}
        </Link>
        <ul className="nav navbar-nav">{this.renderLinks()}</ul>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return { isAuthenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(Header);
