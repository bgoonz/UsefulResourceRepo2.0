const execCypher = require("../../src/helpers/neo4j/execCypher");

module.exports = {
  up: () =>
    execCypher("CREATE CONSTRAINT ON (user:User) ASSERT user.email IS UNIQUE"),
  down: () =>
    execCypher("DROP CONSTRAINT ON (user:User) ASSERT user.email IS UNIQUE")
};
