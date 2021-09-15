SELECT count(*) FROM car_portal_app.car;
SELECT * FROM car_portal_app.car INNER JOIN car_portal_app.car_model USING (car_model_id) ORDER BY car_id OFFSET 20 LIMIT 20;