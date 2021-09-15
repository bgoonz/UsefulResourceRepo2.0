-- This query needs to select the following columns:
--
--   * From the "units_of_measure" table:
--     * id
--     * name
--
-- It should order the results by the name
--
-- This has the general form
-- SELECT ...
-- FROM ...
-- ORDER BY ...

-- SOLUTION START
SELECT id, name
FROM units_of_measure
ORDER BY name;
-- SOLUTION END
