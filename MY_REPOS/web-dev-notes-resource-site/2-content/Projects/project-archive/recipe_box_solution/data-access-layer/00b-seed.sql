-- This file contains instructions for you to create your database tables that
-- will power the application. At the bottom of the file is seed data for your
-- application that matches the structure of each of the tables that you will
-- create. It is meant as a convenience for you so that the application has data
-- in it for you to play with.

-- Set the role to 'recipe_box_app' so the tables created will be owned by that
-- user.

-- SOLUTION BEGIN
SET ROLE recipe_box_app;
-- SOLUTION END



-- Create a table for the "recipes". It will need the following columns in it.
-- The "PK" in the constraints column means the column is a "primary key". The
--
-- | Column Name | Column Type  | Constraints                         |
-- |-------------|--------------|-------------------------------------|
-- | id          | SERIAL       | PK                                  |
-- | title       | VARCHAR(200) | NOT NULL                            |
-- | created     | TIMESTAMP    | NOT NULL, DEFAULT CURRENT_TIMESTAMP |
-- | updated     | TIMESTAMP    | NOT NULL, DEFAULT CURRENT_TIMESTAMP |

-- SOLUTION BEGIN
CREATE TABLE recipes (
  id SERIAL,
  title VARCHAR(200) NOT NULL,
  created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);
-- SOLUTION END



-- Create a table for the "instructions". It will need the following columns in
-- it. The "PK" in the constraints column means the column is a "primary key".
-- "FK" in the constraints means that its a "foreign key". You should be able to
-- determine the name of the table from the name of the column because of a good
-- naming scheme. You know the primary key of that table because it's specified
-- above. That's all the information you need to write the FOREIGN KEY
-- constraint.
--
-- | Column Name   | Column Type | Constraints  |
-- |---------------|-------------|--------------|
-- | id            | SERIAL      | PK           |
-- | specification | TEXT        | NOT NULL     |
-- | list_order    | INTEGER     | NOT NULL     |
-- | recipe_id     | INTEGER     | FK, NOT NULL |

-- SOLUTION BEGIN
CREATE TABLE instructions (
  id SERIAL,
  specification TEXT NOT NULL,
  list_order INTEGER NOT NULL,
  recipe_id INTEGER NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (recipe_id) REFERENCES recipes(id)
);
-- SOLUTION END



-- Create a table for the "units_of_measure". It will need the following columns
-- in it. The "PK" in the constraints column means the column is a "primary
-- key".
--
-- | Column Name | Column Type | Constraints |
-- |-------------|-------------|-------------|
-- | id          | SERIAL      | PK          |
-- | name        | VARCHAR(20) | NOT NULL    |

-- SOLUTION BEGIN
CREATE TABLE units_of_measure (
  id SERIAL,
  name VARCHAR(20) NOT NULL,
  PRIMARY KEY (id)
);
-- SOLUTION END



-- Create a table for the "ingredients". It will need the following columns in
-- it. The "PK" in the constraints column means the column is a "primary key".
-- The "FK" in the constraints means that its a "foreign key". You should be
-- able to determine the name of the table from the name of the column because
-- of a good naming scheme. You know the primary key of that table because it's
-- specified above. That's all the information you need to write the FOREIGN KEY
-- constraint.
--
-- | Column Name        | Column Type   | Constraints  |
-- |--------------------|---------------|--------------|
-- | id                 | SERIAL        | PK           |
-- | amount             | NUMERIC(5, 2) | NOT NULL     |
-- | unit_of_measure_id | INTEGER       | FK, NOT NULL |
-- | food_stuff         | VARCHAR(500)  | NOT NULL     |
-- | recipe_id          | INTEGER       | FK, NOT NULL |

-- SOLUTION BEGIN
CREATE TABLE ingredients (
  id SERIAL,
  amount NUMERIC(5, 2),
  unit_of_measure_id INTEGER,
  food_stuff VARCHAR(500) NOT NULL,
  recipe_id INTEGER NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (unit_of_measure_id) REFERENCES units_of_measure(id),
  FOREIGN KEY (recipe_id) REFERENCES recipes(id)
);
-- SOLUTION END




-- HERE BEGINS THE SEED DATA

