# css-extend

[![Build Status](https://secure.travis-ci.org/johnotander/css-extend.png?branch=master)](https://travis-ci.org/johnotander/css-extend)

A css micro library for `@extend` support in line with the proposed spec
by Tab Atkins (not yet accepted by the W3C).

<http://tabatkins.github.io/specs/css-extend-rule/#extend-rule>

This project was initially intended to be a rework plugin, however `rework` doesn't currently know
how to handle unknown `@rules`.

## Installation

```bash
npm install --save css-extend
```

## Usage

```javascript
var fs = require('fs');
var css = require('css');
var cssExtend = require('css-extend');

var css = fs.readFileSync('css/my-file.css', 'utf8').toString();
var out = cssExtend(css);
```

This will turn the following:

```css
.error {
  color: red;
}

.serious-error {
  color: green;
}

.serious-error {
  @extend {
    .error;
  }
  font-weight: bold;
}

.super-serious-error {
  @extend {
    .serious-error;
  }

  animation: flashing 1s infinite;
}
```

Into:

```css
.error,
.serious-error,
.super-serious-error {
  color: red;
}

.serious-error,
.super-serious-error {
  font-weight: bold;
}

.super-serious-error {
  animation: flashing 1s infinite;
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

This package was initially generated with [yeoman](http://yeoman.io) and the [p generator](https://github.com/johnotander/generator-p.git).
