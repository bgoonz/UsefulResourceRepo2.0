DROP TABLE IF EXISTS user;
CREATE TABLE user (
  uid varchar(10) not null,
  pwd varchar(10) not null,
  fname varchar(30),
  lname varchar(20)
);
INSERT INTO user VALUES
  ('apatzer', 'apress', 'Andrew', 'Patzer');
DROP TABLE IF EXISTS product;
CREATE TABLE product (
  prodid int not null,
  prodname varchar(30),
  proddesc varchar(150),
  price double(7,2)
);
INSERT INTO product VALUES
  (1, 'Yo-Yo', 'High-quality wooden yo-yo with your company name and logo imprinted on both sides.', 3.50);
INSERT INTO product VALUES
  (2, 'Slinky', 'Plastic slinky in the color of your choice with your company logo imprinted on closed slinky.', 0.75);
INSERT INTO product VALUES
  (3, 'Envelope Cutter', 'Small cutting tool for opening envelopes. Your company logo is imprinted on handle.', 1.25);
INSERT INTO product VALUES
  (4, 'Padfolio', 'Synthetic leather padfolio with company name and logo imprinted on cover.', 9.50);
INSERT INTO product VALUES
  (5, 'Fountain Pen', 'Attractive fountain pen sporting your company name on the cap.', 1.20);
INSERT INTO product VALUES
  (6, 'Keychain', 'Rubber keychain with your company name and logo imprinted in a variety of colors.', 0.50);
INSERT INTO product VALUES
  (7, 'Ruler', 'Wooden ruler with raised lettering containing your company name and logo.', 0.25);
INSERT INTO product VALUES
  (8, 'Flashlight', 'Metal flashlight in a variety of colors. Your company name and logo is imprinted on the handle.', 5.0);
