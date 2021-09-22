var Lab = require('lab'),
  lab = exports.lab = Lab.script(),
  Apt = require('../lib/apt');

lab.experiment('Apt', function() {

  lab.experiment('installPackages', function() {
    lab.it('installs appropriate packages', function(done) {
      var apt = new Apt({
        packages: ['ansible'],
        util: {
          exec: function(command) {
            Lab.expect(command).to.eql('sudo apt-get install -y ansible');
            done();
          }
        }
      });

      apt.installPackages(function() {})
    });

    lab.it('executes callback once all packages are installed', function(done) {
      var packageInstalled = false,
        apt = new Apt({
        packages: ['ansible'],
        util: {
          exec: function(command, cb) {
            Lab.expect(command).to.eql('sudo apt-get install -y ansible');
            packageInstalled = true;
            cb();
          }
        }
      });

      apt.installPackages(function() {
        Lab.expect(packageInstalled).to.eql(true);
        done();
      })
    });
  });

});
