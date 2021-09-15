const driver = require("../neo4jDriver");

const pingDb = async () => {
  const session = driver.session();
  await session.run(`MATCH (pingDb:Tag) RETURN pingDb LIMIT 1`);
  await session.close();
  await driver.close();
};

pingDb();
