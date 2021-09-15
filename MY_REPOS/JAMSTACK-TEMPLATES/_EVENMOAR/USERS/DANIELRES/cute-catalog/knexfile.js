if (!process.env.NODE_ENV) process.env.NODE_ENV = "development";
require("./server/helpers/env/init");

module.exports = {
  client: "postgresql",
  debug: process.env.NODE_ENV.startsWith("dev"),
  connection: process.env.DATABASE_URL
    ? process.env.DATABASE_URL
    : {
        database: process.env.POSTGRES_DB,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
      },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    directory: "server/db/migrations",
    tableName: "knex_migrations",
  },
  seeds: {
    directory: "server/db/seeds",
  },
};
