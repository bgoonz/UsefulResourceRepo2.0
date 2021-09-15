var express = require('express');
var authSpn = require('../../../../lib/http/middlewares/auth-spn');
var spnAuthToken = require('../../../../lib/services/spn-auth-token');
var request = require('supertest');

describe('Auth SPN middleware', function () {
  var app;

  beforeEach(function () {
    app = express();
    app.get('/', authSpn(), function (req, res) {
      res.send('websiteId: ' + req.websiteId);
    });
    app.use(function (err, req, res, next) {
      res.status(500).send(err.message);
    });
  });

  it('should return an error if there is no "Authorization" header', function (done) {
    request(app)
    .get('/')
    .expect(500)
    .expect('No authorization header found')
    .end(done);
  });

  it('should return an error if the "Authorization" header is not well formed', function (done) {
    request(app)
    .get('/')
    .set('Authorization', 'xx')
    .expect(500)
    .expect('Can\'t parse authorization header')
    .end(done);
  });

  it('should return an error if the token is malformed', function (done) {
    request(app)
    .get('/')
    .set('Authorization', 'ApplePushNotifications x')
    .expect(500)
    .expect('Token malformed')
    .end(done);
  });

  it('should attach a websiteId to request', function (done) {
    var token = spnAuthToken.encode({websiteId: 102});
    request(app)
    .get('/')
    .set('Authorization', 'ApplePushNotifications ' + token)
    .expect('websiteId: 102')
    .end(done);
  });
});
