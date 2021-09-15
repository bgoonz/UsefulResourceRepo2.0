var Handlebars = require('handlebars'),
    hbsMd5 = require('../md5');

require('chai').should();

describe('Handlebars md5 helper', function () {
  before(function () {
    Handlebars.registerHelper('md5', hbsMd5);
  });
  it('must return an md5 hash of a file', function () {
    var template = Handlebars.compile('test-{{md5 "test/fixtures/md5_file.js"}}');
    template().should.equal('test-498527f993c7f7052a542191159a6781');
  });
});