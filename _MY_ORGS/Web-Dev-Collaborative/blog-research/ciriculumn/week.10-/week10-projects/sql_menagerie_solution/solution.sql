-- PHASE 2, QUERY #1
SELECT city, state, population_estimate_2018
FROM cities;

-- RESULTS:
--      city      |        state         | population_estimate_2018
-- ---------------+----------------------+--------------------------
--  New York      | New York             |                  8398748
--  Los Angeles   | California           |                  3990456
--  Chicago       | Illinois             |                  2705994
--  Houston       | Texas                |                  2325502
--  Phoenix       | Arizona              |                  1660272
--  Philadelphia  | Pennsylvania         |                  1584138
--  San Antonio   | Texas                |                  1532233
--  San Diego     | California           |                  1425976
--  Dallas        | Texas                |                  1345047
--  San Jose      | California           |                  1030119
--  Austin        | Texas                |                   964254
--  Jacksonville  | Florida              |                   903889
--  Fort Worth    | Texas                |                   895008
--  Columbus      | Ohio                 |                   892533
--  San Francisco | California           |                   883305
--  Charlotte     | North Carolina       |                   872498
--  Indianapolis  | Indiana              |                   867125
--  Seattle       | Washington           |                   744955
--  Denver        | Colorado             |                   716492
--  Washington    | District of Columbia |                   702455
--  Boston        | Massachusetts        |                   694583
--  El Paso       | Texas                |                   682669
--  Detroit       | Michigan             |                   672662
--  Nashville     | Tennessee            |                   669053
--  Portland      | Oregon               |                   653115
-- (25 rows)

-- PHASE 2, QUERY #2
SELECT name
FROM airports;

-- RESULTS:
--                        name
-- --------------------------------------------------
--  John F. Kennedy International Airport
--  LaGuardia Airport
--  Los Angeles International Airport
--  Chicago O'Hare International Airport
--  Chicago Midway International Airport
--  George Bush Intercontinental Airport
--  William P. Hobby Airport
--  Phoenix Sky Harbor International Airport
--  Philadelphia International Airport
--  San Antonio International Airport
--  San Diego International Airport
--  Dallas Love Field
--  Dallas/Fort Worth International Airport
--  Norman Y. Mineta San José International Airport
--  Austin-Bergstrom International Airport
--  Jacksonville International Airport
--  Dallas/Fort Worth International Airport
--  Columbus Metropolitan Airport
--  San Francisco International Airport
--  Charlotte/Douglas International Airport
--  Indianapolis International Airport
--  King County International Airport
--  Seattle–Tacoma International Airport
--  Denver International Airport
--  Ronald Reagan Washington National Airport
--  Washington Dulles International Airport
--  Gen. Edward Lawrence Logan International Airport
--  El Paso International Airport
--  Detroit Metropolitan Wayne County Airport
--  Nashville International Airport
--  Portland International Airport
-- (31 rows)

-- PHASE 3, QUERY #1
SELECT population_estimate_2018
FROM cities
WHERE city = 'San Diego';

-- RESULTS:
--  population_estimate_2018
-- --------------------------
--                   1425976
-- (1 row)

-- PHASE 3, QUERY #2
SELECT city, state, population_estimate_2018
FROM cities
WHERE city IN ('Phoenix', 'Jacksonville', 'Charlotte', 'Nashville');

-- RESULTS:
--      city     |     state      | population_estimate_2018
-- --------------+----------------+--------------------------
--  Phoenix      | Arizona        |                  1660272
--  Jacksonville | Florida        |                   903889
--  Charlotte    | North Carolina |                   872498
--  Nashville    | Tennessee      |                   669053
-- (4 rows)

-- PHASE 3, QUERY #3
SELECT city, state, population_estimate_2018
FROM cities
WHERE population_estimate_2018 BETWEEN 800000 AND 900000;

-- RESULTS:
--      city      |     state      | population_estimate_2018
-- ---------------+----------------+--------------------------
--  Fort Worth    | Texas          |                   895008
--  Columbus      | Ohio           |                   892533
--  San Francisco | California     |                   883305
--  Charlotte     | North Carolina |                   872498
--  Indianapolis  | Indiana        |                   867125
-- (5 rows)

-- PHASE 3, QUERY #4
SELECT city
FROM cities
WHERE population_estimate_2018 >= 1000000;

