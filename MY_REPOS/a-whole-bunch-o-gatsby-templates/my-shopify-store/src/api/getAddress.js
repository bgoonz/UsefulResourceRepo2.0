const fetch = require("node-fetch").default

export default async function handler(req, res) {
  try {
    const lat = req.query.lat
    const lng = req.query.lng

    const result = await fetch(
      `https://api.codezap.io/v1/reverse?lat=${lat}&lng=${lng}`,
      {
        headers: {
          "api-key": process.env.CODEZAP_API_KEY,
        },
      }
    )

    const jsonResult = await result.json()

    res.status(200).json({
      "request-lng": lat,
      "request-lat": lng,
      result: jsonResult,
    })
  } catch (err) {
    res.status(500).json({ error_description: err.message })
  }
}
