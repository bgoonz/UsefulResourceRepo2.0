import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";
import PropTypes from "prop-types";

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
    this.props.clearCurrentProfile();
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const authLinks = (
      <div className="navbar-nav ml-auto">
        <Link to="/feed" className="nav-item nav-link">
          Feed
        </Link>
        <Link to="/browse" className="nav-item nav-link">
          Browse
        </Link>
        <a href="" onClick={this.onLogoutClick.bind(this)} className="nav-link">
          Logout
        </a>
      </div>
    );

    const guestLinks = (
      <div className="navbar-nav ml-auto">
        <Link to="/feed" className="nav-item nav-link">
          Feed
        </Link>
        <Link to="/browse" className="nav-item nav-link">
          Browse
        </Link>
        <Link to="/login" className="nav-item nav-link">
          Login
        </Link>
        <Link to="/register" className="nav-item nav-link active">
          Register
        </Link>
      </div>
    );

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/" className="navbar-brand">
          Punedev
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          {!isAuthenticated ? guestLinks : authLinks}
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(
  Navbar
);
