const base = {
  client: "postgresql",
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: "knex_migrations"
  },
  connection: {
    database: process.env.PG_DB,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT
  }
};

module.exports = {
  ...base
};
