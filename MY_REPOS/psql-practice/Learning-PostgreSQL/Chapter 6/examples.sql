----------------------------------------------------------------------

WITH pre_select AS 
(
  SELECT car_id, number_of_owners, car_model_id 
    FROM car_portal_app.car 
    WHERE manufacture_year >= 2010
),
joined_data AS 
(
  SELECT car_id, marke, model, number_of_owners 
    FROM pre_select
      INNER JOIN car_portal_app.car_model
        ON pre_select.car_model_id=car_model.car_model_id
),
minimal_owners AS 
(
  SELECT min(number_of_owners) AS min_number_of_owners
    FROM pre_select
)
SELECT car_id, marke, model, number_of_owners 
  FROM joined_data
    INNER JOIN minimal_owners
      ON joined_data.number_of_owners = 
        minimal_owners.min_number_of_owners; 

----------------------------------------------------------------------

SELECT marke, model, avg_age
  FROM (
    SELECT car_model_id, 
        avg(EXTRACT(YEAR FROM now())-manufacture_year) 
          AS avg_age
      FROM car_portal_app.car
      GROUP BY car_model_id 
    ) age_subq1
    INNER JOIN car_portal_app.car_model 
      ON car_model.car_model_id = age_subq1.car_model_id
  WHERE avg_age < (SELECT avg(avg_age) FROM
        (
          SELECT avg(EXTRACT(YEAR FROM now())
              -manufacture_year) avg_age
            FROM car_portal_app.car
            GROUP BY car_model_id
        ) age_subq2 
      ); 

----------------------------------------------------------------------

WITH age_subq  AS 
(
  SELECT car_model_id, 
      avg(EXTRACT(YEAR FROM now())-manufacture_year) 
        AS avg_age
    FROM car_portal_app.car
    GROUP BY car_model_id 
) 
SELECT marke, model, avg_age
  FROM age_subq
    INNER JOIN car_portal_app.car_model 
      ON car_model.car_model_id = age_subq.car_model_id
  WHERE avg_age < (SELECT avg(avg_age) FROM age_subq); 

----------------------------------------------------------------------

WITH car_subquery AS 
(
  SELECT number_of_owners, manufacture_year,
      number_of_doors 
    FROM car_portal_app.car
)
SELECT number_of_owners, number_of_doors
  FROM car_subquery 
  WHERE manufacture_year = 2008; 

----------------------------------------------------------------------

SELECT number_of_owners, number_of_doors 
  FROM car_portal_app.car 
  WHERE manufacture_year = 2008; 

----------------------------------------------------------------------

WITH RECURSIVE subq (n, factorial) AS 
(
  SELECT 1, 1
  UNION ALL 
  SELECT n+1, factorial*(n+1) from subq WHERE n <5  
)
SELECT * FROM subq; 

----------------------------------------------------------------------
----------------------------------------------------------------------

BEGIN;

CREATE TABLE family (parent text, child text);
INSERT INTO family VALUES (NULL, 'Alan'), 
('Alan', 'Bert'), ('Alan', 'Bob'), ('Bert', 'Carl'), 
('Bert', 'Carmen'), ('Bob', 'Cecil'), ('Cecil', 'Dave'), 
('Cecil', 'Den');

WITH RECURSIVE genealogy (bloodline, parent, level) AS 
(
  SELECT child, child, 0 
    FROM family WHERE parent IS NULL
  UNION ALL
  SELECT g.bloodline || ' -> ' || f.child, f.child,
      g.level + 1 
    FROM family f, genealogy g 
    WHERE f.parent = g.parent  
)
SELECT bloodline, level FROM genealogy;  

INSERT INTO family VALUES ('Bert', 'Alan');

WITH RECURSIVE genealogy 
  (bloodline, parent, level, processed) AS 
