/*!
 * arr-reduce <https://github.com/jonschlinkert/arr-reduce>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var should = require('should');
var reduce = require('./');

it('should throw an error when no array or initial value are passed:', function () {
  (function () {
    reduce(null, function () {});
  }).should.throw('arr-reduce expects an array or initial value');
});

it('should run each element through the callback.', function () {
  var actual = reduce(['a', 'b', 'c'], function (acc, ele) {
    return acc.concat(ele + ele);
  }, []);

  actual.should.eql(['aa', 'bb', 'cc']);
});

it('should concatenate the initial value.', function () {
  var actual = reduce(['b', 'c'], function (acc, ele) {
    return acc.concat(ele);
  }, ['a']);

  actual.should.eql(['a', 'b', 'c']);
});

it('should reduce elements to a single value.', function () {
  var actual = reduce([1, 2, 3, 4, 5], function (acc, ele) {
    return acc + ele;
  });
  actual.should.equal(15);
});

it('should concat accumulated elements to an initial value.', function () {
  var actual = reduce(['b', 'c'], function (acc, ele) {
    return acc.concat(ele + ele);
  }, ['a']);

  actual.should.eql(['a', 'bb', 'cc']);
});

it('should use the initial value when an empty array is passed.', function () {
  var actual = reduce([], function (acc, ele) {
    return acc;
  }, ['a', 'b', 'c']);

  actual.should.eql(['a', 'b', 'c']);
});

it('should expose correct parameters to the callback function:', function () {
  reduce([1, 2, 3, 4, 5], function (acc, ele, i, arr) {
    ele.should.equal(arr[i]);
    acc.should.equal(arr[i - 1]);
    return ele;
  });
});

it('should allow `undefined` to be passed:', function () {
  var actual = reduce([1, 2, 3], function (acc, ele, i) {
    return (acc || [acc]).concat(ele);
  }, undefined);
  actual.should.eql([undefined, 1, 2, 3]);
});

it('should loop over sparse elements:', function () {
  var res = [1, 2, null, undefined, 3, null, null, 4, null, 5, null, 4];
  reduce(res, function (acc, ele, i, arr) {
    return (acc || 1) + (ele || 1);
  }).should.equal(25);
});

it('should add the initial value with sparse elements:', function () {
  var res = [1, 2, null, undefined, 3, null, null, 4, null, 5, null, 4];
  reduce(res, function (acc, ele, i, arr) {
    return (acc || 1) + (ele || 1);
  }, 25).should.equal(50);
});