-- RESULTS:
--      city
-- --------------
--  New York
--  Los Angeles
--  Chicago
--  Houston
--  Phoenix
--  Philadelphia
--  San Antonio
--  San Diego
--  Dallas
--  San Jose
-- (10 rows)

-- PHASE 3, QUERY #5
SELECT city, population_estimate_2018/1000000
FROM cities
WHERE state = 'Texas';

-- RESULTS:
--     city     | ?column?
-- -------------+----------
--  Houston     |        2
--  San Antonio |        1
--  Dallas      |        1
--  Austin      |        0
--  Fort Worth  |        0
--  El Paso     |        0
-- (6 rows)

-- PHASE 3, QUERY #6
SELECT city, population_estimate_2018
FROM cities
WHERE state NOT IN ('New York', 'California', 'Texas');

-- RESULTS: 
--      city     | population_estimate_2018
-- --------------+--------------------------
--  Chicago      |                  2705994
--  Phoenix      |                  1660272
--  Philadelphia |                  1584138
--  Jacksonville |                   903889
--  Columbus     |                   892533
--  Charlotte    |                   872498
--  Indianapolis |                   867125
--  Seattle      |                   744955
--  Denver       |                   716492
--  Washington   |                   702455
--  Boston       |                   694583
--  Detroit      |                   672662
--  Nashville    |                   669053
--  Portland     |                   653115
-- (14 rows)

-- PHASE 3, QUERY #7
SELECT city, population_estimate_2018
FROM cities
WHERE city LIKE 'S%';

-- RESULTS:
--      city      | population_estimate_2018
-- ---------------+--------------------------
--  San Antonio   |                  1532233
--  San Diego     |                  1425976
--  San Jose      |                  1030119
--  San Francisco |                   883305
--  Seattle       |                   744955
-- (5 rows)

-- PHASE 3, QUERY #8
SELECT city, land_area_sq_mi_2016, population_estimate_2018
FROM cities
WHERE
  land_area_sq_mi_2016 > 400
  OR
  population_estimate_2018 > 2000000;

-- RESULTS:
--      city     | land_area_sq_mi_2016 | population_estimate_2018
-- --------------+----------------------+--------------------------
--  New York     |                301.5 |                  8398748
--  Los Angeles  |                468.7 |                  3990456
--  Chicago      |                227.3 |                  2705994
--  Houston      |                637.5 |                  2325502
--  Phoenix      |                517.6 |                  1660272
--  San Antonio  |                  461 |                  1532233
--  Jacksonville |                747.4 |                   903889
--  Nashville    |                475.9 |                   669053
-- (8 rows)

-- PHASE 3, QUERY #9
SELECT city, land_area_sq_mi_2016, population_estimate_2018
FROM cities
WHERE (
  (land_area_sq_mi_2016 > 400
  OR
  population_estimate_2018 > 2000000
  )
  AND NOT
  (land_area_sq_mi_2016 > 400
  AND
  population_estimate_2018 > 2000000
  )
);

-- RESULTS:
--      city     | land_area_sq_mi_2016 | population_estimate_2018
-- --------------+----------------------+--------------------------
--  New York     |                301.5 |                  8398748
--  Chicago      |                227.3 |                  2705994
--  Phoenix      |                517.6 |                  1660272
--  San Antonio  |                  461 |                  1532233
--  Jacksonville |                747.4 |                   903889
--  Nashville    |                475.9 |                   669053
-- (6 rows)

-- PHASE 3, QUERY #10
SELECT city, population_estimate_2018, population_census_2010
FROM cities
WHERE (population_estimate_2018 - population_census_2010) > 200000;

-- RESULTS:
--     city     | population_estimate_2018 | population_census_2010
-- -------------+--------------------------+------------------------
--  New York    |                  8398748 |                8175133
--  Houston     |                  2325502 |                2100263
--  Phoenix     |                  1660272 |                1445632
--  San Antonio |                  1532233 |                1327407
-- (4 rows)

-- PHASE 4, QUERY #1
SELECT name, city
FROM airports
INNER JOIN cities
ON (airports.city_id = cities.id);

