var express = require('express');
var authInternal = require('../../middlewares/auth-internal');
var models = require('../../../models');
var sendQueue = require('../../../services/send-queue');
var spnPushPackage = require('../../../services/spn-push-package');

var router = module.exports = new express.Router();

router.use(authInternal());

// Create new notification.
router.post(
  '/websites/:websiteId/notifications',
  function (req, res, next) {
    models.Notification.create({
      title: req.body.title,
      body: req.body.body,
      action: req.body.action,
      url: req.body.url,
      WebsiteId: req.params.websiteId
    })
    .then(function (notification) {
      return sendQueue.push({notificationId: notification.id})
      .then(function () {
        res.status(200).send(notification);
      });
    })
    .nodeify(next);
  }
);

// Generate push package.
router.post(
  '/websites/:websiteId/generate-push-package',
  function (req, res, next) {
    spnPushPackage.generateFromId(req.params.websiteId)
    .then(function () {
      res.status(200).send({error: false});
    })
    .nodeify(next);
  }
);
