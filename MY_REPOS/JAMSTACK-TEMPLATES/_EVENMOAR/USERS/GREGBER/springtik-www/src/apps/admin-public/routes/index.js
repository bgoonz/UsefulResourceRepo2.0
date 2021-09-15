/* eslint-disable react/jsx-key */
import React from 'react';
import Route from 'react-router/lib/Route';
import Redirect from 'react-router/lib/Redirect';
import IndexRedirect from 'react-router/lib/IndexRedirect';
import App from './App';
import Login from './login/Login';

export default [
  <Route path="/" component={App}>
    <Route path="login" component={Login} />
    <IndexRedirect to="login" />
    <Redirect from="*" to="login" />
  </Route>,
];
