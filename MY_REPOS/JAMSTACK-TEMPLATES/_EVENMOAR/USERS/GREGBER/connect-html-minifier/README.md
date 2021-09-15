# connect-html-minifier

# This plugin is no longer actively maintained, you can still use it but issues will not be resolved. If you want the npm name, you can contact me by email.

[![Build Status](https://travis-ci.org/neoziro/connect-html-minifier.svg?branch=master)](https://travis-ci.org/neoziro/connect-html-minifier)
[![Dependency Status](https://david-dm.org/neoziro/connect-html-minifier.svg?theme=shields.io)](https://david-dm.org/neoziro/connect-html-minifier)
[![devDependency Status](https://david-dm.org/neoziro/connect-html-minifier/dev-status.svg?theme=shields.io)](https://david-dm.org/neoziro/connect-html-minifier#info=devDependencies)

HTML minifier middleware for connect.

## Install

````
npm install connect-html-minifier
````

## Usage

````javascript
var connect = require('connect'),
    htmlMinifier = require('connect-html-minifier');

connect()
.use(htmlMinifier({removeComments: true})
.listen(8080);
````

### Options

Options allowed are the same as options allowed in [kangax/html-minifier](https://github.com/kangax/html-minifier/).

## License

MIT
