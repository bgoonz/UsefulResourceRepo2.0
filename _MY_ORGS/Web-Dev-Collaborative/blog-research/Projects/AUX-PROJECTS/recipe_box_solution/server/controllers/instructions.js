const bodyParser = require('body-parser');
const express = require('express');
const pool = require('../db-tools/pool');
const router = express.Router();
const { getSqlFile } = require('../db-tools/sql-paths');

router.use(bodyParser.urlencoded({ extended: false }));

function handleError(e, data, property, fileName) {
  console.error(e);
  data[property] = `An error occurred while running the SQL in ${fileName} that reads "${e.message}". Check the console for errors.`
}

router.post('/', async (req, res) => {
  const newInstructionSqlFileName = '05-insert-new-instruction.sql';
  const { recipe_id, specification } = req.body;
  const data = {};

  const newInstructionSql = await getSqlFile(newInstructionSqlFileName);
  if (newInstructionSql.length === 0) {
    data.newInstructionError = `No SQL in ${newInstructionSqlFileName}`;
  } else {
    try {
      const parameters = [specification, recipe_id];
      await pool.query(newInstructionSql, parameters);
    } catch (e) {
      handleError(e, data, 'newInstructionError', newInstructionSqlFileName);
    }
  }

  if (data.newInstructionError) {
    res.redirect(`/recipes/${recipe_id}/edit?instructionInsertError=${data.newInstructionError}`);
  } else {
    res.redirect(`/recipes/${recipe_id}/edit`);
  }
});

module.exports = router;