INSERT INTO units_of_measure (id, name)
VALUES
(15, 'cans'),
(1, 'cups'),
(2, 'fluid ounces'),
(3, 'gallons'),
(4, 'grams'),
(5, 'liters'),
(6, 'milliliters'),
(7, 'ounces'),
(8, 'pinch'),
(9, 'pints'),
(10, 'pounds'),
(11, 'quarts'),
(16, 'slices'),
(17, 'splash'),
(12, 'tablespoons'),
(13, 'teaspoons'),
(14, '');
SELECT pg_catalog.setval(pg_get_serial_sequence('units_of_measure', 'id'), (SELECT MAX(id) FROM units_of_measure)+1);

INSERT INTO recipes (id, title, created, updated)
VALUES
(1, 'One-Pan Rotini with Tomato Cream Sauce', '2014-09-03', '2014-09-03'),
(2, 'Peanut Butter and Jelly Sandwich', '2014-11-27', '2014-11-27'),
(3, 'Smoked mackerel & leek hash with horseradish', '2016-06-07', '2016-06-07'),
(4, 'Beetroot, hummus & crispy chickpea sub sandwich', '2016-07-08', '2016-07-08'),
(5, 'Saucy bean baked eggs', '2016-09-06', '2016-09-06'),
(6, 'Butter bean & chorizo stew', '2016-12-26', '2016-12-26'),
(7, 'Green Grape Pie', '2016-07-31', '2016-07-31'),
(8, 'Curried cauliflower & lentil soup', '2017-03-22', '2017-03-22'),
(9, 'Pesto & goat''s cheese risotto', '2019-06-01', '2019-06-01'),
(10, 'Jerk prawn & coconut rice bowls', '2019-11-20', '2019-11-20'),
(11, 'Sausages with pesto mash', '2020-01-05', '2020-01-05'),
(12, 'Easy laksa', '2014-08-30', '2014-08-30');
SELECT pg_catalog.setval(pg_get_serial_sequence('recipes', 'id'), (SELECT MAX(id) FROM recipes)+1);

INSERT INTO ingredients (recipe_id, amount, unit_of_measure_id, food_stuff)
VALUES
(12, 3, 12, 'Thai green curry paste'),
(12, 400, 6, 'coconut milk'),
(12, 150, 4, 'cooked prawns'),
(12, 250, 4, 'courgetti'),
(11, 3, 14, 'large white potatoes'),
(11, 2, 12, 'olive oil, for frying'),
(11, 4, 14, 'pork sausages'),
(11, 200, 4, 'cherry tomatoes on the vine'),
(11, 0.5, 14, 'tub fresh pesto'),
(10, 150, 4, 'peeled king prawns'),
(10, 1.5, 12, 'jerk seasoning'),
(10, 400, 4, 'kidney beans in chili sauce'),
(10, 250, 4, 'coconut rice'),
(9, 2, 12, 'olive oil, for frying'),
(9, 200, 4, 'risotto rice'),
(9, 700, 6, 'chicken or vegetable stock'),
(9, 1, 14, 'tub fresh pesto'),
(9, 100, 4, 'goat''s cheese'),
(8, 1, 14, 'cauliflower'),
(8, 1.5, 12, 'oil'),
(8, 2, 13, 'fennel seeds'),
(8, 150, 4, 'red lentils'),
(8, 3, 12, 'curry paste of your choice'),
(8, 0.5, 14, 'lemon, juiced'),
(6, 200, 4, 'cooking chorizo'),
(6, 800, 4, 'chopped tomatoes'),
(6, 800, 4, 'drained butter beans'),
(6, 1, 14, 'tub fresh pesto'),
(5, 2, 15, 'cherry tomatoes'),
(5, 400, 4, 'mixed bean salad, drained'),
(5, 200, 4, 'baby spinach'),
(5, 4, 14, 'medium eggs'),
(5, 50, 4, 'thinly sliced smoked ham'),
(4, 300, 4, 'cooked beetroot in water'),
(4, 400, 4, 'can of chickpeas, drained'),
(4, 3, 12, 'vegan pesto'),
(4, 1, 12, 'olive oil'),
(4, 1, 17, 'vinegar'),
(4, 2, 14, 'ciabatta rolls'),
(4, 2, 14, 'handfulls mixed greens'),
(3, 250, 4, 'new potatoes, halved'),
(3, 2, 12, 'oil'),
(3, 2, 14, 'large leeks, thinly sliced'),
(3, 4, 14, 'eggs'),
(3, 100, 4, 'peppered smoked mackerel'),
(3, 2, 12, 'creamed horseradish'),
(1, 1, 10, 'lean ground beef'),
(1, 1, 14, 'medium onion, chopped'),
(1, 2, 14, 'garlic cloves, minced'),
(1, 1, 13, 'Italian seasoning'),
(1, 0.5, 13, 'pepper'),
(1, 0.25, 13, 'salt'),
(1, 2, 1, 'beef stock'),
(1, 1, 15, 'fire-roasted diced tomatoes'),
(1, 2, 1, 'uncooked spiral pasta'),
(1, 1, 1, 'frozen peas'),
(1, 1, 1, 'heavy whipped cream'),
(1, 0.5, 1, 'grated Parmesan cheese'),
(2, 2, 12, 'peanut butter'),
(2, 1, 12, 'jelly, your favorite flavor'),
(2, 2, 16, 'bread, your favorite kind'),
(7, 2, 14, 'unbaked pie crusts'),
(7, 2.5, 10, 'green grapes'),
(7, 1, 1, 'white sugar, plus extra for top crust'),
(7, 0.5, 13, 'nutmeg'),
(7, 1, 14, 'lemon'),
(7, 0.25, 1, 'elderberry flower syrup'),
(7, 0.25, 1, 'dark honey'),
(7, 0.25, 13, 'salt'),
(7, 3, 12, 'cornstarch'),
(7, 2, 12, 'unsalted butter, cut into small pieces');
SELECT pg_catalog.setval(pg_get_serial_sequence('ingredients', 'id'), (SELECT MAX(id) FROM ingredients)+1);

