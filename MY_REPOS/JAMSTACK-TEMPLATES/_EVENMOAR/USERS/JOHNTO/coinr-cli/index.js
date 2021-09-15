#!/usr/bin/env node

const meow = require('meow')
const shtml = require('shtml')
const coinr = require('coinr')
const isPresent = require('is-present')
const toPercentage = require('to-percentage')

const cli = meow(shtml`
  <div>
    <underline>Usage</underline>

    $ coinr [currency [, currency...]]<br><br>

    <underline>Options</underline>

    -h, --help - Get help menu
    -l, --limit - Limit list of currencies
    -v, --version - Get the version<br><br>

    <underline>Examples</underline>

    $ coinr
    $ coinr -l 5
    $ coinr bitcoin
    $ coinr eth
    $ coinr ethereum
    $ coinr btc eth
    $ coinr bitcoin ethereum
  </div>
`, {
  alias: {
    v: 'version',
    h: 'help',
    l: 'limit'
  }
})

if (cli.input[0]) {
  cli.input.forEach(curr => {
    coinr(curr)
      .then(d => {
        console.log('')
        console.log(renderCurrency(d))
      })
  })
} else {
  coinr()
    .then(d => {
      console.log('')
      if (cli.flags.limit) {
        d = d.slice(0, cli.flags.limit)
      }

      console.log(shtml`
        ${d.map(renderCurrency).join(shtml`<p>---------</p>`)}
      `)
    })
}

const renderCurrency = currency => {
  const {
    name, symbol, price_usd, percent_change_1h, percent_change_24h, percent_change_7d
  } = currency
  
  return shtml`
<div>
  <gray><underline>${name}</underline>(${symbol})</gray><br>
  \$${price_usd.toString()}
  Changes: ${redOrGreen(percent_change_1h)}1h ${redOrGreen(percent_change_24h)}24h ${redOrGreen(percent_change_7d)}7d
</div>
  `
}

const redOrGreen = val => (
  val < 0 ?
    shtml`<red>${toPercentage(val/100)}</red>` :
    shtml`<green>${toPercentage(val/100)}</green>`
  )
