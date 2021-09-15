import React from "react";
import { connect } from "react-redux";

import { logout } from "actions";

class Logout extends React.Component {
  componentDidMount() {
    const { isAuth, user } = this.props.auth;
    if (isAuth) {
      this.props.dispatch(logout(user.uid));
    }
  }

  render() {
    const { isAuth } = this.props.auth;
    return (
      <div className="container">
        <div className="content-wrapper">
          {isAuth && <h1 className="title">You are getting logged out...</h1>}
          {!isAuth && <h1 className="title">You are logged out</h1>}
        </div>
      </div>
    );
  }
}

export default connect(({ auth }) => ({ auth }))(Logout);
