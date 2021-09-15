const fetch = require("node-fetch").default
export default async function handler(req, res) {
  const countryCode = req.query.country_code
  console.log("this is the cc", countryCode)

  const shippingZones = await fetch(
    "https://gatsby-dev-500-products.myshopify.com/admin/api/2021-04/shipping_zones.json",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": process.env.SHOPIFY_SHOP_PASSWORD,
      },
    }
  )
  const data = await shippingZones.json()

  // console.log(data.shipping_zones)
  let shippingZone = findShippingZone(data, countryCode)
  if (shippingZone) {
    res.send(shippingZone.price_based_shipping_rates[0].price)
  } else {
    shippingZone = findShippingZone(data, `*`)
    res.send(shippingZone.carrier_shipping_rate_providers[0].flat_modifier)
  }

  res.send(shippingZone)
  console.log(shippingZone)
}

function findShippingZone(data, countryCode) {
  return data.shipping_zones.find((shippingZone) => {
    return shippingZone.countries.some((country) => {
      return country.code === countryCode
    })
  })
}
