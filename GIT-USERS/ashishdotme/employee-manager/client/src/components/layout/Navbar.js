import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-info">
        <Link to="/" className="navbar-brand">
          Employee Managment
        </Link>
      </nav>
    );
  }
}

export default Navbar;
