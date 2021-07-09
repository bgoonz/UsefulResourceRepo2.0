-- sqlbolt.com first five lessons solutions

-- 1 lesson
SELECT title FROM movies;
SELECT director FROM movies;
SELECT title, director FROM movies;
SELECT title, year FROM movies;
SELECT * FROM movies;

-- 2 lesson
SELECT * FROM movies WHERE id = 6;
SELECT * FROM movies WHERE year BETWEEN 2000 AND 2010;
SELECT * FROM movies WHERE year NOT BETWEEN 2000 AND 2010;
SELECT * FROM movies WHERE id BETWEEN 1 AND 5;

-- 3 lesson
SELECT * FROM movies WHERE title LIKE "Toy Story%";
SELECT * FROM movies WHERE director = "John Lasseter";
SELECT * FROM movies WHERE director != "John Lasseter";
SELECT * FROM movies WHERE title LIKE "WALL-%";

-- 4 lesson
SELECT DISTINCT director FROM movies ORDER BY director ASC;
SELECT * FROM movies ORDER BY year DESC LIMIT 4;
SELECT * FROM movies ORDER BY title ASC LIMIT 5;
SELECT * FROM movies ORDER BY title ASC LIMIT 5 OFFSET 5;

-- 5 lesson
SELECT city, population FROM north_american_cities WHERE country  =  "Canada";
SELECT city, latitude FROM north_american_cities WHERE country = "United States" ORDER BY latitude DESC;
SELECT city, longitude FROM north_american_cities  WHERE longitude < -87.629798 ORDER BY longitude ASC;
SELECT city, population FROM north_american_cities WHERE country = "Mexico" ORDER BY population DESC LIMIT 2;
SELECT city, population FROM north_american_cities WHERE country = "United States" ORDER BY population DESC LIMIT 2 OFFSET 2;