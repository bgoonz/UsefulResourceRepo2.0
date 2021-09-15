import React from 'react';
import ReactDOMServer from 'react-dom/server';
import match from 'react-router/lib/match';
import RouterContext from 'react-router/lib/RouterContext';
import compose from 'recompose/compose';
import withContext from 'recompose/withContext';
import injectState from '~/modules/observo/server/injectState';
import resolve from '~/modules/observo/server/resolve';

export default ({
  routesPath,
  layout,
  name,
  dev,
  ...options,
}) => (req, res, next) => {
  const css = [];
  let redirect = false;

  if (dev)
    delete require.cache[require.resolve(routesPath)];

  const routes = require(routesPath).default({
    req,
    ...options,
  });

  match({routes, location: req.url}, (error, redirectLocation, props) => {
    if (error) {
      next(error);
      return;
    }

    if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      return;
    }

    if (!props) {
      res.status(404).send('Not found');
      return;
    }

    resolve(props, (err, initialState) => {
      if (err)
        return next(err);

      try {
        const content = ReactDOMServer.renderToString(
          React.createElement(
            compose(
              withContext(
                {
                  insertCss: React.PropTypes.func.isRequired,
                  redirect: React.PropTypes.func.isRequired,
                },
                () => ({
                  insertCss(styles) {
                    css.push(styles._getCss());
                  },
                  redirect(status, url) {
                    redirect = true;
                    res.redirect(status, url);
                  },
                })
              ),
              injectState(initialState)
            )(RouterContext)
            , props
          )
        );

        if (redirect)
          return;

        res.render(layout, {
          content,
          css: css.join(''),
          bundle: dev
            ? `http://localhost:8080/assets/${name}-bundle.js`
            : '/dist/bundle.js',
          initialState: JSON.stringify(initialState) || 'null',
        });
      } catch (e) {
        return next(e);
      }
    });
  });
};
