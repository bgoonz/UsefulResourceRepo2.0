const uuid = require('uuid4')

const neo = require('../neo4j')

module.exports = async ({ name }) => {
  const response = await neo.query(
    `
      CREATE (tag:Tag { id: $id, name: $name } ) 
      RETURN tag
    `,
    {
      id: uuid(),
      name,
    }
  )
  return response.records[0].toObject().tag.properties
}
