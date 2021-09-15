const fetch = require('isomorphic-fetch')
const isPresent = require('is-present')
const isBlank = require('is-blank')

const tickersMap = require('./tickers-map.json')
const baseUrl = 'https://api.coinmarketcap.com/v1/ticker/'

module.exports = currency => {
  return new Promise((resolve, reject) => {
    let currencyId = null
    let url = null

    if (isPresent(currency)) {
      currencyId = tickersMap[currency.toLowerCase()] || currency

      url = `${baseUrl}${currencyId}`
    } else {
      url = baseUrl
    }

    fetch(url)
      .then(d => {
        d.json().then(d => {
          const response = isPresent(currency) ? d[0] : d
          isPresent(response) ? resolve(response) : reject(response)
        })
      })
      .catch(() => reject('Failed to fetch currency data'))
  })
}
