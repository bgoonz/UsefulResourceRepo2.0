CREATE TABLE edible_seeds (
  id SERIAL,
  name VARCHAR(255),
  type VARCHAR(255),
  price_per_pound FLOAT,
  in_stock BOOLEAN
);

INSERT INTO edible_seeds VALUES(DEFAULT, 'Chia', 'Pseudocereal', 6.95, 'yes');
INSERT INTO edible_seeds VALUES(DEFAULT, 'Flax', 'Pseudocereal', 6.90, 'yes');
INSERT INTO edible_seeds VALUES(DEFAULT, 'Amaranth', 'Pseudocereal', 14.99, 'yes');
INSERT INTO edible_seeds VALUES(DEFAULT, 'Quinoa', 'Pseudocereal', 12.49, 'no');
INSERT INTO edible_seeds VALUES(DEFAULT, 'Sesame','Pseudocereal', 13.49, 'yes');
INSERT INTO edible_seeds VALUES(DEFAULT, 'Hemp', 'Other', 10.99, 'yes');
INSERT INTO edible_seeds VALUES(DEFAULT, 'Chickpea', 'Legume', 7.99, 'yes');
INSERT INTO edible_seeds VALUES(DEFAULT, 'Pea', 'Legume', 7.50, 'no');
INSERT INTO edible_seeds VALUES(DEFAULT, 'Soybean', 'Legume', 12.99, 'yes');
INSERT INTO edible_seeds VALUES(DEFAULT, 'Acorn', 'Nut', 11.99, 'yes');
INSERT INTO edible_seeds VALUES(DEFAULT, 'Almond', 'Nut', 13.99, 'yes');
INSERT INTO edible_seeds VALUES(DEFAULT, 'Beech', 'Nut', 10.94, 'yes');
INSERT INTO edible_seeds VALUES(DEFAULT, 'Chestnut', 'Nut', 13.99, 'yes');
INSERT INTO edible_seeds VALUES(DEFAULT, 'Water Chestnut', 'Nut', 9.99, 'no');
INSERT INTO edible_seeds VALUES(DEFAULT, 'Macadamia', 'Nut', 25.00, 'yes');
INSERT INTO edible_seeds VALUES(DEFAULT, 'Pistachio', 'Nut', 20.00, 'yes');
INSERT INTO edible_seeds VALUES(DEFAULT, 'Pine nuts', 'Nut-like gymnosperm', 23.00, 'yes');
INSERT INTO edible_seeds VALUES(DEFAULT, 'Pecan', 'Nut', 6.99, 'yes');
INSERT INTO edible_seeds VALUES(DEFAULT, 'Juniper berries', 'Nut-like gymnosperm', 11.99, 'yes');
INSERT INTO edible_seeds VALUES(DEFAULT, 'Cashew', 'Nut', 23.61, 'yes');
INSERT INTO edible_seeds VALUES(DEFAULT, 'Hazelnut', 'Nut', 25.49, 'yes');
INSERT INTO edible_seeds VALUES(DEFAULT, 'Sunflower seed', 'Other', 9.99 , 'yes');
INSERT INTO edible_seeds VALUES(DEFAULT, 'Poppy seed', 'Other', 12.99, 'yes');
INSERT INTO edible_seeds VALUES(DEFAULT, 'Barley', 'Cereal', 9.99, 'yes');
INSERT INTO edible_seeds VALUES(DEFAULT, 'Maize', 'Cereal', 6.98, 'yes');
INSERT INTO edible_seeds VALUES(DEFAULT, 'Oats', 'Cereal', 9.99, 'yes');
INSERT INTO edible_seeds VALUES(DEFAULT, 'Rice', 'Cereal', 7.90, 'yes');
INSERT INTO edible_seeds VALUES(DEFAULT, 'Rye', 'Cereal', 9.87, 'yes');
INSERT INTO edible_seeds VALUES(DEFAULT, 'Spelt', 'Cereal', 7.50, 'yes');
INSERT INTO edible_seeds VALUES(DEFAULT, 'Wheat berries', 'Cereal', 2.50, 'no');
INSERT INTO edible_seeds VALUES(DEFAULT, 'Buckwheat', 'Pseudocereal', 5.60, 'yes');
INSERT INTO edible_seeds VALUES(DEFAULT, 'Jackfruit', 'Other', 15.00, 'yes');
INSERT INTO edible_seeds VALUES(DEFAULT, 'Durian', 'Other', 8.26, 'no');
INSERT INTO edible_seeds VALUES(DEFAULT, 'Lotus seed', 'Other', 12.99, 'yes');
INSERT INTO edible_seeds VALUES(DEFAULT, 'Ginko', 'Nut-like gymnosperm', 12.80, 'yes');
INSERT INTO edible_seeds VALUES(DEFAULT, 'Peanut', 'Legume', 5.99, 'yes');
INSERT INTO edible_seeds VALUES(DEFAULT, 'Pumpkin seed', 'Other', 5.99, 'yes');
INSERT INTO edible_seeds VALUES(DEFAULT, 'Watermelon seed', 'Other', 6.99, 'yes');
INSERT INTO edible_seeds VALUES(DEFAULT, 'Pomegranate seed', 'Other', 27.63, 'yes');
INSERT INTO edible_seeds VALUES(DEFAULT, 'Cacao bean', 'Other', 12.99, 'yes');

