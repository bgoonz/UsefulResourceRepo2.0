# arr [![NPM version](https://badge.fury.io/js/arr.png)](http://badge.fury.io/js/arr)

> JavaScript utilities for arrays.

## Install
Install with [npm](npmjs.org):

```bash
npm i arr --save-dev
```

## Usage

```js
var utils = require('arr');
```

## API
### [filterType](index.js#L129)

Filter `array`, returning only the values of the given `type`.

* `array` **{Array}**    
* `type` **{String}**: Native type, e.g. `string`, `object`    
* `returns`: {Boolean}  

```js
var arr = ['a', {a: 'b'}, 1, 'b', 2, {c: 'd'}, 'c'];

utils.filterType(arr, 'object');
//=> [{a: 'b'}, {c: 'd'}]
```

### [firstIndex](index.js#L155)

Return the first index of the given `type`, or `-1` if not found.

* `array` **{Array}**    
* `type` **{String}**: Native type, e.g. `string`, `object`    
* `returns`: {Boolean}  

```js
utils.firstIndex(['a', 1, 'b', 2, {c: 'd'}, 'c'], 'object');
//=> 4
```

### [findFirst](index.js#L183)

Return the first index of the given `type`, or `-1` if not found.

* `array` **{Array}**    
* `type` **{String}**: Native type, e.g. `string`, `object`    
* `returns`: {Boolean}  

```js
utils.firstIndex(['a', 1, 'b', 2, {c: 'd'}, 'c'], 'object');
//=> 4
```

### [lastIndex](index.js#L202)

Return the first index of the given `type`, or `-1` if not found.

* `array` **{Array}**    
* `type` **{String}**: Native type, e.g. `string`, `object`    
* `returns`: {Boolean}  

```js
utils.firstIndex(['a', 1, 'b', 2, {c: 'd'}, 'c'], 'object');
//=> 4
```

### [findLast](index.js#L233)

Return the first index of the given `type`, or `-1` if not found.

* `array` **{Array}**    
* `type` **{String}**: Native type, e.g. `string`, `object`    
* `returns`: {Boolean}  

```js
utils.firstIndex(['a', 1, 'b', 2, {c: 'd'}, 'c'], 'object');
//=> 4
```

### [hasType](index.js#L254)

Filter `array`, returning only the numbers.

* `array` **{Array}**    
* `index` **{Array}**: Optionally specify the index of the number to return, otherwise all numbers are returned.    
* `returns` **{Array}**: Array of numbers or empty array.  

```js
var arr = ['a', {a: 'b'}, 1, 'b', 2, {c: 'd'}, 'c'];

utils.numbers(arr);
//=> [1, 2]
```

### [numbers](index.js#L275)

Filter `array`, returning only the numbers.

* `array` **{Array}**    
* `index` **{Array}**: Optionally specify the index of the number to return, otherwise all numbers are returned.    
* `returns` **{Array}**: Array of numbers or empty array.  

```js
var arr = ['a', {a: 'b'}, 1, 'b', 2, {c: 'd'}, 'c'];

utils.numbers(arr);
//=> [1, 2]
```

### [strings](index.js#L296)

Filter `array`, returning only the strings.

* `array` **{Array}**    
* `index` **{Array}**: Optionally specify the index of the string to return, otherwise all strings are returned.    
* `returns` **{Array}**: Array of strings or empty array.  

```js
var arr = ['a', {a: 'b'}, 1, 'b', 2, {c: 'd'}, 'c'];

utils.strings(arr);
//=> ['a', 'b', 'c']
```

### [objects](index.js#L317)

Filter `array`, returning only the objects.

* `array` **{Array}**    
* `index` **{Array}**: Optionally specify the index of the object to return, otherwise all objects are returned.    
* `returns` **{Array}**: Array of objects or empty array.  

