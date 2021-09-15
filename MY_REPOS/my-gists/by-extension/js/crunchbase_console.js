/*
  Paste this into the console on
  crunchbase.com to remove the
  extra overlay upsell stuff.

  Example page:

  https://www.crunchbase.com/search/funding_rounds/field/organizations/last_funding_type/invisionapp
*/

(function () {
  const { forEach } = Array.prototype

  const $ = str => {
    return document.querySelectorAll('.' + str)
  }

  const cx = {
    blur: 'blurred-row',
    upsell: 'new-upsell-wrapper'
  }

  const rows = $(cx.blur)
  const upsell = $(cx.upsell)

  if (upsell.length) {
    upsell[0].remove()
  }

  forEach.call(rows, item => {
    item.classList.remove(cx.blur)
  })
})()
