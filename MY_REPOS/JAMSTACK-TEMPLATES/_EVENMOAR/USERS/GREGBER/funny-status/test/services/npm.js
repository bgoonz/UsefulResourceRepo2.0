var expect = require('chai').expect;
var nock = require('nock');
var npm = require('../../lib/services/npm');

describe('NPM', function () {
  var endpoint = 'http://registry.npmjs.org';

  describe('with a 200', function () {
    beforeEach(function () {
      nock(endpoint)
        .get('/')
        .reply(200);
    });

    it('should be good', function (done) {
      npm()(function (err) {
        expect(err).to.not.exist;
        done();
      });
    });
  });

  describe('with a 500', function () {
    beforeEach(function () {
      nock(endpoint)
        .get('/')
        .reply(500);
    });

    it('should return an error', function (done) {
      npm()(function (err) {
        expect(err.message).to.equal('Bad statusCode: 500');
        done();
      });
    });
  });
});