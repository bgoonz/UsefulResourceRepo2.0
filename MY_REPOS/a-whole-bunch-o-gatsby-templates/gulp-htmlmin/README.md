# gulp-htmlmin [![NPM version](https://img.shields.io/npm/v/gulp-htmlmin.svg?style=flat)](https://www.npmjs.com/package/gulp-htmlmin) [![NPM monthly downloads](https://img.shields.io/npm/dm/gulp-htmlmin.svg?style=flat)](https://npmjs.org/package/gulp-htmlmin)  [![NPM total downloads](https://img.shields.io/npm/dt/gulp-htmlmin.svg?style=flat)](https://npmjs.org/package/gulp-htmlmin) [![Linux Build Status](https://img.shields.io/travis/jonschlinkert/gulp-htmlmin.svg?style=flat&label=Travis)](https://travis-ci.org/jonschlinkert/gulp-htmlmin)

> gulp plugin to minify HTML.

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save gulp-htmlmin
```

_Issues with the HTML parser and output must be reported on the [html-minifier](https://github.com/kangax/html-minifier/issues) issue tracker._

## Usage

```js
var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');

gulp.task('minify', function() {
  return gulp.src('src/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));
});
```

See the [html-minifer docs](https://github.com/kangax/html-minifier) for options.

## About

### Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

### Contributors

| **Commits** | **Contributor** |  
| --- | --- |  
| 41 | [shinnn](https://github.com/shinnn) |  
| 20 | [jonschlinkert](https://github.com/jonschlinkert) |  
| 8  | [doowb](https://github.com/doowb) |  
| 7  | [stevelacy](https://github.com/stevelacy) |  
| 2  | [TheDancingCode](https://github.com/TheDancingCode) |  
| 1  | [cwonrails](https://github.com/cwonrails) |  
| 1  | [igoradamenko](https://github.com/igoradamenko) |  
| 1  | [oblador](https://github.com/oblador) |  
| 1  | [jdalton](https://github.com/jdalton) |  
| 1  | [JoseChirivella14](https://github.com/JoseChirivella14) |  
| 1  | [nschloe](https://github.com/nschloe) |  
| 1  | [tomByrer](https://github.com/tomByrer) |  

### Building docs

_(This project's readme.md is generated by [verb](https://github.com/verbose/verb-generate-readme), please don't edit the readme directly. Any changes to the readme must be made in the [.verb.md](.verb.md) readme template.)_

To generate the readme, run the following command:

```sh
$ npm install -g verbose/verb#dev verb-generate-readme && verb
```

### Running tests

Running and reviewing unit tests is a great way to get familiarized with a library and its API. You can install dependencies and run tests with the following command:

```sh
$ npm install && npm test
```

### Author

**Jon Schlinkert**

* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](https://twitter.com/jonschlinkert)

**Shinnosuke Watanabe**

* [github/shinnn](https://github.com/shinnn)
* [twitter/shinnn_tw](https://twitter.com/shinnn_tw)

### License

Copyright ?? 2014-2017, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT License](LICENSE).

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.6.0, on December 24, 2017._
