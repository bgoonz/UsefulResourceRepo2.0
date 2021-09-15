var Lab = require('lab'),
  lab = exports.lab = Lab.script(),
  Util = require('../lib/util');

lab.experiment('Util', function() {

  lab.experiment('exec', function() {
    lab.it('spawns a process and sends output logger', function(done) {
      var util = new Util({
        logger: {
          log: function(output) {
            Lab.expect(output).to.eql('hello')
            done();
          }
        }
      });

      util.exec('echo hello', function() {
        done();
      });
    });
  });

});
