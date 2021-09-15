/* global describe, before, it */

var expect = require('chai').expect,
connect = require('connect'),
request = require('../index'),
app;

describe('Request', function () {
  before(function () {
    app = connect()
    .use(connect.json())
    .use(function (req, res) {

      if (req.body.user) {
        return res.end('data');
      }

      if (req.headers.test) {
        return res.end('header-test');
      }

      return res.end('foo');
    });
  });

  it('should return body on a get request', function () {
    request(app)
    .get('/')
    .end(function (res) {
      expect(res.body).to.be.equal('foo');
    });
  });

  it('should accept other methods', function () {
    request(app)
    .post('/')
    .end(function (res) {
      expect(res.body).to.be.equal('foo');
    });
  });

  it('should set header', function () {
    request(app)
    .get('/')
    .set('test', 'test')
    .end(function (res) {
      expect(res.body).to.be.equal('header-test');
    });
  });

  it('should write data on request', function () {
    request(app)
    .write('{"user": "greg"}')
    .set('Content-Type', 'application/json')
    .post('/')
    .end(function (res) {
      expect(res.body).to.be.equal('data');
    });
  });
});