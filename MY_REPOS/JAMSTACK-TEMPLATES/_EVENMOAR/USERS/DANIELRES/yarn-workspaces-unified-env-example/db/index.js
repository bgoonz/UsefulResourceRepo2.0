const Knex = require("knex");

const knexConfig =
  process.env.NODE_ENV === "development"
    ? require("./knexfile.development")
    : process.env.NODE_ENV === "test"
    ? require("./knexfile.test")
    : require("./knexfile.production");

const knex = new Knex(knexConfig);

module.exports = { knex };
