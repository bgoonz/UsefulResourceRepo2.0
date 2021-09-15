const knex = require("../init");

const dbName = process.env.POSTGRES_DB + "_test";

knex
  .raw(`CREATE DATABASE ${dbName};`)
  .then(() => {
    console.log(`[createDb] db "${dbName}" created`);
  })
  .finally(() => knex.destroy());
