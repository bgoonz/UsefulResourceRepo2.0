-- This query needs to insert new data into the "recipes" table.
--
--   * Insert into the "recipes" table:
--     * title
--
-- In this case, you should allow the default values for "created" and "updated"
-- to be inserted by NOT including them in your INSERT statement.
--
-- It needs to include a single positional parameter $1 in the VALUES section so
-- that it inserts the value provided by the user.
--
-- This has the general form
-- INSERT INTO ...
-- VALUES
-- (...) (here you'll use the $1 parameter)
-- RETURNING id (this will return the id of the new recipe, don't forget it!)


-- SOLUTION START
INSERT INTO recipes(title)
VALUES ($1)
RETURNING id;
-- SOLUTION END
