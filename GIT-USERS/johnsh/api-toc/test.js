/*!
 * api-toc <https://github.com/jonschlinkert/api-toc>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

/* deps:mocha */
var assert = require('assert');
var should = require('should');
var toc = require('./');


describe('toc', function () {
  it('should generate a TOC:', function () {
    var actual = toc('fixtures/');

    actual.should.equal([
      '+ **[config](fixtures/config.js)**',
      '  - [.disable](fixtures/config.js#L10)',
      '  - [.enable](fixtures/config.js#L6)',
      '  - [.option](fixtures/config.js#L2)',
      '+ **[a](fixtures/one/a.js)**',
      '  - [.aaa](fixtures/one/a.js#L2)',
      '  - [.bbb](fixtures/one/a.js#L6)',
      '  - [.ccc](fixtures/one/a.js#L10)',
      '+ **[b](fixtures/one/two/b.js)**',
      '  - [.xxx](fixtures/one/two/b.js#L2)',
      '  - [.yyy](fixtures/one/two/b.js#L6)',
      '  - [.zzz](fixtures/one/two/b.js#L10)',
      '+ **[storage](fixtures/storage.js)**',
      '  - [.extend](fixtures/storage.js#L10)',
      '  - [.get](fixtures/storage.js#L2)',
      '  - [.set](fixtures/storage.js#L6)',
      '+ **[utils](fixtures/utils.js)**',
      '  - [.bar](fixtures/utils.js#L6)',
      '  - [.baz](fixtures/utils.js#L10)',
      '  - [.foo](fixtures/utils.js#L2)'
    ].join('\n'));
  });

  it('should prefix the given string:', function () {
    toc('fixtures/', {prefix: 'Some utils.'}).should.equal([
      'Some utils.',
      '',
      '+ **[config](fixtures/config.js)**',
      '  - [.disable](fixtures/config.js#L10)',
      '  - [.enable](fixtures/config.js#L6)',
      '  - [.option](fixtures/config.js#L2)',
      '+ **[a](fixtures/one/a.js)**',
      '  - [.aaa](fixtures/one/a.js#L2)',
      '  - [.bbb](fixtures/one/a.js#L6)',
      '  - [.ccc](fixtures/one/a.js#L10)',
      '+ **[b](fixtures/one/two/b.js)**',
      '  - [.xxx](fixtures/one/two/b.js#L2)',
      '  - [.yyy](fixtures/one/two/b.js#L6)',
      '  - [.zzz](fixtures/one/two/b.js#L10)',
      '+ **[storage](fixtures/storage.js)**',
      '  - [.extend](fixtures/storage.js#L10)',
      '  - [.get](fixtures/storage.js#L2)',
      '  - [.set](fixtures/storage.js#L6)',
      '+ **[utils](fixtures/utils.js)**',
      '  - [.bar](fixtures/utils.js#L6)',
      '  - [.baz](fixtures/utils.js#L10)',
      '  - [.foo](fixtures/utils.js#L2)'
    ].join('\n'));
  });

  it('should insert the number of methods where `%total` is used:', function () {
    toc('fixtures/', {prefix: '%total utils.'}).should.equal([
      '20 utils.',
      '',
      '+ **[config](fixtures/config.js)**',
      '  - [.disable](fixtures/config.js#L10)',
      '  - [.enable](fixtures/config.js#L6)',
      '  - [.option](fixtures/config.js#L2)',
      '+ **[a](fixtures/one/a.js)**',
      '  - [.aaa](fixtures/one/a.js#L2)',
      '  - [.bbb](fixtures/one/a.js#L6)',
      '  - [.ccc](fixtures/one/a.js#L10)',
      '+ **[b](fixtures/one/two/b.js)**',
      '  - [.xxx](fixtures/one/two/b.js#L2)',
      '  - [.yyy](fixtures/one/two/b.js#L6)',
      '  - [.zzz](fixtures/one/two/b.js#L10)',
      '+ **[storage](fixtures/storage.js)**',
      '  - [.extend](fixtures/storage.js#L10)',
      '  - [.get](fixtures/storage.js#L2)',
      '  - [.set](fixtures/storage.js#L6)',
      '+ **[utils](fixtures/utils.js)**',
      '  - [.bar](fixtures/utils.js#L6)',
      '  - [.baz](fixtures/utils.js#L10)',
      '  - [.foo](fixtures/utils.js#L2)'
    ].join('\n'));
  });

  it('should filter keys using the given glob pattern:', function () {
    toc('fixtures/', {filter: '!**/{storage,a}.js'}).should.equal([
      '+ **[config](fixtures/config.js)**',
      '  - [.disable](fixtures/config.js#L10)',
      '  - [.enable](fixtures/config.js#L6)',
      '  - [.option](fixtures/config.js#L2)',
      '+ **[b](fixtures/one/two/b.js)**',
      '  - [.xxx](fixtures/one/two/b.js#L2)',
      '  - [.yyy](fixtures/one/two/b.js#L6)',
      '  - [.zzz](fixtures/one/two/b.js#L10)',
      '+ **[utils](fixtures/utils.js)**',
      '  - [.bar](fixtures/utils.js#L6)',
      '  - [.baz](fixtures/utils.js#L10)',
      '  - [.foo](fixtures/utils.js#L2)'
    ].join('\n'));
  });

  it('should throw an error:', function () {
    (function () {
      toc();
    }).should.throw('api-toc expects `directory` to be a string.');
  });
});
