var Promise = require('bluebird');
var request = require('request');
var util = require('util');
var _ = require('lodash');

exports.search = function (query) {
  return new Promise(function (resolve, reject) {
    request({
      url: 'https://api.flickr.com/services/rest/',
      qs: {
        method: 'flickr.photos.search',
        api_key: 'a610a183f07ca46f419297ac441ea347',
        tags: query,
        tag_mode: 'all',
        format: 'json',
        nojsoncallback: 1,
        content_type: 1,
        safe_search: 3,
        per_page: 50
      },
      json: true
    }, function (err, res, body) {
      if (err) return reject(err);
      var photo = _.sample(body.photos.photo);
      if (!photo) return resolve(null);
      resolve(util.format('https://farm%d.staticflickr.com/%s/%s_%s_c.jpg',
        photo.farm, photo.server, photo.id, photo.secret));
    });
  });
};
