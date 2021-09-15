DROP TABLE IF EXISTS shipping_types;
CREATE TABLE shipping_types (
  shipping_type_id int NOT NULL auto_increment,
  shipping_description varchar(30) NOT NULL,
  per_cd_cass decimal(4,2) NOT NULL,
  per_lp decimal(4,2) NOT NULL,
  per_ticket decimal(4,2) NOT NULL,
  PRIMARY KEY(shipping_type_id)
) TYPE=INNODB COMMENT='Shipping types and charges.';

DROP TABLE IF EXISTS orders;
CREATE TABLE orders (
  order_id int NOT NULL auto_increment,
  session_id varchar(50) NOT NULL,
  shipping_type_id int NOT NULL,
  order_total decimal(6,2) NOT NULL,
  order_datetime datetime NOT NULL,
  PRIMARY KEY(order_id),
  KEY shipping_type_id (shipping_type_id),
  FOREIGN KEY (shipping_type_id) REFERENCES tunein.shipping_types (shipping_type_id)
) TYPE=INNODB COMMENT='Confirmed invoices.';