```js
var arr = ['a', {a: 'b'}, 1, 'b', 2, {c: 'd'}, 'c'];

utils.objects(arr);
//=> [{a: 'b'}, {c: 'd'}]
```

### [functions](index.js#L340)

Filter `array`, returning only the functions.

* `array` **{Array}**    
* `index` **{Array}**: Optionally specify the index of the function to return, otherwise all functions are returned.    
* `returns` **{Array}**: Array of functions or empty array.  

```js
var one = function() {};
var two = function() {};
var arr = ['a', {a: 'b'}, 1, one, 'b', 2, {c: 'd'}, two, 'c'];

utils.functions(arr);
//=> [one, two]
```

### [arrays](index.js#L361)

Filter `array`, returning only the arrays.

* `array` **{Array}**    
* `index` **{Array}**: Optionally specify the index of the array to return, otherwise all arrays are returned.    
* `returns` **{Array}**: Array of arrays or empty array.  

```js
var arr = ['a', ['aaa'], 1, 'b', ['bbb'], 2, {c: 'd'}, 'c'];

utils.objects(arr);
//=> [['aaa'], ['bbb']]
```

### [first](index.js#L388)

Return the first element in `array`, or, if a callback is passed, return the first value for which the returns true.

* `array` **{Array}**    
* `returns`: {*}  

```js
var arr = ['a', {a: 'b'}, 1, one, 'b', 2, {c: 'd'}, two, 'c'];

utils.first(arr);
//=> 'a'

utils.first(arr, isType('object'));
//=> {a: 'b'}

utils.first(arr, 'object');
//=> {a: 'b'}
```

### [last](index.js#L420)

Return the last element in `array`, or, if a callback is passed, return the last value for which the returns true.

* `array` **{Array}**    
* `returns`: {*}  

```js
// `one` and `two` are functions
var arr = ['a', {a: 'b'}, 1, one, 'b', 2, {c: 'd'}, two, 'c'];

utils.last(arr);
//=> 'c'

utils.last(arr, isType('function'));
//=> two

utils.last(arr, 'object');
//=> {c: 'd'}
```

### [lastOfType](index.js#L444)

Get the last element in `array` of the given `type`.

* `array` **{Array}**    
* `type` **{String}**: The native type to get.    
* `returns`: {*}  

```js
var arr = ['a', {a: 'b'}, 1, 'b', 2, {c: 'd'}, 'c'];
lastOfType(arr, 'number');
//=> 2
```

### [firstOfType](index.js#L462)

Get the first element in `array` of the given `type`.

* `array` **{Array}**    
* `type` **{String}**: The native type to get.    
* `returns`: {*}  

```js
var arr = ['a', {a: 'b'}, 1, 'b', 2, {c: 'd'}, 'c'];
firstOfType(arr, 'number');
//=> 1
```

### [lastIsType](index.js#L480)

Returns `true` if the last element in `array` is the given `type`.

* `array` **{Array}**    
* `type` **{String}**: The native type to check.    
* `returns`: {Boolean}  

```js
var arr = ['a', {a: 'b'}, 1, 'b', 2, {c: 'd'}, 'c'];
lastIsType(arr, 'number');
//=> false
```

### [firstIsType](index.js#L498)

Returns `true` if the first element in `array` is the given `type`.

* `array` **{Array}**    
* `type` **{String}**: The native type to check.    
* `returns`: {Boolean}  

```js
var arr = ['a', {a: 'b'}, 1, 'b', 2, {c: 'd'}, 'c'];
firstIsType(arr, 'string');
//=> true
```

### [firstString](index.js#L515)

Get the first string in `array`.

* `array` **{Array}**    
* `returns`: {String}  

```js
var arr = ['a', {a: 'b'}, 1, 'b', 2, {c: 'd'}, 'c'];
firstString(arr, 'string');
//=> 'a'
```

### [lastString](index.js#L532)

Get the last string in `array`.

* `array` **{Array}**    
* `returns`: {String}  

