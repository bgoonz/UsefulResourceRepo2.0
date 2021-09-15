# format-keys
[![Build Status](https://travis-ci.org/neoziro/format-keys.svg?branch=master)](https://travis-ci.org/neoziro/format-keys)
[![Dependency Status](https://david-dm.org/neoziro/format-keys.svg?theme=shields.io)](https://david-dm.org/neoziro/format-keys)
[![devDependency Status](https://david-dm.org/neoziro/format-keys/dev-status.svg?theme=shields.io)](https://david-dm.org/neoziro/format-keys#info=devDependencies)

Format object keys recursively.

## Install

```sh
npm install format-keys
```

## Usage

```js
var formatKeys = require('format-keys');

var object = { foo: 'bar', deep: { kung: 'foo' } };
var formattedObject = formatKeys(object, function upperCaseFormatter(str) {
  return str.toUpperCase();
});

console.log(formattedObject); // { FOO: 'bar', DEEP: { KUNG: 'foo' } }
```

## License

MIT