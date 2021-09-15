const execCypher = require("../../src/helpers/neo4j/execCypher");

module.exports = {
  up: () =>
    execCypher(`
      CREATE (user:User {id: 'u1', name: 'Alice' })
      CREATE (user2:User {id: 'u2', name: 'Bob' })
      CREATE (tag:Tag {id: 't1', name: 'Redux' })
      CREATE (tag)-[user_tagging_relation:USER_TAGGING {text:'Alice is a Redux expert.'}]->(user)
      CREATE (tag)-[user_tagging_relation2:USER_TAGGING {text:'Bob is a Redux beginner.'}]->(user2)
  `)
};
