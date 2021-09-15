import '~/modules/bootstrap';
import generate from '../generators/browser/development';

export default [
  generate('admin-private', {
    name: 'graphiql',
    bundle: 'graphiql-bundle.js',
    entry: './graphiql',
  }),
  generate('admin-private'),
  generate('admin-public'),
  generate('www-public'),
];
