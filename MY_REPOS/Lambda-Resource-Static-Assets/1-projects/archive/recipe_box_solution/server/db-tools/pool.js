const { Pool } = require("pg");

const pool = new Pool({
  database: "recipe_box",
  user: "recipe_box_app",
  password: "SPuaQ3no",
});

module.exports = pool;
