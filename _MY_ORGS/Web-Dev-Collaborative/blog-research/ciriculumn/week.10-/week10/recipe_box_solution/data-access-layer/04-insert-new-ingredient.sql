-- This query needs to insert new data into the "recipes" table.
--
--   * Insert into the "ingredients" table:
--     * $1 is amount
--     * $2 is unit of measure id
--     * $3 is food stuff
--     * $4 will contain the recipe id
--
-- It needs to include all four positional parameters in the VALUES section so
-- that it inserts the value provided by the user.


-- SOLUTION START
INSERT INTO ingredients(amount, unit_of_measure_id, food_stuff, recipe_id)
VALUES
($1, $2, $3, $4);
-- SOLUTION END
