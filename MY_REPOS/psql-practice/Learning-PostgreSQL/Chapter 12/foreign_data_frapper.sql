CREATE EXTENSION postgres_fdw;
CREATE SERVER car_portal_original FOREIGN DATA WRAPPER postgres_fdw OPTIONS (host 'localhost', dbname 'car_portal');
CREATE USER MAPPING FOR CURRENT_USER SERVER car_portal_original;
CREATE FOREIGN TABLE car_portal_app.car_orignal 
(
  car_id int,
  number_of_owners int, 
  registration_number text, 
  manufacture_year int, 
  number_of_doors int, 
  car_model_id int, 
  mileage int
) 
SERVER car_portal_original 
OPTIONS (table_name 'car');

WITH n AS (SELECT car_id, number_of_owners, registration_number, manufacture_year, number_of_doors, car_model_id, mileage FROM car_portal_app.car),
o AS (SELECT * FROM car_portal_app.car_orignal)
SELECT 'new', * FROM (SELECT * FROM n EXCEPT ALL SELECT * FROM o) a 
UNION ALL 
SELECT 'old', * FROM (SELECT * FROM o EXCEPT ALL SELECT * FROM n) b;