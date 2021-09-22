-- This query needs to delete a recipe. It will first have to delete all of the
-- data that depends on the recipe, too. Refer to the CREATE TABLE statements
-- that you wrote for all tables that have a foreign key to the recipes table.
-- Then, delete the rows in those tables first based on the recipe id column.
--
-- That means you'll need to write more than one delete statement in this file.
-- DON'T FORGET YOUR SEMICOLONS AFTER EACH STATEMENT!
--
-- The positional parameter $1 will contain the id of the recipe.
--
-- The general form for deleting data is
--
-- DELETE FROM ...
-- WHERE ...


-- SOLUTION START
DELETE FROM ingredients
WHERE recipe_id = $1;

DELETE FROM instructions
WHERE recipe_id = $1;

DELETE FROM recipes
WHERE id = $1;
-- SOLUTION END
