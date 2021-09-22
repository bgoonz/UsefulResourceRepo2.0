-- This query needs to insert new data into the "recipes" table.
--
--   * Insert into the "instructions" table:
--     * $1 is amount
--     * $2 will contain the recipe id
--
-- It needs to include both positional parameters in the VALUES section so
-- that it inserts the value provided by the user.
--
-- You need to get the maximum value of "list_order" for the instructions
-- associated with the recipe and add 1 to it to get the next value for
-- "list_order". That means you'll have a subquery that uses the MAX function
-- to get the current maximum value of list_order where the recipe_id is equal
-- to $2.
--
-- The first step is to play around in psql or Postbird to get a SQL function
-- that can get the MAX value for "list_order" and add 1 to it. Then, you'll
-- need to do a little more.
--
-- Unfortunately, if there are no instructions for the given recipe,
-- MAX(list_order) just returns NULL. The table prevents a NULL value in the
-- list_order column. This means you'll need to use the COALESCE function, too.
-- This allows you to provide a value if the first argument is NULL. For
-- example, the following
--
--   SELECT COALESCE(NULL, 1);
--
-- returns 1 because the first argument is null. Try it out in psql or Postbird
-- or your favorite PostgreSQL client.
--
-- Read more about COALESCE here:
--   https://www.enterprisedb.com/postgres-tutorials/how-use-coalesce-postgresql
--
-- Once you have your SQL statement figured out, here's what the INSERT will
-- look like:
-- INSERT INTO (list_order, ... «other column names»)
-- VALUES
-- (
--   (SELECT ... FROM ... WHERE ...), -- subquery to get maximum list_order + 1
--   «positional parameter»,
--   «positional parameter»,
-- )

-- SOLUTION START
INSERT INTO instructions(list_order, specification, recipe_id)
VALUES
(
  (SELECT COALESCE(MAX(list_order), 0) + 1 FROM instructions WHERE recipe_id = $2),
  $1,
  $2
);
-- SOLUTION END
