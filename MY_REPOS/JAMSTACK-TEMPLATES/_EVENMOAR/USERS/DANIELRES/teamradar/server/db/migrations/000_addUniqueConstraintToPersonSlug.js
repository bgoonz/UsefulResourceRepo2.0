const neo = require('../../neo4j')

module.exports = {
  up: async () =>
    neo.query(`
      CREATE CONSTRAINT ON (person:Person) ASSERT person.slug IS UNIQUE
    `),

  down: () =>
    neo.query(`
      DROP CONSTRAINT ON (person:Person) ASSERT person.slug IS UNIQUE
    `),
}
