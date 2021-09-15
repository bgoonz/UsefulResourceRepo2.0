# image-size-parser
[![Build Status](https://travis-ci.org/hipush/image-size-parser.svg?branch=master)](https://travis-ci.org/hipush/image-size-parser)
[![Dependency Status](https://david-dm.org/hipush/image-size-parser.svg?theme=shields.io)](https://david-dm.org/hipush/image-size-parser)
[![devDependency Status](https://david-dm.org/hipush/image-size-parser/dev-status.svg?theme=shields.io)](https://david-dm.org/hipush/image-size-parser#info=devDependencies)

Parse the size of an image from a string. '120x20@2x' → {width: 240, height: 40}

## Install

```
npm install image-size-parser
```

## Usage

```js
var parseImageSize = require('image-size-parser').parse;

parseImageSize('10x10'); // {width: 10, height: 10}
parseImageSize('120x20@2x'); // {width: 240, height: 40}
parseImageSize('10x20@5x'); // {width: 50, height: 100}
```

## License

MIT
