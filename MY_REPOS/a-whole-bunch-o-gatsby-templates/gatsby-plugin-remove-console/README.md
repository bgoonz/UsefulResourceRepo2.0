# gatsby-plugin-remove-console

[![NPM](https://img.shields.io/npm/v/gatsby-plugin-remove-console.svg?colorB=brightgreen)](https://www.npmjs.com/package/gatsby-plugin-remove-console) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
![npm](https://img.shields.io/npm/dw/gatsby-plugin-remove-console.svg?colorB=brightgreen)

A plugin that adds support to remove all `console.*` calls from Gatsby's production builds using `babel-plugin-transform-remove-console`.

## Example

**In**

```javascript
console.log('foo');
console.error('bar');
```

**Out**

```javascript
```

## Getting started

### Install the plugin

```sh
npm install gatsby-plugin-remove-console && npm install babel-plugin-transform-remove-console --save-dev
```

or

```sh
yarn add gatsby-plugin-remove-console && yarn add babel-plugin-transform-remove-console --dev
```

### Usage
Specify the plugin in your `gatsby-config.js`. Here's an example:

```javascript
// without options
module.exports = {
  plugins: [
    'gatsby-plugin-remove-console'
  ],
};
```

```javascript
// with options
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-remove-console',
      options: {
        exclude: ['error', 'warn'], // <- will be removed all console calls except these
      }
    }
  ]
};
```

### Options

`exclude` - An array of console methods to exclude from removal.

# License

MIT, see [LICENSE.md](https://github.com/abdullahceylan/gatsby-plugin-remove-console/blob/master/LICENSE) for details.

# Changelog

See [CHANGELOG.md](https://github.com/abdullahceylan/gatsby-plugin-remove-console/blob/master/CHANGELOG.md) for details.

