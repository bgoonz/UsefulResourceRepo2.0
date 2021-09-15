const assert = require('assert')
const choo = require('choo')
const Humanize = require('humanize-plus')

module.exports = function (params, state, send) {
  const currencies = state.currencies.data

  assert.equal(typeof currencies, 'object', 'currencies should be an array')

  return choo.view`
    <section id="app-root">
      <link rel="stylesheet" href="https://npmcdn.com/minitachyons@0.1.10/css/minitachyons.css">
      ${currencies.map(currency => {
        return choo.view`
          <div class="cf pa4 bb blg">
            <div class="fl-ns w-50-ns">
              <h1 class="mt0 mb0">
                <a href="currency/${currency.symbol}" class="link">
                  ${currency.name}
                </a>
                <small class="silver normal">${currency.symbol}</small>
              </h1>
              <h2 class="mt0 normal">
                \$${currency.price_usd.toFixed(2)}
              </h2>

              <div class="ba blg br2 cf center">
                <div class="fl-ns w-50-ns br-ns blg">
                  <div class="pa4">
                    <h4 class="mt0 mb0">
                      \$${Humanize.compactInteger(currency['24h_volume_usd'])}
                    </h4>
                    <span class="f6 light-silver tracked ttu mt0">
                      24hr volume
                    </span>
                  </div>
                </div>
                <div class="fl-ns w-50-ns">
                  <div class="pa4">
                    <h4 class="mt0 mb0">
                      \$${Humanize.compactInteger(currency['market_cap_usd'])}
                    </h4>
                    <span class="f6 light-silver tracked ttu mt0">
                      Market Cap
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `
      })}
    </section>
  `
}
