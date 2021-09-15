var _ = require('lodash');

/**
 * Create a new user.
 */

var User = module.exports = function (data) {
  _.defaults(this, data, {
    online: true,
    username: null
  });
};

/**
 * JSON serialization.
 *
 * @returns {object}
 */

User.prototype.toJSON = function () {
  return _.pick(this, 'id', 'username');
};
