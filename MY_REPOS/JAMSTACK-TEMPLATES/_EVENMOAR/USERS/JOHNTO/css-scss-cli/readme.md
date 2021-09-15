# css-scss-cli [![Build Status](https://secure.travis-ci.org/johnotander/css-scss-cli.png?branch=master)](https://travis-ci.org/johnotander/css-scss-cli) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

Convert PostCSS style CSS to SCSS.

## Installation

```bash
npm i -g css-scss-cli
```

## Usage

```sh
css-scss --help

  Convert PostCSS style CSS to SCSS.

  Usage
    $ css-scss <input.css> <output.scss>

  Example
    $ css-scss --help
    $ css-scss input.css output.scss
    $ css-scss input.css > output.scss
    $ css-scss < input.css > output.scss
```

#### Input

```css
:root {
  --red: #f00;
}

.warning {
  color: var(--red):
}

@media (--breakpoint-small) {
  .sm-col-6 { width: 50% }
}

@custom-media --breakpoint-small (min-width: 40em);

.col-4 { calc( 4 / 12 * 100% ) }
```

#### Output

```scss
$red: #f00 !default;

.warning {
  color: $red;
}

$breakpoint-small: '(min-width: 40em)' !default;

@media #{$breakpoint-small} {
  .sm-col-6 { width: 50% }
}

.col-4 { ( 4 / 12 * 100% ) }
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
