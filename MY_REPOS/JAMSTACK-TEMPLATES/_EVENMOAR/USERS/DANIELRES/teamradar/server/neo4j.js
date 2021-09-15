const neo4j = require('neo4j-driver').v1

const { NEO4J_PASSWORD, NEO4J_URI, NEO4J_USER } = process.env

const driver = neo4j.driver(
  NEO4J_URI,
  neo4j.auth.basic(NEO4J_USER, NEO4J_PASSWORD)
)

const close = ({ silent } = {}) => {
  !silent && console.log('[neo4j] Closing Neo4j connection...')
  driver.close()
}

const query = async (...args) => {
  const session = driver.session()
  const result = await session.run(...args)
  session.close()
  return result
}

module.exports = { driver, close, query }
