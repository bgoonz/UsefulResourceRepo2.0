var fs = require('fs');
var path = require('path');
var spnPushPackage = require('spn-push-package');
var spnAuthToken = require('./spn-auth-token');
var config = require('../config');
var Promise = require('bluebird');
var mkdirp = Promise.promisify(require('mkdirp'));
var models = require('../models');

// Expose methods.
exports.generate = generate;
exports.generateFromId = generateFromId;
exports.getPath = getPath;

/**
 * Return the path of the package.
 *
 * @param {number} id Id of the website
 * @returns {string} packagePath
 */

function getPath(id) {
  return path.join(config.spn.packageDirectory, id + '.zip');
}

/**
 * Generate a push package.
 *
 * @param {Website} website
 * @returns {Promise}
 */

function generate(website) {
  var imagePath = path.join(config.spn.imageDirectory, website.id + '.png');
  var zipPath = getPath(website.id);

  return mkdirp(path.dirname(zipPath))
  .then(function () {
    return new Promise(function (resolve) {
      var iconset = spnPushPackage.generateIconSet(imagePath);

      var zipStream = spnPushPackage.generate({
        websiteJSON: {
          websiteName: website.name,
          websitePushID: config.spn.websitePushID,
          allowedDomains: [website.domain],
          urlFormatString: config.spn.urlFormatString,
          authenticationToken: spnAuthToken.encode({websiteId: website.id}),
          webServiceURL: config.spn.webServiceURL.replace(':websiteId', website.id)
        },
        iconset: iconset,
        key: config.spn.key,
        keyPass: config.spn.keyPass,
        cert: config.spn.cert
      });

      var writeStream = fs.createWriteStream(zipPath);

      zipStream.pipe(writeStream);

      writeStream.on('close', resolve);
    });
  });
}

/**
 * Generate push package from website id.
 *
 * @param {number} websiteId
 * @returns {Promise}
 */

function generateFromId(websiteId) {
  return models.Website.find(websiteId)
  .then(function (website) {
    if (!website)
      throw new Error('Cannot find website');

    return generate(website);
  });
}
