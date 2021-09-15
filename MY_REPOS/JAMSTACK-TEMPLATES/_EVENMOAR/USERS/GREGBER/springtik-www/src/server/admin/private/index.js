import express from 'express';
import config from '~/config';
import reactRouterMiddleware from '~/server/utils/reactRouterMiddleware';
import path from 'path';
import api from './api';
import graphqlMiddleware from '~/server/graphql/middleware';

const router = express.Router();

const root = path.join(__dirname, '../../../..');
const publicPath = path.join(root, 'public/admin-private');

router.use('/api', api);
router.use('/graphql', graphqlMiddleware());
router.use('/graphiql', (req, res) => {
  res.render('admin/private/graphiql.html', {
    bundle: config.get('env') === 'development'
      ? 'http://localhost:8080/assets/admin-private-graphiql-bundle.js'
      : '/dist/graphiql-bundle.js',
  });
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.use(express.static(publicPath));
router.use(reactRouterMiddleware({
  name: 'admin-private',
  dev: config.get('env') === 'development',
  routesPath: path.join(publicPath, 'dist/bundle.server.js'),
  layout: 'admin/private/layout.html',
}));

export default router;
