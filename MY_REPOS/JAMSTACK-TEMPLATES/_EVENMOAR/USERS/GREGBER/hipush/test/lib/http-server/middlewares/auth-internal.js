var express = require('express');
var request = require('supertest');
var authInternal = require('../../../../lib/http/middlewares/auth-internal');
var config = require('../../../../lib/config');

describe('Auth internal middleware', function () {
  var app;

  beforeEach(function () {
    app = express();
    app.get('/', authInternal(), function (req, res) {
      res.send('OK');
    });
    app.use(function (err, req, res, next) {
      res.status(500).send(err.message);
    });
  });

  it('should return an error if the "Authorization" doesn\'t match secret', function (done) {
    request(app)
    .get('/')
    .expect(500)
    .expect('Unauthorized to access internal API')
    .end(done);
  });

  it('should give access if "Authorization" is correct', function (done) {
    request(app)
    .get('/')
    .set('Authorization', 'Internal ' + config.internal.authSecret)
    .expect('OK')
    .end(done);
  });
});
