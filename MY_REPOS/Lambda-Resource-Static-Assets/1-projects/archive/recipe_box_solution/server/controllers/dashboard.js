const express = require("express");
const moment = require("moment");
const pool = require("../db-tools/pool");
const router = express.Router();
const { getSqlFile } = require("../db-tools/sql-paths");

router.get("/", async (req, res) => {
  const sqlFileName = "01-get-ten-most-recent-recipes.sql";
  let recipes;
  try {
    const sql = await getSqlFile(sqlFileName);
    if (sql.length === 0) {
      recipes = { error: `No SQL in ${sqlFileName}` };
    } else {
      ({ rows } = await pool.query(sql));
      if (rows.length) {
        const row = rows[0];
        if (
          row.id === undefined ||
          row.title === undefined ||
          row.updated === undefined
        ) {
          recipes = {
            error: `The SQL in ${sqlFileName} must return the columns id, title, and updated`,
          };
        }
      }
      if (recipes === undefined) {
        recipes = {
          recipes: rows.map((x) => {
            x.updated = moment(x.updated).fromNow();
            return x;
          }),
        };
        if (rows.length > 10) {
          recipes = {
            error: `SQL in ${sqlFileName} returned more than 10 records.`,
          };
        }
      }
    }
  } catch (e) {
    console.error(e);
    recipes = {
      error: `An error occurred while running the SQL in ${sqlFileName} that reads "${e.message}". Check the console for errors.`,
    };
  }

  recipes.listTitle = "Latest Recipes";
  res.render("home.pug", recipes);
});

module.exports = router;
