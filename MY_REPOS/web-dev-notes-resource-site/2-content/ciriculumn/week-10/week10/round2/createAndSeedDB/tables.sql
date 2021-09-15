CREATE TABLE edible_seeds (
    id Serial PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    price_per_pound FLOAT NOT NULL,
    in_stock BOOLEAN NOT NULL
);

INSERT INTO edible_seeds (name, type, price_per_pound, in_stock)
VALUES
('Chia' ,'Pseudocereal' ,6.95 ,TRUE),
('Flax' ,'Pseudocereal' ,6.90 ,TRUE),
('Amaranth' ,'Pseudocereal' ,14.99 ,TRUE),
('Quinoa' ,'Pseudocereal' ,12.49 ,FALSE)
;

CREATE TABLE flower_seeds (
    id Serial PRIMARY KEY,
    name VARCHAR(300) NOT NULL,
    main_color VARCHAR(100) NOT NULL,
    seeds_per_packet INT NOT NULL,
    price_per_packet FLOAT NOT NULL,
    in_stock BOOLEAN NOT NULL
);

INSERT INTO flower_seeds (name,main_color,seeds_per_packet,price_per_packet,in_stock)
VALUES
('Begonia Fiona Red','Red',25,4.95,TRUE),
('Moonflower Seeds','White',25,2.95,TRUE),
('Easy Wave F1 Lavender Sky Blue Petunia Seeds','Lavender',10,4.25,TRUE),
('Super Hero Spry Marigold Seeds','Marigold',50,2.95,TRUE)
;