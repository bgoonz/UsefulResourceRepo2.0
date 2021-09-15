var isArray = require('lodash').isArray,
  partial = require('lodash').partial,
  async = require('async');

exports.status = status;

function status(ghClient, references, callback) {
  if (! isArray(references)) return statusOne(ghClient, references, callback);
  return async.map(references, partial(statusOne, ghClient), callback);
}

function statusOne(ghClient, reference, callback) {
  var repo = ghClient.repo(reference.repo);
  repo.statuses(reference.hash, callback);
}