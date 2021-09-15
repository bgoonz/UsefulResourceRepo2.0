# ¤ coinr-cli [![Build Status](https://secure.travis-ci.org/johnotander/coinr-cli.svg?branch=master)](https://travis-ci.org/johnotander/coinr-cli) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

Get the current ticker value for cryptocurrencies

![coinr](https://rawgit.com/johnotander/coinr-cli/master/screenshot.gif)

## Installation

```bash
npm i -g coinr-cli
```

## Usage

```sh
❯ coinr -h

  Get the current ticker value for cryptocurrencies

  Usage

      $ coinr [currency]

  Options

      -h, --help - Get help menu
      -v, --version - Get the version

  Examples

      $ coinr
      $ coinr bitcoin
      $ coinr ethereum
```

```sh
❯ coinr ethereum

Ethereum(ETH)

  $10.1098
  Changes: 0%1h -4%24h -19%7d
```

## Related

- [`coinr`](https://github.com/johnotander/coinr)
- [`shtml`](https://github.com/johnotander/shtml)
- [`to-percentage`](https://github.com/johnotander/to-percentage)

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
