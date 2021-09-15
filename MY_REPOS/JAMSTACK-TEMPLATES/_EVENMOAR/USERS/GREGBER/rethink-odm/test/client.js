var expect = require('chai').expect;
var rethinkOdm = require('../');

describe('Client', function () {
  describe('#run', function () {
    it('should run a command without waiting for connection', function (done) {
      var ro = rethinkOdm();
      ro.run(ro.r.now(), function (err, res) {
        if (err) return done(err);
        expect(res).to.be.instanceOf(Date);
        done();
      });
    });

    it('should be possible to use promise', function (done) {
      var ro = rethinkOdm();
      ro.run(ro.r.now()).then(function (res) {
        expect(res).to.be.instanceOf(Date);
      })
      .nodeify(done);
    });
  });

  describe('#close', function () {
    it('should be possible to close connection', function (done) {
      var ro = rethinkOdm();
      ro.close(function (err) {
        if (err) return done(err);
        expect(ro.conn).to.be.null;
        done();
      });
    });

    it('should be possible to listen event', function (done) {
      var ro = rethinkOdm();
      ro.on('close', function () {
        done();
      });
      ro.close();
    });
  });
});