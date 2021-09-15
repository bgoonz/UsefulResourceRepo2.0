const bodyParser = require('body-parser');
const express = require('express');
const moment = require('moment');
const pool = require('../db-tools/pool');
const router = express.Router();
const { getSqlFile } = require('../db-tools/sql-paths');

router.use(bodyParser.urlencoded({ extended: false }));

function handleError(e, data, property, fileName) {
  console.error(e);
  if (e.message.includes('bind message supplies 1 parameters')) {
    data[property] = `It looks like you forgot a parameter $1 in your query in ${fileName}. Check the console for errors.`;
  } else {
    data[property] = `An error occurred while running the SQL in ${fileName} that reads "${e.message}". Check the console for errors.`
  }
}

async function getRecipeData(id, data) {
  const recipeSqlFileName = '02a-get-recipe-by-id.sql';
  const recipeSql = await getSqlFile(recipeSqlFileName);
  let rows = [];

  if (recipeSql.length === 0) {
    data.recipeError = `No SQL in ${recipeSqlFileName}`;
  } else {
    try {
      ({ rows } = await pool.query(recipeSql, [id]));
    } catch (e) {
      handleError(e, data, 'recipeError', recipeSqlFileName);
    }
  }
  if (rows.length && !data.recipeError) {
    const row = rows[0];
    if (row.id === undefined || row.title === undefined || row.updated === undefined || row.created === undefined) {
      data.recipeError = `The SQL in ${recipeSqlFileName} must return the columns id, title, created, and updated`;
    } else {
      data.recipe = {
        id: row.id,
        title: row.title,
        created: moment(row.created).format('MMMM Do YYYY'),
        updated: moment(row.updated).format('MMMM Do YYYY'),
      }
    }
  }
}

async function getIngredientsData(id, data) {
  const ingredientsSqlFileName = '02b-get-ingredients-by-recipe-id.sql';
  const ingredientsSql = await getSqlFile(ingredientsSqlFileName);
  let rows = [];
  data.ingredients = [];

  if (ingredientsSql.length === 0) {
    data.ingredientsError = `No SQL in ${ingredientsSqlFileName}`;
  } else {
    try {
      ({ rows } = await pool.query(ingredientsSql, [id]));
    } catch (e) {
      handleError(e, data, 'ingredientsError', ingredientsSqlFileName);
    }
  }
  if (rows.length && !data.ingredientsError) {
    const row = rows[0];
    if (row.amount === undefined || row.food_stuff === undefined || row.name === undefined) {
      data.ingredientsError = `The SQL in ${ingredientsSqlFileName} must return the columns amount, food_stuff, and name`;
    } else {
      data.ingredients = rows.map(row => {
        row.amount = Number.parseFloat(row.amount);
        return row;
      });
    }
  }
}

async function getInstructionsData(id, data) {
  const instructionsSqlFileName = '02c-get-instructions-by-recipe-id.sql';
  const instructionsSql = await getSqlFile(instructionsSqlFileName);
  let rows = [];
  data.instructions = [];

  if (instructionsSql.length === 0) {
    data.instructionsError = `No SQL in ${instructionsSqlFileName}`;
  } else {
    try {
      ({ rows } = await pool.query(instructionsSql, [id]));
    } catch (e) {
      handleError(e, data, 'instructionsError', instructionsSqlFileName);
    }
  }
  if (rows.length && !data.instructionsError) {
    const row = rows[0];
    if (row.list_order === undefined || row.specification === undefined) {
      data.instructionsError = `The SQL in ${instructionsSqlFileName} must return the columns list_order and specification`;
    } else {
      if (rows.some((element, index) => rows[index + 1] && element.list_order > rows[index + 1].list_order)) {
        data.instructionsError = `The SQL in ${instructionsSqlFileName} returned the instructions out of order`;
      } else {
        data.instructions = rows;
      }
    }
  }
}

