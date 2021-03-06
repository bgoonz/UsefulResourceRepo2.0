import React, { Component } from "react";
import { connect } from "react-redux";

export default (ComposedComponent) => {
  class RequireAuthentication extends Component {
    componentWillMount() {
      if (!this.props.authenticated) this.props.history.replace("/signin");
    }
    render() {
      if (!this.props.authenticated) return null;
      return <ComposedComponent {...this.props} />;
    }
  }

  const mapStateToProps = (state) => {
    return {
      authenticated: state.auth.authenticated,
    };
  };

  return connect(mapStateToProps)(RequireAuthentication);
};
