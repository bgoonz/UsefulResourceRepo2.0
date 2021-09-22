// install the minimum viable set of
// apt packages required to perform an
// npmE install on Ubuntu trusty.
var _ = require('lodash'),
  async = require('async'),
  Util = require('./util');

function Apt(opts) {
  _.extend(this, {
    sudo: true,
    logger: require('./logger'),
    util: new Util(),
    packages: ['ansible'],
    installPrefix: 'apt-get install -y'
  }, opts)
}

Apt.prototype.installPackages = function(cb) {
  var _this = this,
    command = this.sudo ? 'sudo ' + this.installPrefix : this.installPrefix;

  async.each(this.packages, function(package, callback) {
    _this.logger.success('installing', package);

    _this.util.exec(command + " " + package, function() {
      callback();
    });
  }, function() {
    cb();
  });
};

module.exports = Apt;