```js
var arr = ['a', {a: 'b'}, 1, 'b', 2, {c: 'd'}, 'c'];
lastString(arr, 'string');
//=> 'c'
```

### [firstFunction](index.js#L549)

Get the first function in `array`.

* `array` **{Array}**    
* `returns`: {Function}  

```js
var arr = ['a', {a: 'b'}, 1, 'b', 2, {c: 'd'}, 'c'];
firstFunction(arr, 'function');
//=> 'a'
```

### [lastFunction](index.js#L566)

Get the last function in `array`.

* `array` **{Array}**    
* `returns`: {Function}  

```js
var arr = ['a', {a: 'b'}, 1, 'b', 2, {c: 'd'}, 'c'];
lastFunction(arr, 'function');
//=> 'a'
```

### [firstNumber](index.js#L583)

Get the first number in `array`.

* `array` **{Array}**    
* `returns`: {Function}  

```js
var arr = ['a', {a: 'b'}, 1, 'b', 2, {c: 'd'}, 'c'];
firstNumber(arr, 'number');
//=> '1'
```

### [lastNumber](index.js#L600)

Get the last number in `array`.

* `array` **{Array}**    
* `returns`: {Function}  

```js
var arr = ['a', {a: 'b'}, 1, 'b', 2, {c: 'd'}, 'c'];
lastNumber(arr, 'number');
//=> '2'
```

### [firstObject](index.js#L617)

Get the first object in `array`.

* `array` **{Array}**    
* `returns`: {Object}  

```js
var arr = ['a', {a: 'b'}, 1, 'b', 2, {c: 'd'}, 'c'];
firstObject(arr);
//=> {a: 'b'}
```

### [lastObject](index.js#L634)

Get the last object in `array`.

* `array` **{Array}**    
* `returns`: {Object}  

```js
var arr = ['a', {a: 'b'}, 1, 'b', 2, {c: 'd'}, 'c'];
lastObject(arr);
//=> {c: 'd'}
```

## Author

**Jon Schlinkert**
 
+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert) 

### Other javascript/node.js utils

Other projects that I maintain:

  - [assemble](https://github.com/jonschlinkert/assemble)
  - [verb](https://github.com/jonschlinkert/verb)
  - [less.js](https://github.com/jonschlinkert/less.js)
  - [handlebars-helpers](https://github.com/jonschlinkert/handlebars-helpers)
  - [arr](https://github.com/jonschlinkert/arr)
  - [arr-diff](https://github.com/jonschlinkert/arr-diff)
  - [array-last](https://github.com/jonschlinkert/array-last)
  - [array-slice](https://github.com/jonschlinkert/array-slice)
  - [array-sum](https://github.com/jonschlinkert/array-sum)
  - [arrayify-compact](https://github.com/jonschlinkert/arrayify-compact)
  - [compact-object](https://github.com/jonschlinkert/compact-object)
  - [delete](https://github.com/jonschlinkert/delete)
  - [for-in](https://github.com/jonschlinkert/for-in)
  - [for-own](https://github.com/jonschlinkert/for-own)
  - [has-any](https://github.com/jonschlinkert/has-any)
  - [has-value](https://github.com/jonschlinkert/has-value)
  - [is-number](https://github.com/jonschlinkert/is-number)
  - [is-plain-object](https://github.com/jonschlinkert/is-plain-object)
  - [mixin-deep](https://github.com/jonschlinkert/mixin-deep)
  - [mixin-object](https://github.com/jonschlinkert/mixin-object)
  - [object-length](https://github.com/jonschlinkert/object-length)
  - [omit-empty](https://github.com/jonschlinkert/omit-empty)
  - [reduce-object](https://github.com/jonschlinkert/reduce-object)


## License
Copyright (c) 2014 Jon Schlinkert, contributors.  
Released under the MIT license

***

_This file was generated by [verb-cli](https://github.com/assemble/verb-cli) on November 03, 2014._