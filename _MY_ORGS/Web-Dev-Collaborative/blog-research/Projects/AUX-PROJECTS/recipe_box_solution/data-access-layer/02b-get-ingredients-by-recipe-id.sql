-- This query needs to select the following columns:
--
--   * From the "ingredients" table:
--     * amount
--     * food_stuff
--
--   * From the "units_of_measure" table:
--     * name
--
-- If you return more columns, they will be ignored.
--
-- You will join the ingredients table to the unit of measure table. You will
-- use the foreign key column "unit_of_measure_id" to join to the primary key
-- column "id" in the "unit_of_measure_table".
--
-- It needs to include a single positional parameter $1 in the WHERE clause so
-- that it gets the ingredients with the provided recipe id that will be
-- provided at run time.
--
-- This has the general form
-- SELECT ...
-- FROM «one of the tables»
-- JOIN «other table» ON («one of the relationship columns» = «other relationship column»)
-- WHERE ... (here you'll use the $1 parameter)
--
-- For example, using JOIN on a table named "weather" and "cities" to get the
-- weather records for each city record, you would write:
--
-- SELECT *
-- FROM weather
-- JOIN cities ON (weather.city = cities.name)
--
-- With just a normal JOIN, order doesn't matter. You could write the following
-- and it would return the same result.
--
-- SELECT *
-- FROM cities
-- JOIN weather ON (weather.city = cities.name)

-- SOLUTION START
SELECT amount, food_stuff, name
FROM ingredients
JOIN units_of_measure ON (ingredients.unit_of_measure_id = units_of_measure.id)
WHERE recipe_id = $1;
-- SOLUTION END
