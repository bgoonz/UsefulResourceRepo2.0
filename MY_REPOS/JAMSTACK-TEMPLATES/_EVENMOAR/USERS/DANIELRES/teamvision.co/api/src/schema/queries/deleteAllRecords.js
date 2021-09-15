const driver = require("../../neo4jDriver");

module.exports = async () => {
  const session = driver.session();
  await session.run(`MATCH (n) DETACH DELETE n`);
  session.close();
};
