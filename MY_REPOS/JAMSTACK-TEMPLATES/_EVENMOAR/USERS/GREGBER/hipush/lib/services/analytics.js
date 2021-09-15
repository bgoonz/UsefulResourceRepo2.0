var models = require('../models');

exports.track = track;

/**
 * Track an event.
 *
 * @param {number} websiteId Website id
 * @param {string} event Event type
 * @param {object} [info] Additional infos.
 * @returns {Promise}
 */

function track(websiteId, event, info) {
  info = info || [];
  return models.Event.create({
    type: event,
    WebsiteId: websiteId,
    info: info
  });
}
