const uuid = require('uuid4')

const neo = require('../neo4j')

module.exports = async ({ name, slug }) => {
  const response = await neo.query(
    `
      CREATE (person:Person { id: $id, name: $name, slug: $slug } ) 
      RETURN person
    `,
    {
      id: uuid(),
      name,
      slug,
    }
  )

  return response.records[0].toObject().person.properties
}
