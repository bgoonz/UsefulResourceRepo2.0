var Lab = require('lab'),
  lab = exports.lab = Lab.script(),
  Ansible = require('../lib/ansible');

lab.experiment('Ansible', function() {

  lab.experiment('install', function() {
    lab.it('executes install command with appropriate working directory', function(done) {
      var ansible = new Ansible({
        util: {
          exec: function(command, opts, cb) {
            Lab.expect(opts.cwd).to.match(/npme-ansible-module\/ansible/);
            done();
          }
        }
      });

      ansible.install(function() {})
    });
  });

  lab.experiment('configure', function() {
    lab.it('executes configure command with appropriate working directory', function(done) {
      var ansible = new Ansible({
        util: {
          exec: function(command, opts, cb) {
            Lab.expect(opts.cwd).to.match(/npme-ansible-module\/ansible/);
            done();
          }
        }
      });

      ansible.configure('/foo/bar', function() {})
    });
  });

});
