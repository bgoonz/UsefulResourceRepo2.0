import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({isLoggedIn, ...rest}) {
  return (
    isLoggedIn ?
      <Route {...rest}/> :
      <Redirect to="/"/>
  );
}

const state2props = (state) => ({
  isLoggedIn: state.isLoggedIn
});

export default connect(state2props)(PrivateRoute);
