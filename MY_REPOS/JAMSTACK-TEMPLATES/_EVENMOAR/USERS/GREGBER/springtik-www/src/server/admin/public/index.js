import express from 'express';
import config from '~/config';
import reactRouterMiddleware from '~/server/utils/reactRouterMiddleware';
import path from 'path';
import api from './api';

const router = express.Router();

const root = path.join(__dirname, '../../../..');
const publicPath = path.join(root, 'public/admin-public');

router.use(express.static(publicPath));
router.use('/api', api);
router.use(reactRouterMiddleware({
  name: 'admin-public',
  dev: config.get('env') === 'development',
  routesPath: path.join(publicPath, 'dist/bundle.server.js'),
  layout: 'admin/public/layout.html',
}));

export default router;
