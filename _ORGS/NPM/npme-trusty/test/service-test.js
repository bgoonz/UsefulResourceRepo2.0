var Lab = require('lab'),
  lab = exports.lab = Lab.script(),
  Service = require('../lib/service');

lab.experiment('Service', function() {

  lab.experiment('interview', function() {
    lab.it('execs appropriate command to generate config', function(done) {
      var service = new Service({
        util: {
          exec: function(command, opts, cb) {
            Lab.expect(command).to.match(/ndm interview/);
            done();
          }
        }
      });

      service.interview();
    });
  });

  lab.experiment('installServices', function() {
    lab.it('execs appropriate command to install services', function(done) {
      var service = new Service({
        util: {
          exec: function(command, opts, cb) {
            Lab.expect(command).to.eql('sudo /etc/npme/node_modules/.bin/ndm generate --uid=npme --gid=npme');
            done();
          }
        }
      });

      service.installServices();
    });
  });

  lab.experiment('installPackages', function() {
    lab.it('execs appropriate command to install packages', function(done) {
      var service = new Service({
        util: {
          exec: function(command, opts, cb) {
            Lab.expect(command).to.eql('sudo /etc/npme/node_modules/.bin/npm install --userconfig=/etc/npme/.npmrc --registry=https://enterprise.npmjs.com');
            done();
          }
        }
      });

      service.installPackages();
    });
  });

  lab.experiment('runCouchApp', function() {
    lab.it('execs appropriate command to install the npmE couch-app', function(done) {
      var service = new Service({
        util: {
          exec: function(command, opts, cb) {
            done();
          }
        }
      });

      service.runCouchApp();
    });
  });

  lab.experiment('chownPackages', function() {
    lab.it('execs appropriate command to chown packages', function(done) {
      var service = new Service({
        util: {
          exec: function(command, opts, cb) {
            Lab.expect(command).to.eql('sudo chown -R npme:npme /etc/npme/node_modules')
            done();
          }
        }
      });

      service.chownPackages();
    });
  });


  lab.experiment('getBinaryDirectory', function() {
    lab.it('parses service.json and returns the appropriate binary directory', function(done) {
      var service = new Service({
        installDirectory: './test/fixtures'
      });

      Lab.expect(service.getBinaryDirectory()).to.eql('/home/ubuntu/packages');
      done();
    });
  });

  lab.experiment('printFinishMessage', function() {
    lab.it('prints the finish message', function(done) {
      var service = new Service({
        installDirectory: './test/fixtures',
        logger: {
          warn: function() {},
          success: function() {},
          error: function(msg) {
            // npm loves you!
            Lab.expect(msg).to.match(/♥♥♥♥         ♥♥♥♥     ♥♥♥♥                  ♥♥♥♥         ♥♥♥♥♥    ♥♥♥♥♥    ♥♥♥♥♥/);
            done();
          }
        }
      });

      service.printFinishMessage();
    });
  });

});
