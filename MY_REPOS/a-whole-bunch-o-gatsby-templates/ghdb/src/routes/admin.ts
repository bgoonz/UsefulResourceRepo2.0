import { join, resolve } from 'path';
import { plugins } from 'restify';
import RestifyRouter = require('restify-router');

export const AdminRouter = new RestifyRouter.Router();
export const AdminRouterPrefix = '/client';

console.log(process.cwd());

AdminRouter.get(
  '/*',
  plugins.serveStatic({
    appendRequestPath: false,
    default: 'index.html',
    directory: resolve(join(process.cwd(), 'client', 'dist', 'client'))
  })
);
