/*!
 * any <https://github.com/jonschlinkert/any>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

require('should');
var any = require('./');


/**
 * Tests are modified from the following sources:
 *
 *   - lodash/lodash
 *   - mout/mout
 */

var isEven = function(val, key, obj) {
  return (val % 2 === 0);
};

describe('any/strings', function() {
  it('should work on strings', function () {
    any('a-b-c', 'a').should.be.true;
    any('a-b-c', 'd').should.be.false;
    any('a c', ' ').should.be.true;
    any('ac', ' ').should.be.false;
  });
});

describe('mout tests: any/arrays', function() {
  it('should work on normal array', function () {
    var a1 = [1, 2, 3];
    var a2 = [1, 3, 5];
    var a3 = [2, 4, 6];

    any(a1, isEven).should.be.true;
    any(a2, isEven).should.be.false;
    any(a3, isEven).should.be.true;
  });

  it('should iterate over sparse items.', function () {
    var a1 = [1, 2, 3];
    a1[10] = 8;
    var a2 = [1, 3, 5];
    a2[10] = 7;
    var a3 = [2, 4, 6];
    a3[10] = 10;

    any(a1, isEven).should.be.true;
    any(a2, isEven).should.be.false;
    any(a3, isEven).should.be.true;
    // IMPORTANT
    // ---------
    // this behavior is different than ES5 Array#some
    any(a1, function (val) {
      return val == null;
    }).should.be.true;
  });

  it('should work on empty arrays', function () {
    any([], isEven).should.be.false;
  });

  it('should work on null/undefined array', function () {
    any(null, isEven).should.be.false;
    any(undefined, isEven).should.be.false;
  });

  it('should be incremental', function () {
    var a = [1, 2, 3];
    var compare = [];
    any(a, function (val) {
      compare.push(val);
      return val === 3;
    }).should.be.true;
    a.should.eql(compare);
  });

  it('should allow shorthand object syntax', function () {
    var arr = [{a: 3}, {a: 3,b: 2}, {a: 3,b: 4}, {a: 3,b: 1}];
    any(arr, {a: 3,b: 2}).should.be.true;
    any(arr, {b: 2}).should.be.true;
    any(arr, {b: 5}).should.be.false;
  });

  it('should allow shorthand string syntax', function () {
    var arr = [{a: 3}, {a: 3,b: 2}, {a: 3,b: 4}, {a: 3,b: 1}];
    any(arr, 'a').should.be.true;
    any(arr, 'b').should.be.true;
    any(arr, 'c').should.be.false;
  });
});

describe('mout tests: any/objects', function() {
  it('should work on normal object', function () {
    var a1 = {a: 1, b: 2, c: 3};
    var a2 = {a: 1, b: 3, c: 5};
    var a3 = {a: 2, b: 4, c: 6};

    any(a1, isEven).should.be.true;
    any(a2, isEven).should.be.false;
    any(a3, isEven).should.be.true;
  });

  it('should allow shorthand string syntax', function () {
    any({a: 'b', c: 'd'}, 'a').should.be.true;
  });

  it('should work on empty objects', function () {
    any({}, isEven).should.be.false;
  });

  it('should avoid don\'t enum bug on IE 7-8', function () {
    var a1 = {a: 1, toString: 2};
    var a2 = {a: 1, toString: 3};
    any(a1, isEven).should.be.true;
    any(a2, isEven).should.be.false;
  });

  it('should support shorthand syntax', function () {
    var obj = {
      a: {foo: 'bar', lorem: 'ipsum', id: 1},
      b: {foo: 'bar', lorem: 'ipsum', id: 2},
      c: {foo: 'bar', lorem: 'ipsum', id: 4}
    };
    any(obj, {foo: 'bar', lorem: 'ipsum'}).should.be.true;
    any(obj, {lorem: 'ipsum', id: 1}).should.be.true;
    any(obj, {id: 123}).should.be.false;
    any(obj, {amet: 123}).should.be.false;
  });

  it('should allow string shorthand syntax', function () {
    var obj = {
      a: {foo: 'bar', lorem: 'ipsum', id: 1, disabled: false},
      b: {foo: 'bar', lorem: 'ipsum', id: 2, disabled: false},
      c: {foo: 'bar', lorem: 'ipsum', id: 0, disabled: false}
    };
    any(obj, 'foo').should.be.true;
    any(obj, 'id').should.be.true;
    any(obj, 'amet').should.be.false;
    any(obj, 'disabled').should.be.false;
  });
});