async function getUnitsOfMeasureData(data) {
  const unitsOfMeasureSqlFileName = '03b-get-units-of-measure.sql';
  const unitsOfMeasureSql = await getSqlFile(unitsOfMeasureSqlFileName);
  let rows = [];

  if (unitsOfMeasureSql.length === 0) {
    data.unitsOfMeasureError = `No SQL in ${unitsOfMeasureSqlFileName}`;
  } else {
    try {
      ({ rows } = await pool.query(unitsOfMeasureSql));
    } catch (e) {
      handleError(e, data, 'unitsOfMeasureError', unitsOfMeasureSqlFileName);
    }
  }
  if (rows.length && !data.unitsOfMeasureError) {
    const row = rows[0];
    if (row.id === undefined || row.name === undefined) {
      data.unitsOfMeasureError = `The SQL in ${unitsOfMeasureSqlFileName} must return the columns id and name`;
    } else {
      if (rows.some((element, index) => rows[index + 1] && element.list_order > rows[index + 1].list_order)) {
        data.unitsOfMeasureError = `The SQL in ${unitsOfMeasureSqlFileName} returned the units of measure out of order`;
      } else {
        data.unitsOfMeasure = rows;
      }
    }
  }
}

router.post('/', async (req, res) => {
  const newRecipeSqlFileName = '03a-insert-new-recipe.sql';
  const data = {};
  let rows = [];
  let id = 0;

  const newRecipeSql = await getSqlFile(newRecipeSqlFileName);
  if (newRecipeSql.length === 0) {
    data.newRecipeError = `No SQL in ${newRecipeSqlFileName}`;
  } else {
    try {
      ({ rows } = await pool.query(newRecipeSql, [req.body.title]));
      id = rows[0].id;
    } catch (e) {
      handleError(e, data, 'newRecipeError', newRecipeSqlFileName);
    }
  }

  if (data.newRecipeError) {
    data.title = req.body.title;
    res.render('recipe-starter.pug', data);
  } else {
    res.redirect(`/recipes/${id}/edit`);
  }
});

router.get('/', async (req, res) => {
  const sqlFileName = '07-search-recipes.sql';
  const { term } = req.query;

  let recipes;
  try {
    const sql = await getSqlFile(sqlFileName);
    if (sql.length === 0) {
      recipes = { error: `No SQL in ${sqlFileName}`};
    } else {
      ({ rows } = await pool.query(sql, [ `%${term}%` ]));
      if (rows.length) {
        const row = rows[0];
        if (row.id === undefined || row.title === undefined || row.updated === undefined) {
          recipes = {
            error: `The SQL in ${sqlFileName} must return the columns id, title, and updated`
          };
        }
      }
      if (recipes === undefined) {
        recipes = {recipes: rows.map(x => {
          x.updated = moment(x.updated).fromNow();
          return x;
        })};
      }
    }
  } catch (e) {
    console.error(e);
    recipes = {
      error: `An error occurred while running the SQL in ${sqlFileName} that reads "${e.message}". Check the console for errors.`
    };
  }
  recipes.listTitle = 'Search Results';
  res.render('home.pug', recipes);
});

router.get('/new', async (req, res) => {
  const data = { title: '' };
  res.render('recipe-starter.pug', data);
});

router.post('/:id/delete', async (req, res) => {
  const deleteRecipeFileName = '06-delete-recipe.sql';
  const id = req.params.id;
  const data = {};

  const deleteRecipeSql = await getSqlFile(deleteRecipeFileName);
  if (deleteRecipeSql.length === 0) {
    data.deletionError = `No SQL in ${deleteRecipeFileName}`;
  } else {
    const client = await pool.connect();
    const statements = deleteRecipeSql.split(';');

    try {
      await client.query('BEGIN');
      for (let statement of statements) {
        await client.query(statement, [ id ]);
      }
      await client.query('COMMIT');
    } catch (e) {
      await client.query('ROLLBACK');
      handleError(e, data, 'deletionError', deleteRecipeFileName);
    } finally {
      client.release();
    }
}

  if (data.deletionError) {
    res.redirect(`/recipes/${id}/edit?deletionError=${data.deletionError}`);
  } else {
    res.redirect(`/`);
  }
});

router.get('/:id/edit', async (req, res) => {
  const data = {
    recipeId: req.params.id,
    ingredientInsertError: req.query.ingredientInsertError,
    instructionInsertError: req.query.instructionInsertError,
    deletionError: req.query.deletionError,
  };

  await getRecipeData(req.params.id, data);
  await getIngredientsData(req.params.id, data);
  await getInstructionsData(req.params.id, data);
  await getUnitsOfMeasureData(data);

  res.render('recipe-editor.pug', data);
});

router.get('/:id', async (req, res) => {
  const data = { recipeId: req.params.id };

  await getRecipeData(req.params.id, data);
  await getIngredientsData(req.params.id, data);
  await getInstructionsData(req.params.id, data);

  res.render('recipe-detail.pug', data);
});

module.exports = router;
