# broccoli-csslint [![Build Status](https://travis-ci.org/johno/broccoli-csslint.svg?branch=master)](https://travis-ci.org/johno/broccoli-csslint)

Add CSS linting to your [Broccoli](https://github.com/broccolijs/broccoli) tree.

## Installation

```
npm i broccoli-csslint
```

## Usage

```javascript
var cssLint = require('broccoli-csslint');
var tree = cssLint(someTree);
```

For linting options refer to the official [CSSLint](https://github.com/CSSLint/csslint/wiki/Rules-by-ID) documentation.

### Excluding files

Additionally this plugin provides the ability to define **exclude-list** in the .csslintrc file.

## Development

```
npm i && npm t
```

## License

MIT

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

## Thanks to the following

* [gulp-csslint](https://github.com/lazd/gulp-csslint): Used as a reference for CSSLint.
* [broccoli-jshint](https://github.com/rwjblue/broccoli-jshint): Adapted this plugin's code for csslinting.

Crafted with <3 by [John Otander](http://johnotander.com) ([@4lpine](https://twitter.com/4lpine)).
