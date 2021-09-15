const neo4j = require("neo4j-driver").v1;

const { NEO4J_URI, NEO4J_USER, NEO4J_PASSWORD } = process.env;
const neo4jDriver = neo4j.driver(
  NEO4J_URI,
  neo4j.auth.basic(NEO4J_USER, NEO4J_PASSWORD)
);

module.exports = neo4jDriver;
