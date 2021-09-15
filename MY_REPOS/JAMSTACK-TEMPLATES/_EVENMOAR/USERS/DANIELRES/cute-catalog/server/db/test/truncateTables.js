const knex = require("../init");

if (process.env.NODE_ENV !== "test")
  throw Error("[truncateTables] should be used for tests only");

module.exports = () =>
  knex
    .raw(`SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname='public'`)
    .then(({ rows }) =>
      rows
        .map((r) => r.tablename)
        .filter((r) => !r.startsWith("knex"))
        .map((t) => `"${t}"`)
        .join(",")
    )
    .then((tablesList) => knex.raw(`TRUNCATE TABLE ${tablesList} CASCADE`));
// .finally(() => knex.destroy())
