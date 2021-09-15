# compdoc [![Build Status](https://secure.travis-ci.org/johnotander/compdoc.svg?branch=master)](https://travis-ci.org/johnotander/compdoc) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

> Turn html and css strings into documentation.

__Work in progress__

This library is currently under active development so things may change drastically.
Though feedback and thoughts are encouraged, please open an issue!

#### What's this?

`compdoc` seeks to make building documentation for components easier.
Currently, it accepts html, css (application level), and other metadata.
It returns only the css used by the component, cssstats, color palette (with all accessible combinations).

__TODO__

- return typescale (if applicable)
- handle different states (warning, success, info, etc)
- integrate with react components, too?
- handle the description

## Installation

```bash
npm install --save compdoc
```

## Usage

```javascript
const compdoc = require('compdoc')

const html = `
  <h1 class="purple">
    Hello, world!
  </h1>
`

const css = `
  .purple { color: purple; }
  .green { color: green; }
  .other-classes { /* ... */ }
`

const description = `
  This is an example component. This description text
  is written as markdown, and converted to html! _Neat_.
`

compdoc('Hello world component', { html, css, description })
  .then(console.log)
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
