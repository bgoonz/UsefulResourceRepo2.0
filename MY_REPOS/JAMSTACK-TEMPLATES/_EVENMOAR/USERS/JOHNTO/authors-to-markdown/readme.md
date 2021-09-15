# authors-to-markdown [![Build Status](https://secure.travis-ci.org/johnotander/authors-to-markdown.png?branch=master)](https://travis-ci.org/johnotander/authors-to-markdown) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

Convert authors and contributors in a package.json to a markdown list

## Installation

```bash
npm install --save authors-to-markdown
```

## Usage

```javascript
var authorsToMarkdown = require('authors-to-markdown')
var pkg = require('./package.json')

authorsToMarkdown(pkg)
// - [adam morse](mailto:hi@mrmrs.cc)
// - [robert forloine](http://sndsgn.com)
// - [david potsiadlo](http://davidpots.com)
// - [tyler benziger](http://tybenz.com)
// - [john otander](http://johnotander.com)
```

## License

MIT

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

Crafted with <3 by John Otander ([@4lpine](https://twitter.com/4lpine)).

***

> This package was initially generated with [yeoman](http://yeoman.io) and the [p generator](https://github.com/johnotander/generator-p.git).
