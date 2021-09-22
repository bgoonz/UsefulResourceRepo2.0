var _ = require('lodash');
  fs = require('fs'),
  Ansible = require('npme-ansible'),
  async = require('async'),
  inquirer = require('inquirer'),
  Service = require('./service'),
  logger = require('./logger');

module.exports = function(opts) {
  var ansible = new Ansible(_.extend({}, opts, {platform: 'unknown'})),
    service = new Service(opts);

  async.series([
    function(cb) {
      inquirer.prompt([
        {
          name: 'ansible',
          message: "have you installed ansible on this computer?",
          type: 'confirm'
        },
        {
          name: 'couchdb',
          message: "have you installed CouchDB on this computer?",
          type: 'confirm'
        },
        {
          name: 'redis',
          message: "have you installed Redis on this computer?",
          type: 'confirm'
        },
        {
          name: 'nginx',
          message: "have you installed nginx on this computer?",
          type: 'confirm'
        },
      ], function(answers) {
        if (!answers.ansible) throw Error('first install ansible.');
        if (!answers.couchdb) throw Error('first install couchdb (brew install couchdb, apt-get install couchdb).');
        if (!answers.redis) throw Error('first install redis (brew install redis, apt-get install redis).');
        if (!answers.nginx) throw Error('first install nginx (brew install nginx, apt-get install nginx).');
        return cb();
      });
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
  ], function(err) {
    if (err) throw err;
    else logger.success('npmE is now up and running!');
  });
};
