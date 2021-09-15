module.exports = {
  client: "pg",
  connection: {
    database: process.env.PGDB,
    host: process.env.PGHOST,
    password: process.env.PGPASSWORD,
    user: process.env.PGUSER,
  },
  migrations: {
    directory: __dirname + "/migrations",
    tableName: "knex_migrations",
  },
};