describe('mout tests: any/collections', function() {
  it('should work on normal array', function () {
    var a1 = [1, 2, 3];
    var a2 = [1, 3, 5];
    var a3 = [2, 4, 6];

    any(a1, isEven).should.be.true;
    any(a2, isEven).should.be.false;
    any(a3, isEven).should.be.true;
  });

  it('should work on normal object', function () {
    var a1 = {a: 1, b: 2, c: 3};
    var a2 = {a: 1, b: 3, c: 5};
    var a3 = {a: 2, b: 4, c: 6};

    any(a1, isEven).should.be.true;
    any(a2, isEven).should.be.false;
    any(a3, isEven).should.be.true;
  });

  it('should iterate over sparse items.', function () {
    var a1 = [1, 2, 3];
    a1[10] = 8;
    var a2 = [1, 3, 5];
    a2[10] = 7;
    var a3 = [2, 4, 6];
    a3[10] = 10;

    any(a1, isEven).should.be.true;
    any(a2, isEven).should.be.false;
    any(a3, isEven).should.be.true;

    // IMPORTANT
    // ---------
    // this behavior is different than ES5 Array#some
    var actual = any(a1, function (val) {
      return val == null;
    });

    actual.should.be.true;
  });

  it('should work on empty arrays', function () {
    any([], isEven).should.be.false;
  });

  it('should work on empty objects', function () {
    any({}, isEven).should.be.false;
  });

  it('should be incremental', function () {
    var a = [1, 2, 3];
    var compare = [];

    var actual = any(a, function (val) {
      compare.push(val);
      return val === 3;
    });

    actual.should.be.true;
    a.should.eql(compare);
  });

  it('should support shorthand syntax', function () {
    var obj = {
      '0': {foo: 'bar', lorem: 'ipsum', id: 1},
      '1': {foo: 'bar', lorem: 'ipsum', id: 2},
      '2': {foo: 'bar', lorem: 'ipsum', id: 4}
    };
    var arr = [obj[0], obj[1], obj[2]];

    any(obj, {foo: 'bar', lorem: 'ipsum'}).should.be.true;
    any(obj, {lorem: 'ipsum', id: 1}).should.be.true;
    any(obj, {amet: 123}).should.be.false;

    any(arr, {foo: 'bar', lorem: 'ipsum'}).should.be.true;
    any(arr, {lorem: 'ipsum', id: 1}).should.be.true;
    any(arr, {amet: 123}).should.be.false;
  });

  it('should allow string shorthand syntax', function () {
    var obj = {
      '0': {foo: 'bar', lorem: 'ipsum', id: 1},
      '1': {foo: 'bar', lorem: 'ipsum', id: 2},
      '2': {foo: 'bar', lorem: 'ipsum', id: 0}
    };


    any(obj, 'foo').should.be.true;
    any(obj, 'id').should.be.true;
    any(obj, 'amet').should.be.false;

    var arr = [obj[0], obj[1], obj[2]];
    any(arr, 'foo').should.be.true;
    any(arr, 'id').should.be.true;
    any(arr, 'amet').should.be.false;
  });
});

describe('lodash tests: _.some', function () {
  it('should return `true` if any element in the collection is truthy', function() {
    any([false, 1, '']).should.be.true;
    any([null, 'x', 0]).should.be.true;
  });

  it('should return `false` if no element in the collection is truthy', function() {
    any([false, false, false]).should.be.false;
    any([false, false, 'foo']).should.be.true;
    any([null, 0, '']).should.be.false;
    any([null, 0, '', undefined, void(42)]).should.be.false;
    any([null, 0, '', undefined, void(42), true]).should.be.true;
  });

  it('should return `true` as soon as a value returns truthy', function() {
    any([null, , null, ,]).should.be.false;
    any([null, true, null, ,]).should.be.true;
    any([null, null, null]).should.be.false;
    any([null, true, null]).should.be.true;
  });

  it('should use the elements in the array itself when no predicate is provided', function() {
    any([0, 1]).should.be.true;
    any([0, 0]).should.be.false;
    any([0, 0, 0, 0]).should.be.false;
    any([0, 2, 0, 0]).should.be.true;
  });
});
