// prompt user about their environment,
// and install npmE service dependencies.
// this is a port of the original
// npme-service-installer installer
// and should probably be refactored.
var _ = require('lodash'),
  async = require('async'),
  fs = require('fs'),
  path = require('path'),
  Promise = require('bluebird'),
  Util = require('./util');

function Service(opts) {
  _.extend(this, {
    npmBin: '/etc/npme/node_modules/.bin/npm',
    ndmBin: '/etc/npme/node_modules/.bin/ndm',
    user: 'npme',
    group: 'npme',
    sudo: true,
    registry: 'https://enterprise.npmjs.com',
    installDirectory: '/etc/npme',
    logger: require('./logger'),
    util: new Util()
  }, opts)
}

Service.prototype.interview = function(cb) {
  var _this = this;

  return new Promise(function(resolve, reject) {
    _this.util.exec(_this.ndmBin + ' interview', {cwd: _this.installDirectory}, function() {
      resolve();
    });
  }).nodeify(cb);
};

Service.prototype.installServices = function(cb) {
  var _this = this,
    command = this.ndmBin + ' generate --uid=' + this.user + ' --gid=' + this.group;

  if (this.sudo) command = 'sudo ' + command;

  return new Promise(function(resolve, reject) {
    _this.util.exec(command, {cwd: _this.installDirectory}, function() {
      resolve();
    });
  }).nodeify(cb);
};

Service.prototype.installPackages = function(cb) {
  var _this = this,
    command = this.npmBin + ' install --userconfig=/etc/npme/.npmrc --registry=' + this.registry;

  return new Promise(function(resolve, reject) {
    _this.util.exec(command, {cwd: _this.installDirectory}, function() {
      resolve();
    });
  }).nodeify(cb);
};

Service.prototype.chownPackages = function(cb) {
  var _this = this,
    command = 'chown -R ' + this.user + ':' + this.group + ' /etc/npme/node_modules';

  if (this.sudo) command = 'sudo ' + command;

  return new Promise(function(resolve, reject) {
    _this.util.exec(command, {cwd: _this.installDirectory}, function() {
      resolve();
    });
  }).nodeify(cb);
};

Service.prototype.runCouchApp = function(cb) {
  var _this = this,
    command = './bin/install-couch-app.sh';

  return new Promise(function(resolve, reject) {
    _this.util.exec(command, {cwd: _this.installDirectory}, function() {
      resolve();
    });
  }).nodeify(cb);
};

Service.prototype.getBinaryDirectory = function() {
  var serviceJson = JSON.parse(fs.readFileSync(
    path.resolve(this.installDirectory, 'service.json'),
    'utf-8'
  ));

  return serviceJson.args['--binary-directory'];
};

Service.prototype.printFinishMessage = function() {
  var logo = fs.readFileSync(path.resolve(
    __dirname,
    '../config/logo.txt'
  ), 'utf-8');

  this.logger.error(logo);
  this.logger.warn('run `npme start` to boot npmeE.');
  this.logger.warn('run `npme add-package <package-name>` to add packages to your whitelist.');
  this.logger.warn('logs are stored in /etc/npme/logs');
  this.logger.success('setup complete. npm loves you!');
};

module.exports = Service;
