import '~/modules/bootstrap';
import generate from '../generators/server/development';
export default [
  generate('admin-private'),
  generate('admin-public'),
  generate('www-public'),
];
