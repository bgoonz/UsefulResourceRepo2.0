# handlebars-md5 [![Build Status](https://travis-ci.org/neoziro/handlebars-md5.png?branch=master)](https://travis-ci.org/neoziro/handlebars-md5)

Handlebars MD5 helper.

## Install

```
npm install handlebars-md5
```

## How to use ?

```javascript
var hbsMd5 = require('handlebars-md5');
Handlebars.registerHelper('md5', hbsMd5);

var template = Handlebars.compile('<script src="/assets/js/require-{{md5 "public/assets/js/require.js"}}.js"></script>');
template.render(); // <script src="/assets/js/require-498527f993c7f7052a542191159a6781.js"></script>
```

## License

MIT