/*!
 * app-name <https://github.com/jonschlinkert/app-name
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors
 * Licensed under the MIT License (MIT)
 */

'use strict';

var should = require('should');
var appname = require('./');


describe('appname', function () {
  describe('when a replacement string is passed', function () {

    it('should strip a string from the string', function () {
      appname('foo', 'foo').should.eql('');
    });

    it('should strip a string from the string', function () {
      appname('grunt-assemble', 'grunt').should.eql('assemble');
    });

    it('should not strip a partial word from the string', function () {
      appname('function', 'func').should.eql('function');
    });

  });

  describe('when a replacement array is passed', function () {
    it('should strip an array of words from the string', function () {
      appname('handlebars-helper-slugify', ['handlebars', 'helper']).should.eql('slugify');
    });

    it('should strip an array of words from the string', function () {
      appname('generator-foo-bar-baz', ['generator']).should.eql('foo-bar-baz');
    });

    it('should strip an array of words from the string', function () {
      appname('handlebars-helper-slugify', ['handlebars-helper']).should.eql('slugify');
    });

    it('should not strip a partial word from the string', function () {
      appname('function', ['func']).should.eql('function');
    });

    it('should condense consecutive non-word characters', function () {
      appname('foo & bar_baz-quux', ['foo', 'quux']).should.eql('bar-baz');
    });
  });

  describe('options', function () {
    describe('when `last` is defined', function () {
      it('should strip words from the string then return the last word in the remainder', function () {
        appname('generator-foo-bar-baz', ['generator'], {last: true}).should.eql('baz');
      });
    });

    describe('when `first` is defined and an array is passed', function () {
      it('should strip words from the string then return the first word in the remainder', function () {
        appname('generator-foo-bar-baz', ['generator'], {first: true}).should.eql('foo');
      });
    });

    describe('when `first` is defined and a string is passed', function () {
      it('should strip words from the string then return the first word in the remainder', function () {
        appname('generator-foo-bar-baz', 'generator', {first: true}).should.eql('foo');
      });
    });

    describe('when a custom separator is defined', function () {
      it('should use the custom separator to join the resulting string', function () {
        appname('foo bar baz-quux', ['foo', 'quux'], {sep: '_'}).should.eql('bar_baz');
      });
    });
  });
});