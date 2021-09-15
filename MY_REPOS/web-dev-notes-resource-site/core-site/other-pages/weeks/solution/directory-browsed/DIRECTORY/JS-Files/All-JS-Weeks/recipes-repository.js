const { Op } = require('sequelize');
let Recipe, Instruction, Ingredient, MeasurementUnit;
let moduleError;

try {
  const db = require('../models');
  ({ Recipe, Instruction, Ingredient, MeasurementUnit } = db);
  if (Recipe === undefined) {
    moduleError = 'It looks like you need to generate the Recipe model.';
  }
} catch (e) {
  console.error(e);
  if (e.message.includes('Cannot find module')) {
    moduleError = 'It looks like you need initialize your project.';
  } else {
    moduleError = `An error was raised "${e.message}". Check the console for details.`;
  }
}
/* Don't change code above this line ******************************************/



async function getTenNewestRecipes() {
  // Use the findAll method of the Recipe object to return the recipes.
  // Use the options for findAll to **limit** the number of objects and order it
  //   appropriately. (That's a hint. Look through that documentation for that
  //   method for limiting the result. There's more than one "limit" in there,
  //   so read the documentation carefully.)
  //
  // The general form of this is
  //
  // Model.findAll({
  //     { ... specify your options here... }
  // });
  //
  // Docs: https://sequelize.org/master/class/lib/model.js~Model.html#static-method-findAll
  const recipes = await Recipe.findAll({
    limit: 10
  })
  recipes.forEach(recipe => console.log(recipe));
}

async function getRecipeById(id) {
  // Use the findByPk method of the Recipe object to return the recipe. Use
  // nested eager loading to load the associated instructions, ingredients, and
  // measurement units.

  const recipe = recipe.findByPk(1, {
    include: [
      MeasurementUnit,
      {
        model: Instruction,
        include: [Ingredient]
      }
    ]
  })
  //
  // In the video, you saw this, where the presenter had to use the "include"
  // directive. The general form for calling and of the "find" methods with
  // eager loading looks like this.
  //
  // Model.findByPk(id, {
  //   include: [
  //     firstDataModel,
  //     {
  //       model: secondDataModel,
  //       include: [thirdDataModel]
  //     }
  //   ]
  // });
  //
  // Look at the data model in the instructions to see the relations between the
  // Recipe table and the Ingredients and Instructions table. Figure out which
  // of them goes into that form above as "firstDataModel" and
  // "secondDataModel". Then, determine which goes into "thirdDataModel".
  //
  // There aren't that many combinations. If it's not apparent, try them out
  // until something works. It turns out that's a very practical way that
  // software developers will do stuff: try stuff out until it works; when it
  // does work, figure out why it works.
  //
  // Don't forget that last step if you're trying to find out how it works. When
  // you do stumble on the correct answer, try to figure out how it works.
  //
  // Here are links to the wholly-inadequate docs for this.
  // Docs: https://sequelize.org/v5/manual/models-usage.html#eager-loading
  //       https://sequelize.org/v5/manual/models-usage.html#nested-eager-loading
}

async function deleteRecipe(id) {
  // Use the findByPk method of the Recipe object to get the object and, then,
  // destroy it. Or, use the Model.destroy({ ... where ... }) method that you
  // saw in the video.
  //
  // Docs: https://sequelize.org/master/class/lib/model.js~Model.html#instance-method-destroy
  const recipe = await Recipe.findByPk(id);
  await recipe.destroy();
}

async function createNewRecipe(title) {
  // Use the create method of the Recipe object to create a new object and
  // return it.
  //
  // Docs: https://sequelize.org/v5/manual/instances.html#creating-persistent-instances
  const recipe = await Recipe.create({
    title: title
  });
  return recipe;
}

async function searchRecipes(term) {
  // Use the findAll method of the Recipe object to search for recipes with the
  // given term in its title
  //
  // Docs: https://sequelize.org/v5/manual/querying.html
  const recipes = await Recipe.findAll({
    where: {
      title: {
        [Op.substring]: term
      }
    }
  })
  recipes.forEach(recipe => console.log(recipe));
}




/* Don't change code below this line ******************************************/
module.exports = {
  createNewRecipe,
  deleteRecipe,
  getRecipeById,
  getTenNewestRecipes,
  searchRecipes,
  loadingDbError: moduleError,
};
