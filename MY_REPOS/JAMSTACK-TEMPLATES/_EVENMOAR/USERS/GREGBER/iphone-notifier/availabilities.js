var request = require('request');

exports.get = function (cb) {
  request({
    url: 'https://reserve.cdn-apple.com/FR/fr_FR/reserve/iPhone/availability.json',
    json: true
  }, cb);
};