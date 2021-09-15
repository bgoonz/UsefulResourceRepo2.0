/* global describe, before, it */

var expect = require('chai').expect,
connect = require('connect'),
request = require('connect-mock-request'),
htmlMinifier = require('../index'),
app;

describe('HTML minifier', function () {
  describe('used without options', function () {
    before(function () {
      app = connect()
      .use(htmlMinifier())
      .use(function (req, res) {
        res.end('<p >Hello</p ><!-- Z -->');
      });
    });

    it('should minified the result body', function () {
      request(app)
      .get('/')
      .end(function (res) {
        expect(res.body).to.be.equal('<p>Hello</p><!-- Z -->');
      });
    });
  });

  describe('used with option "removeComments"', function () {
    before(function () {
      app = connect()
      .use(htmlMinifier({
        removeComments: true
      }))
      .use(function (req, res) {
        res.end('<p >Hello</p ><!-- Z -->');
      });
    });

    it('should minified the result body and remove comments', function () {
      request(app)
      .get('/')
      .end(function (res) {
        expect(res.body).to.be.equal('<p>Hello</p>');
      });
    });
  });
});