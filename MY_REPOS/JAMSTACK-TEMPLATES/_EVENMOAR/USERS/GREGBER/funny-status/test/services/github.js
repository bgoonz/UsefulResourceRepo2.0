var expect = require('chai').expect;
var nock = require('nock');
var github = require('../../lib/services/github');

describe('GitHub', function () {
  var endpoint = 'https://status.github.com';

  describe('with a 200 { status: "good" }', function () {
    beforeEach(function () {
      nock(endpoint)
        .get('/api/status.json')
        .reply(200, { status: 'good' });
    });

    it('should be good', function (done) {
      github()(function (err) {
        expect(err).to.not.exist;
        done();
      });
    });
  });

  describe('with a 200 { status: "down" }', function () {
    beforeEach(function () {
      nock(endpoint)
        .get('/api/status.json')
        .reply(200, { status: 'down' });
    });

    it('should return an error', function (done) {
      github()(function (err) {
        expect(err.message).to.equal('GitHub status not good: down');
        done();
      });
    });
  });

  describe('with a 500', function () {
    beforeEach(function () {
      nock(endpoint)
        .get('/api/status.json')
        .reply(500);
    });

    it('should return an error', function (done) {
      github()(function (err) {
        expect(err.message).to.equal('Bad statusCode: 500');
        done();
      });
    });
  });

  describe('with a bad JSON', function () {
    beforeEach(function () {
      nock(endpoint)
        .get('/api/status.json')
        .reply(200, 'xx');
    });

    it('should return an error', function (done) {
      github()(function (err) {
        expect(err.message).to.equal('Unexpected token x');
        done();
      });
    });
  });
});