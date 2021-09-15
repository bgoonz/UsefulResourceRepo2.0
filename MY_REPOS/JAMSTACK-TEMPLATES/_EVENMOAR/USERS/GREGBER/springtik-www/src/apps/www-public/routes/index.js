/* eslint-disable react/jsx-key */
import React from 'react';
import Route from 'react-router/lib/Route';
import IndexRoute from 'react-router/lib/IndexRoute';
import App from './App';
import Home from './home/Home';
import Activity from './activity/Activity';

export default [
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/activities/:activityPathname" component={Activity} />
  </Route>,
];
