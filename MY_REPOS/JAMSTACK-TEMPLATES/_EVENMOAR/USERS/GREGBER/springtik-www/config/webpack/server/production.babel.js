import '~/modules/bootstrap';
import generate from '../generators/server/production';
export default [
  generate('admin-private'),
  generate('admin-public'),
  generate('www-public'),
];
