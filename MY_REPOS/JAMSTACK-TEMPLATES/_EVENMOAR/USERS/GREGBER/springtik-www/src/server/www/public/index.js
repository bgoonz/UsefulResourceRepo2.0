import express from 'express';
import config from '~/config';
import reactRouterMiddleware from '~/server/utils/reactRouterMiddleware';
import path from 'path';
import graphQLMiddleware from '~/server/graphql/middleware';
import graphQLSchema from '~/server/graphql/schema';
import GraphQLClientServerAdapter from '~/modules/graphql-client/GraphQLClientServerAdapter';

const router = express.Router();

const root = path.join(__dirname, '../../../..');
const publicPath = path.join(root, 'public/www-public');

const graphQLClientAdapter = new GraphQLClientServerAdapter({
  schema: graphQLSchema,
});

router.use(express.static(publicPath));
router.use('/graphql', graphQLMiddleware());
router.use(reactRouterMiddleware({
  name: 'www-public',
  dev: config.get('env') === 'development',
  routesPath: path.join(publicPath, 'dist/bundle.server.js'),
  layout: 'www/public/layout.html',
  graphQLClientAdapter,
}));

export default router;
