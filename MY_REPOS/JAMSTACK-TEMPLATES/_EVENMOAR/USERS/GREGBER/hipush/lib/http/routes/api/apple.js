var express = require('express');
var fs = require('fs');
var authSpn = require('../../middlewares/auth-spn');
var logger = require('../../../logger');
var config = require('../../../config');
var models = require('../../../models');
var spnPushPackage = require('../../../services/spn-push-package');
var analytics = require('../../../services/analytics');

var router = module.exports = new express.Router();

// Called when user accept to receive notifications.
router.post(
  '/website/:websiteId/v1/devices/:deviceToken/registrations/' + config.spn.websitePushID,
  authSpn(),
  function (req, res, next) {
    models.User.findOrCreate({
      where: {token: req.params.deviceToken},
      defaults: {
        WebsiteId: req.websiteId
      }
    })
    .spread(function (user) {
      analytics.track(req.params.websiteId, 'user-accept');
      res.sendStatus(200);
    })
    .nodeify(next);
  }
);

// Called when no longer want to receive notifications.
router.delete(
  '/website/:websiteId/v1/devices/:deviceToken/registrations/' + config.spn.websitePushID,
  authSpn(),
  function (req, res, next) {
    models.User.destroy({
      where: {token: req.params.deviceToken}
    })
    .then(function () {
      analytics.track(req.params.websiteId, 'user-revoke');
      res.sendStatus(200);
    })
    .nodeify(next);
  }
);

// Called to get push package.
router.post('/website/:websiteId/v1/pushPackages/' + config.spn.websitePushID, function (req, res, next) {
  var packagePath = spnPushPackage.getPath(req.params.websiteId);
  fs.stat(packagePath, function (err) {
    if (err) {
      var error = new Error('Cannot find package for website ' + req.params.websiteId);
      error.status = 400;
      return next(error);
    }

    analytics.track(req.params.websiteId, 'user-ask');

    res.sendFile(packagePath, {
      headers: {
        'Content-Type': 'application/zip'
      }
    });
  });

});

// Called to log something.
router.post('/website/:websiteId/v1/log', function (req, res) {
  logger.warn('Apple log (websiteId: ' + req.params.websiteId + ')', req.body);
  res.sendStatus(204);
});
