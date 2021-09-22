Domain : very large set of atomic values

Atrribute : simply pairing

Tuple : orderred set of values

Relation : a relation is a set of rows.

Extent: to its values.

# RDBMS Relational Database Management System

It is not a programming language like JavaScript. JavaScript, as you well know, has control flow, with for loops and if statements. Most SQL that you write doesn't have all that. Instead, it is a declarative programming language.

```CREATE USER username WITH PASSWORD 'password';```
```CREATE DATABASE appacademy WITH OWNER appacademy;```

```psql -W -U username```
```REVOKE CONNECT ON DATABASE username FROM PUBLIC;```
```GRANT CONNECT ON DATABASE hr_data TO ada;```
```DROP DATABASE ada;```

# Data
1. VARCHAR(50)
2. TEXT
3. CHARACTER/ CHAR

1. INTEGER
2. NUMERIC
3. BIGINT
4. DOUBLE PRECISION

1. TIMESTAMP
2. DATE

# Naming a table
Names of tables should not create spaces or dashes. They should contain only lower case letters, numbers, and underscores.

Conventionally, many software developers name their database table names as the plural form of the data that it holds. More importantly, many software libraries known as ORMs (which you will cover, this week) use the plural naming convention. You should use the plural naming convention while here at App Academy.

# Writing the SQL
Creating a table with SQL has this general syntax.
```
CREATE TABLE «table name» (
  «column name» «data type»,
  «column name» «data type»,
  ...
  «column name» «data type»
);
```
Example
```
CREATE TABLE puppies (
  name VARCHAR(50) NOT NULL,
  age_yrs NUMERIC(3,1) NOT NULL,
  breed VARCHAR(100) NOT NULL,
  weight_lbs INTEGER NOT NULL,
  microchipped BOOLEAN NOT NULL DEFAULT FALSE
);
```

# Primary keys
A column that acts as a primary key cannot be NULL, so that is implied.

All databases have some way of specifying that you want to set the column to a special data type that will auto-assign and auto-increment an integer value for the column. In PostgreSQL, that special data type is called SERIAL.

Then, to specify that it is the primary key, you can do it one of two ways. The following example shows it as part of the column definition.
```
CREATE TABLE puppies (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  age_yrs NUMERIC(3,1) NOT NULL,
  breed VARCHAR(100) NOT NULL,
  weight_lbs INTEGER NOT NULL,
  microchipped BOOLEAN NOT NULL DEFAULT FALSE
);
```
Constraint syntax after the columns specifications but before the close parenthesis.
```
CREATE TABLE puppies (
  id SERIAL,
  name VARCHAR(50) NOT NULL,
  age_yrs NUMERIC(3,1) NOT NULL,
  breed VARCHAR(100) NOT NULL,
  weight_lbs INTEGER NOT NULL,
  microchipped BOOLEAN NOT NULL DEFAULT FALSE,
  PRIMARY KEY(id)
);
```

# Unique values
You can put a constraint on a column by putting UNIQUE in the column's definition. For example, here's a sample "people" table with a unique constraint on the email column.
```
CREATE TABLE people (
  id SERIAL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(250) NOT NULL UNIQUE,
  PRIMARY KEY (id)
);
```

# Refactor for data integrity - normalization
corgi, CORGI, Corgi can make database messy. Instead of having just one table, you could have two tables. One that contains the puppy information and another that contains the breed information. Then, using the magic of relational databases, you can create a relation between the two tables so that the "puppies" table will reference entries in the "breeds" table.

# Foreign key
That means that the value in the column _must exist as the value of a primary key in the table that it references. This referential integrity is the backbone of relational databases. It prevents bad data from getting put into those foreign key columns.
```
FOREIGN KEY («column name in this table»)
  REFERENCES «other table name»(«primary key column in other table»)
  ```
The breed ID is referenced from the breeds table at the ID.
```
CREATE TABLE puppies (
  id SERIAL,
  name VARCHAR(50) NOT NULL,
  age_yrs NUMERIC(3,1) NOT NULL,
  breed_id INTEGER NOT NULL,
  weight_lbs INTEGER NOT NULL,
  microchipped BOOLEAN NOT NULL DEFAULT FALSE,
  PRIMARY KEY(id),
  FOREIGN KEY (breed_id) REFERENCES breeds(id)
);
```
# Order of table declarations
If something is dependant on another table, create that table first so the main table can reference it, or else it will sa it can't find it.

Open database as another user
```psql -d recipe_box_development -U sequelize_recipe_box_app```
