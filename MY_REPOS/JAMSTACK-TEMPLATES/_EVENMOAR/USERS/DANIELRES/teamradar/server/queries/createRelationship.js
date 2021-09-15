const neo = require('../neo4j')

module.exports = async ({ fromId, toId, type }) => {
  const response = await neo.query(
    `
      MATCH (from { id: $from }), (to { id: $to })
      CREATE (from) -[type:${type}]-> (to)
      RETURN from,to,type
    `,
    {
      from: fromId,
      to: toId,
      type,
    }
  )

  const respObject = response.records[0].toObject()

  return {
    from: respObject.from.properties,
    to: respObject.to.properties,
    type: respObject.type.type,
  }
}
