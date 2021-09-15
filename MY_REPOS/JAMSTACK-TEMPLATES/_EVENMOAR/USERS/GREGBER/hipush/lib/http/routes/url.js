var models = require('../../models');
var notificationUrl = require('../../services/notification-url');
var logger = require('../../logger');

// Redirect to an url (click on notification).
module.exports = function (req, res, next) {
  if (!req.query.h) {
    var error = new Error('Can\'t find hash');
    error.status = 400;
    return next(error);
  }

  var data = notificationUrl.decode(req.query.h);

  // Save click in the database (asynchronous).
  models.Click.findOrCreate({
    where: {
      NotificationId: data.notificationId,
      UserId: data.userId
    }
  })
  .catch(function (err) {
    logger.error('Can\'t save click.', err);
  });

  res.redirect(data.url);
};
