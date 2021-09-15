import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router";

class Header extends Component {
  render() {
    return (
      <header>
        <h1>
          <span className="title-bold">Border</span>Guru
        </h1>
      </header>
    );
  }
}

export default Header;
