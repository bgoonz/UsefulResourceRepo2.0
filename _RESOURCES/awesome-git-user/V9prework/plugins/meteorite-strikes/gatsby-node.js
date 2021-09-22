const axios = require("axios")
const crypto = require("crypto")

const API_URI = "https://data.nasa.gov/resource/gh4g-9sfh.json?$limit=45000"

exports.sourceNodes = async ({ actions }) => {
  const { createNode } = actions
  const result = await axios.get(API_URI)
  result.data.forEach((datum) => {
    createNode({
      children: [],
      id: datum.id,
      fall: datum.fall,
      latitude: datum.reclat,
      longitude: datum.reclong,
      mass: datum.mass,
      name: datum.name,
      nametype: datum.nametype,
      recclass: datum.recclass,
      year: datum.year,
      parent: null,
      internal: {
        type: "Strike",
        contentDigest: crypto
          .createHash(`md5`)
          .update(JSON.stringify(datum))
          .digest(`hex`),
      },
    })
  })
}
