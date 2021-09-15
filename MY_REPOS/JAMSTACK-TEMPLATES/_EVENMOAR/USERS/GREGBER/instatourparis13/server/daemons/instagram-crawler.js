/* jshint camelcase: false */

var _ = require('lodash'),
  async = require('async'),
  ig = require('../services/instagram'),
  Media = require('../models/media'),
  CrawlStatus = require('../models/crawl-status'),
  config = require('../config');

loop();

function loop() {
  async.waterfall([
    getMaxId,
    crawl,
    saveMedias
  ], function (err) {
    if (err) {
      console.error(err);
      setTimeout(loop, 5000);
      return ;
    }

    setTimeout(loop, 0);
  });
}

function crawl(maxTagId, callback) {
  var options = maxTagId ? { max_tag_id: maxTagId } : {};
  ig.tag_media_recent(config.get('crawl:tag'), options, callback);
}

function getMaxId(callback) {
  CrawlStatus
    .findOne()
    .sort('-_id')
    .exec(function (err, status) {
      if (err) return callback(err);

      callback(null, status ? status.max_tag_id : null);
    });
}

function saveMedias(medias, pagination, limit, callback) {
  console.log('Get medias', medias.length);
  async.parallel(_.map(medias, function (media) {
    var localMedia = new Media(media);
    return function (callback) {
      localMedia.save(function (err, media) {
        if (err && err.code !== 11000) return callback(err, media);
        if (media) console.log('Inserted', media);
        callback(null, media);
      });
    };
  }).concat([_.partial(saveMaxTagId, pagination.next_max_tag_id)]), callback);
}

function saveMaxTagId(maxTagId, callback) {
  console.log('maxTagId', maxTagId);
  var crawlStatus = new CrawlStatus({
    max_tag_id: maxTagId
  });
  crawlStatus.save(callback);
}