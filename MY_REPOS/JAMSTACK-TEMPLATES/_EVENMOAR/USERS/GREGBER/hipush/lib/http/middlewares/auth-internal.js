var config = require('../../config');

/**
 * Parse authorization header to add websiteId to request object.
 */

module.exports = function () {
  return function (req, res, next) {
    var authorization = req.get('authorization');

    if (authorization !== 'Internal ' + config.internal.authSecret)
      return next(new Error('Unauthorized to access internal API'));

    next();
  };
};
