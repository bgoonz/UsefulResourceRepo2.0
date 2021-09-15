import '~/modules/bootstrap';
import React from 'react';
import ReactDOM from 'react-dom';
import withContext from 'recompose/withContext';
import match from 'react-router/lib/match';
import ReactRouter from 'react-router/lib/Router';
import applyRouterMiddleware from 'react-router/lib/applyRouterMiddleware';
import useScroll from 'react-router-scroll';
import browserHistory from 'react-router/lib/browserHistory';
import GraphQLClientBrowserAdapter from '~/modules/graphql-client/GraphQLClientBrowserAdapter';
import routes from './routes';
import graphQLClient from './graphQLClient';

graphQLClient.useAdapter(new GraphQLClientBrowserAdapter());

const Router = withContext(
  {
    $window: React.PropTypes.object.isRequired,
    $document: React.PropTypes.object.isRequired,
    insertCss: React.PropTypes.func.isRequired,
  },
  () => ({
    $window: window,
    $document: document,
    insertCss: styles => styles._insertCss({
      prepend: true,
      replace: true,
    }),
  })
)(ReactRouter);

match(
  {
    history: browserHistory,
    routes,
  },
  (error, redirectLocation, props) => {
    ReactDOM.render(
      <Router
        {...props}
        render={applyRouterMiddleware(useScroll())}
      />,
      document.getElementById('main')
    );
  }
);