(
  SELECT child, child, 0, ARRAY[child] 
    FROM family WHERE parent IS NULL
  UNION ALL
  SELECT g.bloodline || ' -> ' || f.child, 
      f.child, g.level + 1, processed || f.child
    FROM family f, genealogy g 
    WHERE f.parent = g.parent 
      AND NOT f.child = ANY(processed)
)
SELECT bloodline, level FROM genealogy;  

ROLLBACK;

----------------------------------------------------------------------
----------------------------------------------------------------------

BEGIN;

INSERT INTO car_portal_app.car_model (marke, model) 
  VALUES ('Ford','Mustang') 
  RETURNING car_model_id;

INSERT INTO car_portal_app.car (number_of_owners, registration_number, manufacture_year, number_of_doors, car_model_id, mileage)
  VALUES (1, 'GTR1231', 2014, 4, 100, 10423);

ROLLBACK;

----------------------------------------------------------------------
----------------------------------------------------------------------

BEGIN;

WITH car_model_insert AS 
(
  INSERT INTO car_portal_app.car_model (marke, model)     
    VALUES ('Ford','Mustang') RETURNING car_model_id
)
INSERT INTO car_portal_app.car 
  (number_of_owners, registration_number, 
    manufacture_year, number_of_doors, car_model_id, 
    mileage)
  SELECT 1, 'GTR1231', 2014, 4, car_model_id, 10423 
    FROM car_model_insert;

ROLLBACK;

----------------------------------------------------------------------
----------------------------------------------------------------------

BEGIN;

CREATE TABLE t (f int UNIQUE);

INSERT INTO t VALUES (1);

SAVEPOINT p1;

WITH del_query AS (DELETE FROM t)
INSERT INTO t VALUES (1);

ROLLBACK TO SAVEPOINT p1;

WITH del_query AS 
(DELETE FROM t RETURNING f)
INSERT INTO t SELECT 1 
WHERE (SELECT count(*) FROM del_query) IS NOT NULL;

ROLLBACK;

----------------------------------------------------------------------
----------------------------------------------------------------------

WITH monthly_data AS (
  SELECT date_trunc('month', advertisement_date) AS 
      month, count(*) as cnt 
    FROM car_portal_app.advertisement
    GROUP BY date_trunc('month', advertisement_date)
)
SELECT to_char(month,'YYYY-MM') as month, cnt,
    sum(cnt) OVER (w ORDER BY month) AS cnt_year,
    round(avg(cnt) OVER (ORDER BY month 
      ROWS BETWEEN 2 PRECEDING AND 2 FOLLOWING),1) 
      AS mov_avg,
    round(cnt/sum(cnt) OVER w *100,1) AS ratio_year
  FROM monthly_data
  WINDOW w AS (PARTITION BY date_trunc('year',month));

----------------------------------------------------------------------

WITH monthly_data AS (
  SELECT date_trunc('month', advertisement_date) AS 
      month, count(*) as cnt 
    FROM car_portal_app.advertisement
    GROUP BY date_trunc('month', advertisement_date)
)
SELECT to_char(month,'YYYY-MM') as month,
    cnt,
    cnt - lag(cnt) OVER (ORDER BY month) as prev_m,
    cnt - lag(cnt, 12) OVER (ORDER BY month) as prev_y,
    rank() OVER (w ORDER BY cnt DESC) as rank
  FROM monthly_data
  WINDOW w AS (PARTITION BY date_trunc('year',month))
  ORDER BY month DESC; 

----------------------------------------------------------------------

SELECT seller_account_id, 
    dense_rank() OVER(ORDER BY count(*) DESC) 
  FROM car_portal_app.advertisement
  GROUP BY seller_account_id; 

----------------------------------------------------------------------

SELECT advertisement_id, advertisement_date, adv.car_id, 
    seller_account_id
  FROM car_portal_app.advertisement adv 
  INNER JOIN 
  (
    SELECT car_id, min(advertisement_date) min_date
      FROM car_portal_app.advertisement
      GROUP BY car_id
  ) first ON adv.car_id=first.car_id AND 
    adv.advertisement_date = first.min_date; 

