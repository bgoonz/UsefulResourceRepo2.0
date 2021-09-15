import React from "react";
import { Link } from "react-router";
import { connect } from "react-redux";

import * as actions from "../actions";

const Header = React.createClass({
  handleLogout() {
    var { dispatch } = this.props;

    return dispatch(actions.startLogout());
  },

  renderLoginLogout() {
    const uid = this.props.auth.uid;

    return uid ? (
      <Link onClick={this.handleLogout} to="/logout">
        {" "}
        Logout{" "}
      </Link>
    ) : (
      <Link to="/login"> Login </Link>
    );
  },

  render() {
    return (
      <ul className="menu">
        <Link to="/"> Home ||</Link>
        <Link to="/addinserat"> Add ||</Link>
        <Link to="/viewinserats"> View ||</Link>
        <Link to="/#"> View Best ||</Link>
        {this.renderLoginLogout()}
      </ul>
    );
  },
});

function mapStateToProp(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProp)(Header);
