const bodyParser = require("body-parser");
const express = require("express");
const pool = require("../db-tools/pool");
const router = express.Router();
const { getSqlFile } = require("../db-tools/sql-paths");

router.use(bodyParser.urlencoded({ extended: false }));

function handleError(e, data, property, fileName) {
  console.error(e);
  data[
    property
  ] = `An error occurred while running the SQL in ${fileName} that reads "${e.message}". Check the console for errors.`;
}

router.post("/", async (req, res) => {
  const newIngredientSqlFileName = "04-insert-new-ingredient.sql";
  const { recipe_id, amount, unit_of_measure_id, food_stuff } = req.body;
  const data = {};

  const newIngredientSql = await getSqlFile(newIngredientSqlFileName);
  if (newIngredientSql.length === 0) {
    data.newIngredientError = `No SQL in ${newIngredientSqlFileName}`;
  } else {
    try {
      const parameters = [amount, unit_of_measure_id, food_stuff, recipe_id];
      await pool.query(newIngredientSql, parameters);
    } catch (e) {
      handleError(e, data, "newIngredientError", newIngredientSqlFileName);
    }
  }

  if (data.newIngredientError) {
    res.redirect(
      `/recipes/${recipe_id}/edit?ingredientInsertError=${data.newIngredientError}`
    );
  } else {
    res.redirect(`/recipes/${recipe_id}/edit`);
  }
});

module.exports = router;
