# css-background

[![Build Status](https://secure.travis-ci.org/johnotander/css-background.png?branch=master)](https://travis-ci.org/johnotander/css-background)

__Currently under development.__

Extract style values from the CSS background property shorthand.

<https://developer.mozilla.org/en-US/docs/Web/CSS/background>

## Installation

```bash
npm install --save css-background
```

## Usage

```javascript
var cssBackground = require('css-background');

cssBackground('#ffffff url("img_tree.png") no-repeat right top');
// => {
//   color: '#ffffff',
//   image: 'url("img_tree.png")',
//   repeat: 'no-repeat',
//   position: 'right top'
// }
```

## License

MIT

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

Crafted with <3 by [John Otander](http://johnotander.com) ([@4lpine](https://twitter.com/4lpine)).

***

> This package was initially generated with [yeoman](http://yeoman.io) and the [p generator](https://github.com/johnotander/generator-p.git).
