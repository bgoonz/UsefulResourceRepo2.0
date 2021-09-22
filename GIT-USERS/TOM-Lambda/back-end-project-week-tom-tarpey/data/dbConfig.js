const dbEngine = process.env.DB || "development";
const knexConfig = require("../knexfile.js")[dbEngine];
const knex = require("knex");

module.exports = knex(knexConfig);
