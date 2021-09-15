const fetch = require("node-fetch").default

export default async function handler(req, res) {
  try {
    const to_country_code = req.query.country_code
    const to_postal_code = req.query.postal_code

    var body = JSON.stringify({
      carrier_ids: ["se-617207"],
      from_country_code: "US",
      from_postal_code: "78756",
      to_country_code: to_country_code,
      to_postal_code: to_postal_code,
      weight: { value: 1, unit: "ounce" },
    })

    const result = await fetch(`https://api.shipengine.com/v1/rates/estimate`, {
      headers: {
        Host: "api.shipengine.com",
        "API-Key": "TEST_1lVC/EddV+1kegoH9kDyKaUi6Lqt1KDXjq1VUwUaDvQ",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: body,
    })

    const jsonResult = await result.json()

    res.status(200).json({
      result: jsonResult,
    })
  } catch (err) {
    res.status(500).json({ error_description: err.message })
  }
}
