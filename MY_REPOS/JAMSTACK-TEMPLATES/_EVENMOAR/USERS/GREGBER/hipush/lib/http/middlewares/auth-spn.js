var spnAuthToken = require('../../services/spn-auth-token');

/**
 * Parse authorization header to add websiteId to request object.
 */

module.exports = function () {
  return function (req, res, next) {
    var authorization = req.get('authorization');

    if (!authorization) return next(new Error('No authorization header found'));

    var matches = authorization.match(/^ApplePushNotifications (.+)$/);

    if (!matches) return next(new Error('Can\'t parse authorization header'));

    var token = matches[1];

    try {
      var payload = spnAuthToken.decode(token);

      if (!payload.websiteId) throw new Error('WebsiteId not found');

      req.websiteId = payload.websiteId;
    } catch (e) {
      return next(new Error('Token malformed'));
    }

    next();
  };
};
