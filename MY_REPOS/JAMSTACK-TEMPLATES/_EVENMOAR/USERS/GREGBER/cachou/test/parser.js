var parser = require('../lib/parser');
var expect = require('chai').use(require('sinon-chai')).expect;

describe('Parser', function () {
  describe('#encode', function () {
    it('should catch errors', function (done) {
      // Create a circular structure.
      var obj = {};
      obj.obj = obj;

      parser.encode(obj, function (err) {
        expect(err).to.exists;
        done();
      });
    });

    it('should encode data', function (done) {
      var obj = { foo: 'bar' };

      parser.encode(obj, function (err, data) {
        if (err) return done(err);
        expect(data).to.equal('{"foo":"bar"}');
        done();
      });
    });
  });

  describe('#decode', function () {
    it('should catch errors', function (done) {
      parser.decode('{foo:bar}', function (err) {
        expect(err).to.exists;
        done();
      });
    });

    it('should decode data', function (done) {
      parser.decode('{"foo":"bar"}', function (err, data) {
        if (err) return done(err);
        expect(data).to.eql({ foo: 'bar' });
        done();
      });
    });
  });
});