# smime
[![Build Status](https://travis-ci.org/hipush/smime.svg?branch=master)](https://travis-ci.org/hipush/smime)
[![Dependency Status](https://david-dm.org/hipush/smime.svg?theme=shields.io)](https://david-dm.org/hipush/smime)
[![devDependency Status](https://david-dm.org/hipush/smime/dev-status.svg?theme=shields.io)](https://david-dm.org/hipush/smime#info=devDependencies)

Node / io.js wrapper for OpenSSL S/MIME command.

## Install

```
npm install smime
```

## Usage

```js
var smime = require('smime');

smime.sign({
  content: fs.createReadStream('/path/to/file/to/sign'),
  key: '/path/to/key.pem',
  cert: '/path/to/cert.pem'
}).then(function (res) {
  console.log(res); // {der, child}
});
```

## smime.sign(options, [cb])

Sign a content using smime.

**Options:**

```
@param {object} options Options
@param {stream.Readable} options.content Content stream
@param {string} options.key Key path
@param {string} options.cert Cert path
@param {string} [options.password] Key password
@param {function} [cb] Optional callback
```

**Result:**

```
@returns {object} result Result
@returns {Buffer} result.der Der signature
@returns {ChildProcess} result.child Child process
```

## License

MIT
