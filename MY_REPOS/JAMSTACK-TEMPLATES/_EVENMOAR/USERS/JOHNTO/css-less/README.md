# css-less [![Build Status](https://secure.travis-ci.org/johnotander/css-less.png?branch=master)](https://travis-ci.org/johnotander/css-less) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

Convert CSS to Less

## Installation

```bash
npm install --save css-less
```

## Usage

```javascript
var cssLess = require('css-less')

cssLess()  // => true
```

#### Input

```css
:root {
  --foo: red;
}

.foo {
  color: var(--red);
}
```

#### Output

```less
@foo: red;

.foo {
  color: @foo;
}
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
