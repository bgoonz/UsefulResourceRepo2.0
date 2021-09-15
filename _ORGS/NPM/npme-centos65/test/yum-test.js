var Lab = require('lab'),
  lab = exports.lab = Lab.script(),
  Yum = require('../lib/yum');

lab.experiment('Yum', function() {

  lab.experiment('downloadEpel', function() {
    lab.it('runs appropriate command for downloading EPEL', function(done) {
      var apt = new Yum({
        util: {
          exec: function(command) {
            Lab.expect(command).to.eql('sudo curl -XGET http://dl.fedoraproject.org/pub/epel/6/x86_64/epel-release-6-8.noarch.rpm > epel-release-6-8.noarch.rpm');
            done();
          }
        }
      });

      apt.downloadEpel(function() {})
    });
  });

  lab.experiment('installEpel', function() {
    lab.it('runs appropriate command for installing EPEL', function(done) {
      var yum = new Yum({
        util: {
          exec: function(command) {
            Lab.expect(command).to.eql('sudo rpm -Uvh epel-release-6*.rpm');
            done();
          }
        }
      });

      yum.installEpel(function() {})
    });
  });

  lab.experiment('installPackages', function() {
    lab.it('installs appropriate packages', function(done) {
      var yum = new Yum({
        packages: ['ansible'],
        util: {
          exec: function(command) {
            Lab.expect(command).to.eql('sudo yum install ansible --enablerepo=epel');
            done();
          }
        }
      });

      yum.installPackages(function() {})
    });
  });

});
