var _ = require('lodash');
  fs = require('fs'),
  Ansible = require('npme-ansible'),
  Yum = require('./yum'),
  async = require('async'),
  Service = require('./service'),
  logger = require('./logger');

module.exports = function(opts) {
  var yum = new Yum(opts),
    ansible = new Ansible(_.extend({}, opts, {platform: 'centos65'})),
    service = new Service(opts);

  async.series([
    function(cb) {
      yum.downloadEpel(cb);
    },
    function(cb) {
      yum.installEpel(cb);
    },
    function(cb) {
      yum.installPackages(cb);
    },
    function(cb) {
      ansible.install(cb);
    },
    function(cb) {
      // populate .npmrc with information required for license auth.
      fs.writeFileSync('/etc/npme/.npmrc', "//enterprise.npmjs.com/:_password=" + (new Buffer(opts.licenseKey)).toString('base64')
        + "\n//enterprise.npmjs.com/:username=" + opts.userEmail
        + "\n@npm:registry=https://enterprise.npmjs.com/\n");

      return cb();
    },
    function(cb) {
      // write the license to disk.
      // we need Ansible to have created the file.
      fs.writeFileSync('/etc/npme/.license.json', JSON.stringify(opts.license, null, 2));

      return cb();
    },
    function(cb) {
      service.interview(cb);
    },
    function(cb) {
      ansible.configure(service.getBinaryDirectory(), cb);
    },
    function(cb) {
      service.installPackages(cb);
    },
    function(cb) {
      service.chownPackages(cb);
    },
    function(cb) {
      service.runCouchApp(cb);
    },
    function(cb) {
      service.installServices(cb);
    },
    function(cb) {
      service.printFinishMessage();
      return cb();
    }
  ], function() {
    logger.success('npmE is now up and running!');
  });
};
