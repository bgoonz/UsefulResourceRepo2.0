const execCypher = require("../../src/helpers/neo4j/execCypher");

module.exports = {
  up: () =>
    execCypher("CREATE CONSTRAINT ON (tag:Tag) ASSERT tag.name IS UNIQUE"),

  down: () =>
    execCypher("DROP CONSTRAINT ON (tag:Tag) ASSERT tag.name IS UNIQUE")
};
