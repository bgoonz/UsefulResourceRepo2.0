import knex from "knex";

export default knex({
  client: "pg",
  connection: {
    database: process.env.PGDB,
    host: "db",
    password: process.env.PGPASSWORD,
    user: process.env.PGUSER,
  },
  pool: { min: 0, max: 7 },
});
