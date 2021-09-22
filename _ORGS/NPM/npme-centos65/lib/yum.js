// install the minimum viable set of
// apt packages required to perform an
// npmE install on Ubuntu trusty.
var _ = require('lodash'),
  async = require('async'),
  Promise = require('bluebird'),
  Util = require('./util');

function Yum(opts) {
  _.extend(this, {
    sudo: true,
    logger: require('./logger'),
    util: new Util(),
    packages: ['ansible', 'libselinux-python', 'nginx', 'redis'],
    installPrefix: 'yum install',
    epelDownloadUrl: 'http://dl.fedoraproject.org/pub/epel/6/x86_64/epel-release-6-8.noarch.rpm'
  }, opts)
}

Yum.prototype.downloadEpel = function(cb) {
  var _this = this,
    command = 'curl -XGET ' + this.epelDownloadUrl + ' > epel-release-6-8.noarch.rpm';

  return new Promise(function(resolve, reject) {
    _this.util.exec(command, {cwd: '/tmp'}, function() {
      resolve();
    });
  }).nodeify(cb);
};

Yum.prototype.installEpel = function(cb) {
  var _this = this,
    command = 'rpm -Uvh epel-release-6*.rpm';

  if (this.sudo) command = 'sudo ' + command;

  return new Promise(function(resolve, reject) {
    _this.util.exec(command, {cwd: '/tmp'}, function() {
      resolve();
    });
  }).nodeify(cb);
};

Yum.prototype.installPackages = function(cb) {
  var _this = this,
    command = this.sudo ? 'sudo ' + this.installPrefix : this.installPrefix;

  async.eachSeries(this.packages, function(package, callback) {
    _this.logger.success('installing', package);

    _this.util.exec(command + " " + package + " --enablerepo=epel", function() {
      callback();
    });
  }, function() {
    cb();
  });
};

module.exports = Yum;
