-- This query needs to select the following columns by searching the text in
-- the "title" column:
--
--   * From the "recipes" table:
--     * id
--     * title
--     * updated
--
-- The positional parameter will contain the text the user typed into the search
-- box with percent signs before and after the text. That means that they will
-- type in something like "pie" and the positional parameter $1 will contain the
-- text "%pie%". Use one of the strig functions combined with one of the pattern
-- matching operators to do a case-insensitive search.
--
-- Test your implementation with typing all different types of searches into the
-- search box using a combination of uppercase and lowercase letters.
--
-- String functions:
-- https://www.postgresql.org/docs/current/functions-string.html
--
-- Pattern matching:
-- https://www.postgresql.org/docs/current/functions-matching.html


-- SOLUTION START
SELECT id, title, updated
FROM recipes
WHERE LOWER(title) LIKE LOWER($1);
-- SOLUTION END
