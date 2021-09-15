import '~/modules/bootstrap';
import React from 'react';
import ReactDOM from 'react-dom';
import withContext from 'recompose/withContext';
import match from 'react-router/lib/match';
import ReactRouter from 'react-router/lib/Router';
import browserHistory from 'react-router/lib/browserHistory';
import routes from './routes';

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
