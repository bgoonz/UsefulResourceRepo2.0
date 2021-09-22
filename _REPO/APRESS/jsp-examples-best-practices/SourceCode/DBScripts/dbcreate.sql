DROP TABLE IF EXISTS customer;
CREATE TABLE customer (id int not null, lname varchar(30) not null,
				fname varchar(20), age int, sex char(1),
				married char(1), children int, smoker char(1));
INSERT INTO customer VALUES 
	(1, 'Smith', 'Jane', 26, 'F', 'Y', 2, 'N');
INSERT INTO customer VALUES 
	(2, 'Doe', 'John', 47, 'M', 'N', 0, 'Y');
INSERT INTO customer VALUES 
	(3, 'Johnson', 'Michael', 36, 'M', 'Y', 0, 'N');
INSERT INTO customer VALUES 
	(4, 'Brooks', 'Susan', 24, 'F', 'N', 1, 'Y');
INSERT INTO customer VALUES 
	(5, 'Inman', 'Bernard', 34, 'M', 'N', 0, 'N');
DROP TABLE IF EXISTS product;
CREATE TABLE product (id int not null, description varchar(75),
                                base float, lt30 float, 
                                lt50 float, gt50 float,
                                m float, f float,
                                married float, children float, 
                                smoker float);
INSERT INTO product VALUES
	(1, 'Preferred Healthcare', 75.00, 1.0, 1.1, 1.3, 1.1, 1.2, 1.8, 1.4, 1.2);
INSERT INTO product VALUES
	(2, 'Premium Healthcare', 65.00, 1.0, 1.1, 1.3, 1.1, 1.2, 1.8, 1.4, 1.2);
INSERT INTO product VALUES
	(3, 'Value Healthcare', 50.00, 1.0, 1.1, 1.3, 1.1, 1.2, 1.8, 1.4, 1.2);
DROP TABLE IF EXISTS quote;
CREATE TABLE quote (id int not null, custID int not null,
				prodID int not null, premium decimal(9,2));

