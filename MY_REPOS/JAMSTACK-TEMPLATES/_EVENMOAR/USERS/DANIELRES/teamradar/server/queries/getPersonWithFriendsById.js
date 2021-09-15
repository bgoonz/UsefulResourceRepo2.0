const neo = require('../neo4j')

module.exports = async id => {
  const { records } = await neo.query(
    `
      MATCH (p:Person) WHERE p.id = {id} 
      MATCH (friends:Person) -[:HAS_FRIEND]- (p)
      RETURN p,friends
    `,
    { id }
  )

  const person = records.map(r => r.toObject().p.properties)[0]
  const friends = records.map(r => r.toObject().friends.properties)

  return { ...person, friends }
}
