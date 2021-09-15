var expect = require('chai').expect,
    less = require('less'),
    fs = require('fs');

describe('Hidpi mixin', function () {
  it('must generate correct CSS code', function (done) {
    fs.readFile('test/fixtures/test.less', function (err, data) {
      less.render(data.toString(), function (err, css) {
        fs.readFile('test/fixtures/test.css', function (err, data) {
          expect(css).to.be.equal(data.toString());
          done();
        });
      });
    });
  });
});