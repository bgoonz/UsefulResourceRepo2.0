-- This query needs to select the following columns:
--
--   * From the "instructions" table:
--     * list_order
--     * specification
--
-- The results must be in ascending order of the value found in "list_order".
--
-- If you return more columns, they will be ignored.
--
-- It needs to include a single positional parameter $1 in the WHERE clause so
-- that it gets the ingredients with the provided recipe id that will be
-- provided at run time.
--
-- This has the general form
-- SELECT ...
-- FROM ...
-- WHERE ... (here you'll use the $1 parameter)


-- SOLUTION START
SELECT specification, list_order
FROM instructions
WHERE recipe_id = $1
ORDER BY list_order;
-- SOLUTION END
