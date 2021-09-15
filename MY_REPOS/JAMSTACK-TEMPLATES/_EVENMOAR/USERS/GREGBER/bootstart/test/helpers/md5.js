/*jshint undef:false, expr:true, strict:false */

var expect = require('chai').expect,
Handlebars = require('../../app/helpers/md5');

describe('Handlebars md5 helper', function () {
  it('must return an md5 hash of a file', function () {
    var template = Handlebars.compile('{{md5 "test/fixtures/md5_file.js"}}');
    expect(template()).to.equal('498527f993c7f7052a542191159a6781');
  });
});