CREATE TABLE flower_seeds (
  id SERIAL,
  name VARCHAR(300),
  main_color VARCHAR(100),
  seeds_per_packet INT,
  price_per_packet FLOAT,
  in_stock BOOLEAN
);

INSERT INTO flower_seeds VALUES(DEFAULT, 'Begonia Fiona Red', 'Red', 25, 4.95, 'yes');
INSERT INTO flower_seeds VALUES(DEFAULT, 'Moonflower Seeds', 'White', 25, 2.95, 'yes');
INSERT INTO flower_seeds VALUES(DEFAULT, 'Easy Wave F1 Lavender Sky Blue Petunia Seeds', 'Lavender', 10, 4.25, 'yes');
INSERT INTO flower_seeds VALUES(DEFAULT, 'Super Hero Spry Marigold Seeds', 'Marigold', 50, 2.95, 'no');
INSERT INTO flower_seeds VALUES(DEFAULT, 'Zinnia Zinderella Lilac', 'Pink', 25, 3.95, 'yes');
INSERT INTO flower_seeds VALUES(DEFAULT, 'Mini Ornamental Mint Seeds', 'Green', 10, 3.95, 'yes');
INSERT INTO flower_seeds VALUES(DEFAULT, 'Kabloom Light Pink Blast Calibrachoa', 'Green', 10, 4.95, 'yes');
INSERT INTO flower_seeds VALUES(DEFAULT, 'Calibrachoa Kabloom Coral', 'Coral', 10, 4.95, 'no');
INSERT INTO flower_seeds VALUES(DEFAULT, 'Fiesta del Sol Mexican Sunflower Seeds', 'Red', 30, 3.95, 'no');
INSERT INTO flower_seeds VALUES(DEFAULT, 'Cosmos Apricot Lemonade', 'Yellow', 25, 3.95, 'yes');
INSERT INTO flower_seeds VALUES(DEFAULT, 'Zinderella Purple Zinnia Seeds', 'Purple', 25, 3.95, 'yes');
INSERT INTO flower_seeds VALUES(DEFAULT, 'Fireball Marigold Seeds', 'Varies', 25, 3.95, 'yes');
INSERT INTO flower_seeds VALUES(DEFAULT, 'Gerbera Revolution Bicolor Red Lemon', 'Red', 10, 8.95, 'no');
INSERT INTO flower_seeds VALUES(DEFAULT, 'Paradise Island Calibrachoa Fuseables Seeds', 'Varies', 5, 6.95, 'yes');
INSERT INTO flower_seeds VALUES(DEFAULT, 'Cheyenne Spirit Coneflower Seeds', 'Varies', 15, 7.95, 'no');
INSERT INTO flower_seeds VALUES(DEFAULT, 'Leucanthemum Madonna', 'White', 25, 4.95, 'no');
INSERT INTO flower_seeds VALUES(DEFAULT, 'Zinnia Zinderella Peach', 'Peach', 25, 3.95, 'yes');
INSERT INTO flower_seeds VALUES(DEFAULT, 'Kabloom Orange Calibrachoa', 'Orange', 10, 4.95, 'yes');
INSERT INTO flower_seeds VALUES(DEFAULT, 'Fountain Blue Lobelia Seeds', 'Blue', 100, 2.50, 'yes');
INSERT INTO flower_seeds VALUES(DEFAULT, 'Envy Zinnia Seeds', 'Green', 50, 2.95, 'yes');
