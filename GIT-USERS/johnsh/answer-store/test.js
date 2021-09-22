'use strict';

require('mocha');
var path = require('path');
var assert = require('assert');
require('assert-fs')(assert);
var utils = require('./utils');
var Answer = require('./');
var answer;

var dir = utils.resolveDir('~/answers');

function json(filename) {
  return require(path.resolve(dir, filename));
}

describe('answer-store', function() {
  beforeEach(function() {
    answer = new Answer('answer-store-test');
  });

  afterEach(function() {
    answer.erase();
  });

  describe('instance', function() {
    it('should create an instance of Answer', function() {
      assert(answer instanceof Answer);
    });

    it('should expose a "data" property', function() {
      assert(answer.data);
      assert.equal(typeof answer.data, 'object');
    });

    it('should expose a "set" method', function() {
      assert(answer.data);
      assert.equal(typeof answer.set, 'function');
    });

    it('should expose a "get" method', function() {
      assert(answer.data);
      assert.equal(typeof answer.get, 'function');
    });

    it('should expose a "del" method', function() {
      assert(answer.data);
      assert.equal(typeof answer.del, 'function');
    });

    it('should expose a "has" method', function() {
      assert(answer.data);
      assert.equal(typeof answer.has, 'function');
    });
  });

  describe('cwd', function() {
    it('should use process.cwd() by default', function() {
      assert.equal(answer.cwd, process.cwd());
    });

    it('should use cwd defined on the constructor options', function() {
      answer = new Answer('answer-store-test', {cwd: 'foo'})
      assert.equal(answer.cwd, 'foo');
    });

    it('should update the cwd when directly defined', function() {
      answer = new Answer('answer-store-test', {cwd: 'foo'});
      answer.cwd = 'bar';
      assert.equal(answer.cwd, 'bar');
    });
  });

  describe('set', function() {
    beforeEach(function() {
      answer = new Answer('answer-store-test', {debug: true});
    });

    it('should create the `~/answers` directory when an answer is set', function() {
      answer.set('foo');
      assert.existsSync(utils.resolveDir('~/answers'));
    });

    it('should create an answer store in the default directory', function() {
      answer.set('foo');
      assert.existsSync(utils.resolveDir('~/answers/answer-store-test.json'));
    });

    it('should set a value on [locale][cwd]', function() {
      answer.set('foo');
      assert(answer.data.locales.en[answer.name]);
    });

    it('should set a value on the default locale, "en"', function() {
      answer.set('foo');
      assert(answer.data.locales.en[answer.name]);
    });

    it('should set a value on the specified locale', function() {
      answer.set('bar', 'es');
      assert(answer.data.locales.es[answer.name]);
      assert.equal(answer.data.locales.es[answer.name], 'bar');
    });
  });

  describe('has', function() {
    beforeEach(function() {
      answer = new Answer('answer-store-test', {debug: true});
    });

    it('should return true if a value has been set for the cwd', function() {
      answer.set('foo');
      assert(answer.has());
    });

    it('should return true if a value has been set for the default locale', function() {
      answer.set('foo');
      assert(answer.has());
    });

    it('should return true if a default value has been set', function() {
      answer.set('foo');
      answer.setDefault('bar');
      assert(answer.hasDefault());
    });

    it('should return false if a default value has not been set', function() {
      answer.set('foo');
      assert(!answer.hasDefault());
    });

    it('should return false if a value has not been set for the default locale', function() {
      assert(!answer.has());
    });

    it('should return true if a value has been set for the given locale', function() {
      answer.set('foo', 'es');
      assert(answer.has('es'));
    });

    it('should return false if a value has not been set for the given locale', function() {
      answer.set('foo');
      assert(!answer.has('es'));
    });

    it('should return true if a default value has been set for a locale', function() {
      answer.setDefault('bar', 'es');
      assert(answer.hasDefault('es'));
    });

    it('should return false if a default value has not been set for a locale', function() {
      answer.setDefault('baz');
      assert(!answer.hasDefault('es'));
    });
  });
});
