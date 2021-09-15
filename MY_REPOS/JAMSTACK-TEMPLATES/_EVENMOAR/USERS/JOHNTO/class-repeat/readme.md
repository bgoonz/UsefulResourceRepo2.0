# class-repeat [![Build Status](https://secure.travis-ci.org/johnotander/class-repeat.png?branch=master)](https://travis-ci.org/johnotander/class-repeat) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

Repeat class selectors in a string, useful for getting around specificity woes when using utility classes in legacy projects.

## Installation

```bash
npm install --save class-repeat
```

## Usage

```javascript
var classRepeat = require('class-repeat')

classRepeat('.foo.bar') // => '.foo.foo.bar.bar'
classRepeat('.foo:before') // => '.foo.foo:before'
classRepeat('.foo .bar.baz') // => '.foo.foo .bar.bar.baz.baz'
classRepeat('input.foo-bar.baz > .pizazz') // => 'input.foo-bar.foo-bar.baz.baz > .pizazz.pizazz'
classRepeat('.foo', { repeat: 4 }) // => '.foo.foo.foo.foo'
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