----------------------------------------------------------------------

SELECT DISTINCT first_value(advertisement_id) OVER w 
    AS advertisement_id,
  min(advertisement_date) OVER w 
    AS advertisement_date,
  car_id, first_value(seller_account_id) OVER w 
    AS seller_account_id 
  FROM car_portal_app.advertisement
  WINDOW w AS (PARTITION BY car_id ORDER BY 
    advertisement_date); 

----------------------------------------------------------------------

SELECT years.manufacture_year, count(car_id)  
  FROM generate_series(2010, 2015) as 
      years (manufacture_year)
    LEFT JOIN car_portal_app.car 
      ON car.manufacture_year = years.manufacture_year
  GROUP BY years.manufacture_year
  ORDER BY 1; 

----------------------------------------------------------------------

SELECT * FROM generate_series(5, 11, 3);

SELECT * FROM generate_series('2015-01-01'::date, 
  '2015-01-31'::date, interval '7 days') ;

SELECT foo.a, foo.b FROM 
  ROWS FROM  (
    generate_series(1,3), generate_series(1,7,2)
  ) AS foo(a, b) ; 

----------------------------------------------------------------------

SELECT car_id, manufacture_year, 
    CASE WHEN manufacture_year <= 
      (SELECT avg(manufacture_year) 
        FROM car_portal_app.car 
        WHERE car_model_id = c.car_model_id
      ) THEN 'old' ELSE 'new' END as age,
    (SELECT count(*) FROM car_portal_app.car 
      WHERE car_model_id = c.car_model_id
    ) AS same_model_count
  FROM car_portal_app.car c; 

----------------------------------------------------------------------

SELECT car_id, manufacture_year, 
    CASE WHEN manufacture_year <= avg_year 
      THEN 'old' ELSE 'new' END as age, 
    same_model_count 
  FROM car_portal_app.car
    INNER JOIN (
      SELECT car_model_id, 
          avg(manufacture_year) avg_year, 
          count(*) same_model_count  
        FROM car_portal_app.car 
        GROUP BY car_model_id
    ) subq USING (car_model_id) ;

----------------------------------------------------------------------

SELECT car_id, manufacture_year,
        CASE WHEN manufacture_year <= avg_year 
          THEN 'old' ELSE 'new' END as age, 
        same_model_count
      FROM car_portal_app.car c,
        LATERAL (SELECT avg(manufacture_year) avg_year, 
            count(*) same_model_count 
          FROM car_portal_app.car 
          WHERE car_model_id = c.car_model_id) subq; 

----------------------------------------------------------------------

SELECT a, b FROM 
  generate_series(1,3) AS a,
  generate_series(a, a+2) AS b; 

----------------------------------------------------------------------

SELECT percentile_disc(ARRAY[0.25, 0.5, 0.75]) 
    WITHIN GROUP (ORDER BY cnt)
  FROM (
    SELECT count(*) cnt 
      FROM car_portal_app.advertisement 
      GROUP BY car_id) subq; 

----------------------------------------------------------------------

SELECT mode() WITHIN GROUP (ORDER BY car_model_id) 
  FROM car_portal_app.car; 

----------------------------------------------------------------------

SELECT rank(2) WITHIN GROUP ( ORDER BY a) 
  FROM generate_series(1,10,3) a; 

----------------------------------------------------------------------

SELECT car_model_id, number_of_doors, count(*) 
  FROM car_portal_app.car 
  GROUP BY car_model_id, number_of_doors; 

----------------------------------------------------------------------

SELECT car_model_id, 
    count(*) FILTER (WHERE number_of_doors = 2) doors2,
    count(*) FILTER (WHERE number_of_doors = 3) doors3,
    count(*) FILTER (WHERE number_of_doors = 4) doors4,
    count(*) FILTER (WHERE number_of_doors = 5) doors5
  FROM car_portal_app.car
  GROUP BY car_model_id; 