-- RESULTS:
--                        name                       |     city
-- --------------------------------------------------+---------------
--  John F. Kennedy International Airport            | New York
--  LaGuardia Airport                                | New York
--  Los Angeles International Airport                | Los Angeles
--  Chicago O'Hare International Airport             | Chicago
--  Chicago Midway International Airport             | Chicago
--  George Bush Intercontinental Airport             | Houston
--  William P. Hobby Airport                         | Houston
--  Phoenix Sky Harbor International Airport         | Phoenix
--  Philadelphia International Airport               | Philadelphia
--  San Antonio International Airport                | San Antonio
--  San Diego International Airport                  | San Diego
--  Dallas Love Field                                | Dallas
--  Dallas/Fort Worth International Airport          | Dallas
--  Norman Y. Mineta San José International Airport  | San Jose
--  Austin-Bergstrom International Airport           | Austin
--  Jacksonville International Airport               | Jacksonville
--  Dallas/Fort Worth International Airport          | Fort Worth
--  Columbus Metropolitan Airport                    | Columbus
--  San Francisco International Airport              | San Francisco
--  Charlotte/Douglas International Airport          | Charlotte
--  Indianapolis International Airport               | Indianapolis
--  King County International Airport                | Seattle
--  Seattle–Tacoma International Airport             | Seattle
--  Denver International Airport                     | Denver
--  Ronald Reagan Washington National Airport        | Washington
--  Washington Dulles International Airport          | Washington
--  Gen. Edward Lawrence Logan International Airport | Boston
--  El Paso International Airport                    | El Paso
--  Detroit Metropolitan Wayne County Airport        | Detroit
--  Nashville International Airport                  | Nashville
--  Portland International Airport                   | Portland
-- (31 rows)

-- PHASE 4, QUERY #2
SELECT COUNT(*)
FROM airports
INNER JOIN cities
ON (airports.city_id = cities.id)
WHERE city = 'New York';

-- RESULTS:
--  count
-- -------
--      2
-- (1 row)

-- BONUS #1
SELECT FAA_id, IATA_id, ICAO_id
FROM airports
WHERE name = 'Chicago O''Hare International Airport';

-- RESULTS:
--  faa_id | iata_id | icao_id
-- --------+---------+---------
--  ORD    | ORD     | KORD
-- (1 row)

-- BONUS #2
SELECT city, state, to_char(population_estimate_2018, '9,999,999')
FROM cities;

-- RESULTS:
--      city      |        state         |  to_char
-- ---------------+----------------------+------------
--  New York      | New York             |  8,398,748
--  Los Angeles   | California           |  3,990,456
--  Chicago       | Illinois             |  2,705,994
--  Houston       | Texas                |  2,325,502
--  Phoenix       | Arizona              |  1,660,272
--  Philadelphia  | Pennsylvania         |  1,584,138
--  San Antonio   | Texas                |  1,532,233
--  San Diego     | California           |  1,425,976
--  Dallas        | Texas                |  1,345,047
--  San Jose      | California           |  1,030,119
--  Austin        | Texas                |    964,254
--  Jacksonville  | Florida              |    903,889
--  Fort Worth    | Texas                |    895,008
--  Columbus      | Ohio                 |    892,533
--  San Francisco | California           |    883,305
--  Charlotte     | North Carolina       |    872,498
--  Indianapolis  | Indiana              |    867,125
--  Seattle       | Washington           |    744,955
--  Denver        | Colorado             |    716,492
--  Washington    | District of Columbia |    702,455
--  Boston        | Massachusetts        |    694,583
--  El Paso       | Texas                |    682,669
--  Detroit       | Michigan             |    672,662
--  Nashville     | Tennessee            |    669,053
--  Portland      | Oregon               |    653,115
-- (25 rows)

-- BONUS #3
SELECT city, round(population_estimate_2018/1000000::decimal, 2)
FROM cities
WHERE state = 'Texas';

-- RESULTS:
--     city     | round
-- -------------+-------
--  Houston     |  2.33
--  San Antonio |  1.53
--  Dallas      |  1.35
--  Austin      |  0.96
--  Fort Worth  |  0.90
--  El Paso     |  0.68
-- (6 rows)

-- BONUS #4
SELECT city, (population_estimate_2018 - population_census_2010) AS population_increase
FROM cities
ORDER BY population_increase DESC
LIMIT 1;

-- RESULTS:
--   city   | population_increase
-- ---------+---------------------
--  Houston |              225239
-- (1 row)