INSERT INTO instructions (recipe_id, list_order, specification)
VALUES
(12, 1, 'Heat 1 tsp flavourless oil in a frying pan over a medium heat. Add the curry paste and cook for 1 min. Pour in the coconut milk, then leave to bubble away for a few mins before adding the prawns and courgetti. Cook for 1 min more to warm through, then divide between bowls.'),
(11, 1, 'Peel and quarter the potatoes, then cook in a large pan of salted, boiling water for 15 mins. Drain and set aside.'),
(11, 2, 'Pour a glug of olive oil into a large frying pan over a medium heat and cook the sausages for 15 mins. Add the tomatoes to the pan for the final 5 mins. Mash the potatoes well and mix in the pesto. Season and serve with the sausages and tomatoes.'),
(10, 1, 'Heat 1 tbsp flavourless oil in a large frying pan. Add the prawns and the jerk seasoning, and cook for 1-2 mins. Drain the beans, reserving 3 tbsp of the chilli sauce.'),
(10, 2, 'Add the beans to the pan along with the reserved sauce and the coconut rice. Fry for 3-4 mins, then season with salt to taste and spoon into two bowls to serve.'),
(9, 1, 'Pour a glug of olive oil into a large saucepan. Tip in the rice and fry for 1 min. Add half the stock and cook until absorbed. Add the remaining stock, a ladle at a time, and cook until the rice is al dente, stirring continually, for 20-25 mins.'),
(9, 2, 'Stir through the pesto and half the goat’s cheese. Serve topped with the remaining cheese.'),
(8, 1, 'Remove the outer leaves from the cauliflower, cut off the stalk and roughly chop, then cut the head into small florets. Toss a quarter of the florets in 1 tbsp oil and 1 tsp of the fennel seeds, season well, then tip into a roasting tin and set aside.'),
(8, 2, 'Heat oven to 220C/200C fan/gas 7. Heat ½ tbsp oil in a saucepan over a medium heat and add the remaining fennel seeds, toast for 2 mins, then add the lentils and the remaining cauliflower. Stir in the curry paste, then add 1 litre water and bring to the boil. Simmer for 25 mins until the cauliflower is tender and the lentils are cooked through.'),
(8, 3, 'Meanwhile, put the roasting tin of cauliflower in the oven and cook for 20 mins until crisp and slightly charred. Tip the soup mixture into a food processor and blitz until smooth, tip back into the pan to warm through, adding the lemon juice and a little water if it’s too thick. Tip into bowls and top with the crispy cauliflower and fennel seeds to serve.'),
(6, 1, 'Slice the chorizo and tip into a large saucepan over a medium heat. Fry gently for 5 mins or until starting to turn dark brown. Add the tomatoes and butter beans, bring to the boil, then simmer for 10 mins. Swirl through the pesto, season lightly and ladle into four bowls.'),
(5, 1, 'Tip the tomatoes and bean salad into an ovenproof frying pan or shallow flameproof casserole dish. Simmer for 10 mins, or until reduced. Stir in the spinach and cook for 5 mins more until wilted. '),
(5, 2, 'Heat the grill to medium. Make four indentations in the mixture using the back of a spoon, then crack one egg in each. Nestle the ham in the mixture, then grill for 4-5 mins, or until the whites are set and the yolks runny. Serve with rye bread, if you like.'),
(4, 1, 'Blitz the whole beetroot, ¾ of the chickpeas, 2 tbsp pesto and 1 tbsp oil in a food processor with some seasoning until you have a thick, smooth hummus. Heat the ciabatta following the pack instructions.'),
(4, 2, 'Fry the remaining chickpeas in a little oil until crisp, then set aside. Toss the salad leaves with the remaining pesto and a splash of vinegar. Slice the rolls, then assemble the sandwiches with the hummus, beetroot slices, salad leaves and fried chickpeas.'),
(3, 1, 'Put the potatoes in a microwaveable bowl with a splash of water, cover, then cook on high for 5 mins until tender (or steam or simmer them).'),
(3, 2, 'Meanwhile, heat the oil in a frying pan over a medium heat, add the leeks with a pinch of salt and cook for 10 mins, stirring so they don’t stick, until softened. Tip in the potatoes, turn up the heat and fry for a couple of mins to crisp them up a bit. Flake through the mackerel.'),
(3, 3, 'Make four indents in the leek mixture in the pan, crack an egg into each, season, then cover the pan and cook for 6-8 mins until the whites have set and the yolks are runny. Serve the horseradish on the side, with the pan in the middle of the table.'),
(1, 1, 'In a large skillet, cook beef and onion over medium heat until beef is no longer pink and onion is tender, breaking up beef into crumbles, 5-10 minutes; drain. Add garlic and seasonings; cook 1 minute longer. Add the stock and tomatoes; bring to a boil. Add pasta and peas; reduce heat. Simmer, covered, until pasta is tender, 10-12 minutes.'),
(1, 2, 'Gradually stir in cream and cheese; heat through (do not allow to boil).'),
(2, 1, 'Spread the peanut butter on one piece of bread.'),
(2, 2, 'Spread the jelly on the other piece of bread.'),
(2, 3, 'Put the two smeared sides of bread together.'),
(7, 1, 'Heat the oven to 425°F. Pat one pie crust into a 9-inch pie pan. Place the pie pan into the freezer while you prep the filling.'),
(7, 2, 'Pluck the grapes off their stems and place them in a large saucepan or pot. Add the sugar, nutmeg, lemon juice, elderberry flower syrup, and honey. Turn the heat to medium and cook, stirring frequently. When the mixture is quite warm to the touch, whisk in the salt and cornstarch. Cook, whisking frequently, until the mixture is boiling and thickened slightly.'),
(7, 3, 'Remove from the heat and use a slotted spoon to remove the grapes from the liquid. Put all the grapes into the frozen pie crust, then pour in enough of the syrup liquid to fill the pie crust. Leave about 1/2 inch space between the top of the crust and the liquid. Top the grape mixture with the pieces of butter. Press the second disc of pie dough on top of the pan, and crimp the edges together. Cut a few small slits in the top, and sprinkle the top crust generously with sugar.'),
(7, 4, 'Bake for 30 minutes or until crust is well-browned and filling is bubbly. Let cool completely before serving.');
SELECT pg_catalog.setval(pg_get_serial_sequence('instructions', 'id'), (SELECT MAX(id) FROM instructions)+1);
