import '~/modules/bootstrap';
import React from 'react';
import ReactDOM from 'react-dom';
import match from 'react-router/lib/match';
import ReactRouter from 'react-router/lib/Router';
import browserHistory from 'react-router/lib/browserHistory';
import withContext from 'recompose/withContext';
import routes from './routes';
import BrowserAdapter from '~/modules/api-client/BrowserAdapter';
import http from './http';
import api from './api';

const adapter = new BrowserAdapter({http});
api.initialize(adapter);

const Router = withContext(
  {
    $window: React.PropTypes.object.isRequired,
    $document: React.PropTypes.object.isRequired,
    insertCss: React.PropTypes.func.isRequired,
  },
  () => ({
    $window: window,
    $document: document,
    insertCss: styles => styles._insertCss(),
  })
)(ReactRouter);

match(
  {
    history: browserHistory,
    routes,
  },
  (error, redirectLocation, props) => {
    ReactDOM.render(
      <Router {...props} />,
      document.getElementById('main')
    );
  }
);
