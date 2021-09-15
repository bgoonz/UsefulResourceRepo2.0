const neo = require('../neo4j')

module.exports = async ({ limit = 25 } = {}) => {
  const { records } = await neo.query(
    `
     MATCH (p:Person) RETURN p LIMIT {limit}
    `,
    { limit }
  )

  return records.map(r => r.toObject().p).map(({ properties }) => properties)
}
