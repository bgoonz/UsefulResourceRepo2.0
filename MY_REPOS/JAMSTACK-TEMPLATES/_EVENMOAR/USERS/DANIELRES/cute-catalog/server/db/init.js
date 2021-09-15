const Knex = require("knex");
const { Model } = require("objection");

const knexConfig = require("../../knexfile");
const knex = Knex(knexConfig);
Model.knex(knex);

module.exports = knex;
