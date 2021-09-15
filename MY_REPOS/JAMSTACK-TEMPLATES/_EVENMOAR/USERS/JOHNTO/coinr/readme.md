# ¤ coinr [![Build Status](https://secure.travis-ci.org/johnotander/coinr.svg?branch=master)](https://travis-ci.org/johnotander/coinr) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

Get latest ticker information for popular cryptocurrencies from [coinmarketcap.com](http://coinmarketcap.com/). Quotes update [every 5 minutes](http://coinmarketcap.com/api/).

## Installation

```bash
npm install --save coinr
```

## Usage

```javascript
const coinr = require('coinr')

// Pass the full name
coinr('ethereum').then(d => console.log(d))
coinr('Ethereum').then(d => console.log(d))

// Or the ticker symbol
coinr('eth').then(d => console.log(d))
coinr('ETH').then(d => console.log(d))
```

You can also retrieve the cryptocurrency ticker map

```javascript
const tickers = require('coinr/tickers-map.json')

tickers.eth // 'ethereum'
tickers.btc // 'bitcoin'
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
