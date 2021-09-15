const execCypher = require("./execCypher");

const env = process.env.NODE_ENV;

module.exports = () => {
  if (!["development", "test", "staging"].includes(env))
    throw new Error("[purgeDb] not allowed in this environment");

  return execCypher(`MATCH (n) DETACH DELETE n`);
};
