// require('dotenv').config()

module.exports = {
  client: "pg",
  connection: {
    host: "db",
    database: process.env.PGDB,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    directory: __dirname + "/server/db/migrations",
    tableName: "knex_migrations",
  },
};
