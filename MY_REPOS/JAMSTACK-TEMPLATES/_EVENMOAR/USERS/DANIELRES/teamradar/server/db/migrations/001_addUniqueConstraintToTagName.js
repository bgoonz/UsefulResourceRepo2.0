const neo = require('../../neo4j')

module.exports = {
  up: async () =>
    neo.query(`
      CREATE CONSTRAINT ON (tag:Tag) ASSERT tag.name IS UNIQUE
    `),

  down: () =>
    neo.query(`
      DROP CONSTRAINT ON (tag:Tag) ASSERT tag.name IS UNIQUE
    `),
}
