# oss-license-name-to-url

Convert shorthand OSS license names to opensource.org URLs

## Installation

Download node at [nodejs.org](http://nodejs.org) and install it, if you haven't already.

```sh
npm install oss-license-name-to-url --save
```

## Usage

```js
var url = require("oss-license-name-to-url")

url("apache 2")   // http://opensource.org/licenses/Apache-2.0
url("apache-2")   // http://opensource.org/licenses/Apache-2.0
url("bsd")        // http://opensource.org/licenses/BSD-2-Clause
url("x11")        // http://opensource.org/licenses/MIT
url("X11")        // http://opensource.org/licenses/MIT
url("WTFPLv2")    // http://www.wtfpl.net/about/

```

## Tests

```sh
npm install
npm test
```

## Dependencies

- [osi-licenses](https://github.com/meryn/osi-licenses): id-name pairs of OSI-approved licenses

## Dev Dependencies

- [standard](https://github.com/feross/standard): JavaScript Standard Style
- [tap](https://github.com/isaacs/node-tap): A Test-Anything-Protocol library


## License

MIT
