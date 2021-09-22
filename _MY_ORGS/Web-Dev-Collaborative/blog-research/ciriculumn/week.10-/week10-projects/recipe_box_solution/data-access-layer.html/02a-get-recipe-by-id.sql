-- This query needs to select the following columns:
--
--   * From the "recipes" table:
--     * id
--     * title
--     * created
--     * updated
--
-- It needs to include a single positional parameter $1 in the
-- WHERE clause so that it gets the recipe with the id that will
-- be provided at run time
--
-- This has the general form
-- SELECT ...
-- FROM ...
-- WHERE ... (here you'll use the $1 parameter)

-- SOLUTION START
SELECT id, title, created, updated
FROM recipes
WHERE id = $1;
-- SOLUTION END
