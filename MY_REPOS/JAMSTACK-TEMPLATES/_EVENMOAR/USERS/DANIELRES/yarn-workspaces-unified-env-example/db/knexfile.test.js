const devConfig = require("./knexfile.development");

module.exports = {
  ...devConfig,
  connection: {
    ...devConfig.connection,
    database: process.env.PG_DB_TEST,
    port: process.env.PG_PORT_TEST
  }
};
