/* jshint camelcase: false */

var _ = require('lodash'),
  async = require('async'),
  ig = require('../services/instagram'),
  Media = require('../models/media'),
  config = require('../config');

loop();

function loop() {
  async.waterfall([
    crawl,
    saveMedias
  ], function (err) {
    if (err) console.error(err);
    setTimeout(loop, 60000);
  });
}

function crawl(callback) {
  ig.tag_media_recent(config.get('crawl:tag'), callback);
}

function saveMedias(medias, pagination, limit, callback) {
  console.log('Get medias', medias.length);
  async.parallel(_.map(medias, function (media) {
    var localMedia = new Media(media);
    return function (callback) {
      localMedia.save(function (err, media) {
        if (err && err.code !== 11000) return callback(err, media);
        if (media) console.log('Inserted', media.id);
        callback(null, media);
      });
    };
  }), callback);
}