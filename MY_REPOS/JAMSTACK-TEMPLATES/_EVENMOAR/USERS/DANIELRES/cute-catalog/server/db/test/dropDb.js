const knex = require("../init");

const dbName = process.env.POSTGRES_DB + "_test";

knex
  .raw(`DROP DATABASE ${dbName};`)
  .then(() => {
    console.log(`[dropDb] db "${dbName}" dropped`);
  })
  .finally(() => knex.destroy());
