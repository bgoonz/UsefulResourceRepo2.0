var util = require('util');
var crypto = require('crypto');
var Readable = require('stream').Readable;
var PassThrough = require('stream').PassThrough;
var archiver = require('archiver');
var Promise = require('promise');
var smime = require('smime');
var streamifier = require('streamifier');

/**
 * Generate a push package.
 *
 * @param {object} options Options
 * @param {string} options.key Key path
 * @param {string} options.cert Cert path
 * @param {string} [options.keyPass] Key password
 * @param {object} options.websiteJSON WebsiteJSON entries
 * @param {object} options.iconset An object containing a map of stream.
 * @returns {stream.Readable} zipStream
 */

exports.generate = function (options) {
  var pkg = new SpnPackage({
    key: options.key,
    cert: options.cert,
    keyPass: options.keyPass
  });

  // Add website.json
  var websiteJSONBuffer = new Buffer(JSON.stringify(options.websiteJSON));
  pkg.addFile('website.json', websiteJSONBuffer);

  // Add icons.
  Object.keys(options.iconset).forEach(function (name) {
    pkg.addFile('icon.iconset/' + name, options.iconset[name]);
  });

  return pkg;
};

/**
 * Create a new package.
 *
 * @param {object} options Options
 * @param {string} options.key Key path
 * @param {string} options.cert Cert path
 * @param {string} [options.keyPass] Key password
 */

function SpnPackage(options) {
  var pkg = this;

  pkg.key = options.key;
  pkg.cert = options.cert;
  pkg.keyPass = options.keyPass;
  pkg.zip = archiver('zip');
  pkg.generating = false;
  pkg.files = [];

  pkg.zip.on('error', function (err) {
    pkg.emit('error', err);
  });

  pkg.zip.on('data', function (data) {
    pkg.push(data);
  });

  pkg.zip.on('end', function () {
    pkg.push(null);
  });

  Readable.call(this);
}

util.inherits(SpnPackage, Readable);

/**
 * Add file in the package.
 *
 * @param {string} file File path
 * @param {Buffer|stream.Readable} content Content
 */

SpnPackage.prototype.addFile = function (file, content) {
  var pkg = this;

  var contentForHash, contentForZip;

  if (Buffer.isBuffer(content)) {
    contentForHash = contentForZip = content;
  } else {
    contentForHash = new PassThrough();
    contentForZip = new PassThrough();

    content.pipe(contentForHash);
    content.pipe(contentForZip);
  }

  pkg.zip.append(contentForZip, {name: file});
  this.files.push(hashFile({path: file, content: contentForHash}));
};

/**
 * Generate manifest file.
 */

SpnPackage.prototype.generateManifest = function () {
  var pkg = this;

  return Promise.all(pkg.files)
  .then(function (files) {
    var manifest = files.reduce(function (manifest, file) {
      manifest[file.path] = file.hash;
      return manifest;
    }, {});

    var manifestBuffer = new Buffer(JSON.stringify(manifest));
    pkg.zip.append(manifestBuffer, {name: 'manifest.json'});

    return manifestBuffer;
  });
};

/**
 * Sign manifest.
 *
 * @param {Buffer} manifest Manifest
 */

SpnPackage.prototype.sign = function (manifest) {
  var pkg = this;

  return smime.sign({
    content: streamifier.createReadStream(manifest),
    key: pkg.key,
    cert: pkg.cert,
    password: pkg.keyPass
  }).then(function (res) {
    pkg.zip.append(res.der, {name: 'signature'});
  });
};

/**
 * Return stream of the zip file.
 */

SpnPackage.prototype.generate = function () {
  var pkg = this;

  pkg.generating = true;

  pkg.generateManifest()
  .then(function (manifest) {
    return pkg.sign(manifest);
  })
  .then(function () {
    pkg.zip.finalize();
  })
  .nodeify(function (err) {
    if (err)
      pkg.emit('error', err);
  });

  return pkg;
};

/**
 * Readable stream read method.
 */

SpnPackage.prototype._read = function () {
  if (!this.generating)
    this.generate();

  this.zip._read();
};

/**
 * Add the hash to a file.
 *
 * @param {object} file File object
 * @returns {Promise}
 */

function hashFile(file) {
  return sha1(file.content)
  .then(function (hash) {
    file.hash = hash;
    delete file.content;
    return file;
  });
}

/**
 * Create a sha1 hash of a buffer.
 *
 * @param {Buffer|stream.Readable} content Buffer or stream
 * @returns {string} hash
 */

function sha1(content) {
  return new Promise(function (resolve, reject) {
    var shasum = crypto.createHash('sha1');
    shasum.setEncoding('hex');
    shasum.on('error', reject);

    if (Buffer.isBuffer(content)) {
      shasum.update(content);
      resolve(shasum.digest('hex'));
    } else {
      content.pipe(shasum);
      shasum.on('finish', function () {
        resolve(shasum.read());
      });
    }
  });
}
