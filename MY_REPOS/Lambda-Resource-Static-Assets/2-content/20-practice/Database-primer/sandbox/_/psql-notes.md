## RDBMS

That's quite an ugly acronym, but it's what developers have when referring to the software application that manages databases for us. Here's an important difference for you to understand.

The **RDBMS** is a software application that you run that your programs can connect to that they can store, modify, and retrieve data. The RDBS that you will use in this course is called [PostgreSQL](https://www.postgresql.org/), often shortened to just "postgres", pronounced like it's spelled. It is an "open-source" RDBMS which means that you can go read the source code for it, copy it, modify it, and make your own specialized version of an RDBMS. Often, developers will talk about the "database server". That is the computer on which the RDBMS is running.

A **database** (or more properly **relational database**) is a collection of structured data that the RDBMS manages for you. A single running RDBMS can have hundreds of databases in it that it manages.

## What is PostgreSQL?

Again, PostgreSQL is software. Specifically, it is an open-source, relational database management system. It is derived from the POSTGRES package written at UC Berkeley. The specific name "PostgreSQL" was coined in 1996, after SQL was implemented as its core query language. PostgreSQL provided a new program (new for 1996) for interactive SQL queries called `[psql]`, which is terminal-based front-end to PostgreSQL that lets you to type in queries interactively, issue them to PostgreSQL, and see the query results.

When you do connect with it, you will interact with it through a small set of its own commands and SQL.

## What is SQL?

SQL (pronounced "sequel" or "s-q-l") stands for "Structured Query Language". It is not a programming language like JavaScript. JavaScript, as you well know, has _control flow_, with `for` loops and `if` statements. Most SQL that you write doesn't have all that. Instead, it is a _declarative_ programming language. You tell the database what computation you want it to do, and it does it.

# SQL (Structured Query Language) in one page

<table><caption>Data Types</caption><tbody><tr><th>Data Type</th><th>Description</th></tr><tr><td>integer(size)</td><td rowspan="4">&nbsp;&nbsp;&nbsp;&nbsp;Hold integers only. The maximum number of digits are specified in parenthesis.</td></tr><tr><td>int(size)</td></tr><tr><td>smallint(size)</td></tr><tr><td>tinyint(size)</td></tr><tr><td>decimal(size,d)</td><td rowspan="2">&nbsp;&nbsp;&nbsp;&nbsp;Hold numbers with fractions. The maximum number of digits are specified in "size". The maximum number of digits to the right of the decimal is specified in "d".</td></tr><tr><td>numeric(size,d)</td></tr><tr><td>char(size)</td><td>&nbsp;&nbsp;&nbsp;&nbsp;Holds a fixed length string (can contain letters, numbers, and special characters). The fixed size is specified in parenthesis.</td></tr><tr><td>varchar(size)</td><td>&nbsp;&nbsp;&nbsp;&nbsp;Holds a variable length string (can contain letters, numbers, and special characters). The maximum size is specified in parenthesis.</td></tr><tr><td>date(yyyymmdd)</td><td>&nbsp;&nbsp;&nbsp;&nbsp;Holds a date</td></tr></tbody></table>

```
ALTER TABLE table\_name ADD column\_name datatype       Add columns in an existing table. ALTER TABLE Person ADD Sex char(6) ALTER TABLE table\_name DROP column\_name datatype       Delete columns in an existing table. ALTER TABLE Person DROP Sex char(6) DROP TABLE table\_name       Delete a table. DROP TABLE Person  Index Manipulation CREATE INDEX index\_name
ON table\_name (column\_name\_1, column\_name\_2, ...)       Create a simple index. CREATE INDEX PersonIndex
ON Person (LastName, FirstName) CREATE UNIQUE INDEX index\_name
ON table\_name (column\_name\_1, column\_name\_2, ...)       Create a unique index. CREATE UNIQUE INDEX PersonIndex
ON Person (LastName DESC) DROP INDEX table\_name.index\_name       Delete a index. DROP INDEX Person.PersonIndex  Data Manipulation INSERT INTO table\_name
VALUES (value\_1, value\_2,....)       Insert new rows into a table. INSERT INTO Persons
VALUES('Hussein', 'Saddam', 'White House') INSERT INTO table\_name (column1, column2,...)
VALUES (value\_1, value\_2,....) INSERT INTO Persons (LastName, FirstName, Address)
VALUES('Hussein', 'Saddam', 'White House') UPDATE table\_name
SET column\_name\_1 = new\_value\_1, column\_name\_2 = new\_value\_2
WHERE column\_name = some\_value       Update one or several columns in rows. UPDATE Person
SET Address = 'ups'
WHERE LastName = 'Hussein' DELETE FROM table\_name
WHERE column\_name = some\_value       Delete rows in a table. DELETE FROM Person WHERE LastName = 'Hussein' TRUNCATE TABLE table\_name       Deletes the data inside the table. TRUNCATE TABLE Person  Select SELECT column\_name(s) FROM table\_name       Select data from a table. SELECT LastName, FirstName FROM Persons SELECT \* FROM table\_name       Select all data from a table. SELECT \* FROM Persons SELECT DISTINCT column\_name(s) FROM table\_name       Select only distinct (different) data from a table. SELECT DISTINCT LastName, FirstName FROM Persons SELECT column\_name(s) FROM table\_name
WHERE column operator value
      AND column operator value
      OR column operator value
      AND (... OR ...)
      ...       Select only certain data from a table. SELECT \* FROM Persons WHERE sex='female'

```

<table><caption>Operators</caption><tbody><tr><th>Operator</th><th>Description</th></tr><tr><td>=</td><td>&nbsp;&nbsp;&nbsp;&nbsp;Equal</td></tr><tr><td>&lt;&gt;</td><td>&nbsp;&nbsp;&nbsp;&nbsp;Not equal</td></tr><tr><td>&gt;</td><td>&nbsp;&nbsp;&nbsp;&nbsp;Greater than</td></tr><tr><td>&lt;</td><td>&nbsp;&nbsp;&nbsp;&nbsp;Less than</td></tr><tr><td>&gt;=</td><td>&nbsp;&nbsp;&nbsp;&nbsp;Greater than or equal</td></tr><tr><td>&lt;=</td><td>&nbsp;&nbsp;&nbsp;&nbsp;Less than or equal</td></tr><tr><td>BETWEEN</td><td>&nbsp;&nbsp;&nbsp;&nbsp;Between an inclusive range</td></tr><tr><td>LIKE</td><td>&nbsp;&nbsp;&nbsp;&nbsp;Search for a pattern.<br>A "%" sign can be used to define wildcards (missing letters in the pattern) both before and after the pattern.</td></tr></tbody></table>

```
SELECT \* FROM Persons WHERE Year>1970 SELECT \* FROM Persons
WHERE FirstName='Saddam'
AND LastName='Hussein' SELECT \* FROM Persons
WHERE FirstName='Saddam'
OR LastName='Hussein' SELECT \* FROM Persons WHERE
(FirstName='Tove' OR FirstName='Stephen')
AND LastName='Svendson' SELECT \* FROM Persons WHERE FirstName LIKE 'O%' SELECT \* FROM Persons WHERE FirstName LIKE '%a' SELECT \* FROM Persons WHERE FirstName LIKE '%la%' SELECT column\_name(s) FROM table\_name
WHERE column\_name IN (value1, value2, ...)       The IN operator may be used if you know the exact value you want to return for at least one of the columns. SELECT \* FROM Persons
WHERE LastName IN ('Hansen','Pettersen') SELECT column\_name(s) FROM table\_name
ORDER BY row\_1, row\_2 DESC, row\_3 ASC, ...       Select data from a table with sort the rows.
```

```Note:

*   ASC (ascend) is a alphabetical and numerical order (optional)
*   DESC (descend) is a reverse alphabetical and numerical order

SELECT \* FROM Persons
ORDER BY LastName SELECT FirstName, LastName FROM Persons
ORDER BY LastName DESC SELECT Company, OrderNumber FROM Orders
ORDER BY Company DESC, OrderNumber ASC SELECT column\_1, ..., SUM(group\_column\_name)
FROM table\_name
GROUP BY group\_column\_name       GROUP BY... was added to SQL because aggregate functions (like SUM) return the aggregate of all column values every time they are called, and without the GROUP BY function it was impossible to find the sum for each individual group of column values. SELECT Company, SUM(Amount)
FROM Sales
GROUP BY Company

<table><caption>Some aggregate functions</caption><tbody><tr><th>Function</th><th>Description</th></tr><tr><td>AVG(column)</td><td>&nbsp;&nbsp;&nbsp;&nbsp;Returns the average value of a column</td></tr><tr><td>COUNT(column)</td><td>&nbsp;&nbsp;&nbsp;&nbsp;Returns the number of rows (without a NULL value) of a column</td></tr><tr><td>MAX(column)</td><td>&nbsp;&nbsp;&nbsp;&nbsp;Returns the highest value of a column</td></tr><tr><td>MIN(column)</td><td>&nbsp;&nbsp;&nbsp;&nbsp;Returns the lowest value of a column</td></tr><tr><td>SUM(column)</td><td>&nbsp;&nbsp;&nbsp;&nbsp;Returns the total sum of a column</td></tr></tbody></table>

SELECT column\_1, ..., SUM(group\_column\_name)
FROM table\_name
GROUP BY group\_column\_name
HAVING SUM(group\_column\_name) condition value       HAVING... was added to SQL because the WHERE keyword could not be used against aggregate functions (like SUM), and without HAVING... it would be impossible to test for result conditions. SELECT Company, SUM(Amount)
FROM Sales
GROUP BY Company
HAVING SUM(Amount)>10000  Alias SELECT column\_name AS column\_alias FROM table\_name Column name alias SELECT LastName AS Family, FirstName AS Name
FROM Persons SELECT table\_alias.column\_name FROM table\_name AS table\_alias Table name alias SELECT LastName, FirstName
FROM Persons AS Employees  Join SELECT column\_1\_name, column\_2\_name, ...
FROM first\_table\_name
INNER JOIN second\_table\_name
ON first\_table\_name.keyfield = second\_table\_name.foreign\_keyfield        The INNER JOIN returns all rows from both tables where there is a match. If there are rows in first table that do not have matches in second table, those rows will not be listed. SELECT Employees.Name, Orders.Product
FROM Employees
INNER JOIN Orders
ON Employees.Employee\_ID=Orders.Employee\_ID SELECT column\_1\_name, column\_2\_name, ...
FROM first\_table\_name
LEFT JOIN second\_table\_name
ON first\_table\_name.keyfield = second\_table\_name.foreign\_keyfield        The LEFT JOIN returns all the rows from the first table, even if there are no matches in the second table. If there are rows in first table that do not have matches in second table, those rows also will be listed. SELECT Employees.Name, Orders.Product
FROM Employees
LEFT JOIN Orders
ON Employees.Employee\_ID=Orders.Employee\_ID SELECT column\_1\_name, column\_2\_name, ...
FROM first\_table\_name
RIGHT JOIN second\_table\_name
ON first\_table\_name.keyfield = second\_table\_name.foreign\_keyfield        The RIGHT JOIN returns all the rows from the second table, even if there are no matches in the first table. If there had been any rows in second table that did not have matches in first table, those rows also would have been listed. SELECT Employees.Name, Orders.Product
FROM Employees
RIGHT JOIN Orders
ON Employees.Employee\_ID=Orders.Employee\_ID  UNION SQL\_Statement\_1
UNION
SQL\_Statement\_2       Select all different values from SQL\_Statement\_1 and SQL\_Statement\_2 SELECT E\_Name FROM Employees\_Norway
UNION
SELECT E\_Name FROM Employees\_USA SQL\_Statement\_1
UNION ALL
SQL\_Statement\_2       Select all values from SQL\_Statement\_1 and SQL\_Statement\_2 SELECT E\_Name FROM Employees\_Norway
UNION
SELECT E\_Name FROM Employees\_USA  SELECT INTO/IN SELECT column\_name(s)
INTO new\_table\_name
FROM source\_table\_name
WHERE query       Select data from table(S) and insert it into another table. SELECT \* INTO Persons\_backup FROM Persons SELECT column\_name(s)
IN external\_database\_name
FROM source\_table\_name
WHERE query       Select data from table(S) and insert it in another database. SELECT Persons.\* INTO Persons IN 'Backup.db' FROM Persons WHERE City='Sandnes' CREATE VIEW CREATE VIEW view\_name AS
SELECT column\_name(s)
FROM table\_name
WHERE condition       Create a virtual table based on the result-set of a SELECT statement. CREATE VIEW \[Current Product List\] AS
SELECT ProductID, ProductName
FROM Products
WHERE Discontinued=No  OTHER
```

The process of using SQL takes two steps:

1.  Connect to an RDBMS specifying
    - credentials, user name and password
    - the name of the database that you want to use
2.  Issue one or more SQL statements to interact with
    - the structure of the database
    - the data in the database

![picture 1](./../images/d6dd08f78245c1f7457c496ea32e5b77b17fc2a8833ad0e5a1cdfe80b35625cb.png)

![picture 3](./../images/3478b7ec074d124ae526af81d6bd9004aeb327e05cda3109b8e8d2c8898d464b.png)

![picture 4](./../images/b88352a2c178ba56345aa1aa703e8ef4d88c749f5e0cf79637432937d38957ed.png)

![picture 5](./../images/4e8c7f13c392a3da81b27d80c1703a846ea5bb35c9c9902802c8630483173f04.png)

![picture 6](./../images/adac702051e62b3729cfe9869845fb17a1ecc53ce86bf47cca529fc2edd1ebeb.png)

![picture 7](./../images/0ac1ccca984a5620243123d810386a9093e141eeb9a0b65cae1ce27152437f9e.png)

![picture 8](./../images/c754280a7ea24ff9b7fa20c88b4c5c0b0515be3677f0785f400bc190f8953819.png)

![picture 9](./../images/f493a0c7771e6ebb8a53908ee2a9953451d5648e9875af6f650db54b6c91471d.png)

## PSQL

CREATE DATABASE
CREATE DATABASE dbName;
CREATE TABLE (with auto numbering integer id)
CREATE TABLE tableName (
id serial PRIMARY KEY,
name varchar(50) UNIQUE NOT NULL,
dateCreated timestamp DEFAULT current_timestamp
);
Add a primary key
ALTER TABLE tableName ADD PRIMARY KEY (id);
Create an INDEX
CREATE UNIQUE INDEX indexName ON tableName (columnNames);
Backup a database (command line)
pg_dump dbName > dbName.sql
Backup all databases (command line)
pg_dumpall > pgbackup.sql
Run a SQL script (command line)
psql -f script.sql databaseName
Search using a regular expression
SELECT column FROM table WHERE column ~ 'foo._';
The first N records
SELECT columns FROM table LIMIT 10;
Pagination
SELECT cols FROM table LIMIT 10 OFFSET 30;
Prepared Statements
PREPARE preparedInsert (int, varchar) AS
INSERT INTO tableName (intColumn, charColumn) VALUES ($1, $2);
EXECUTE preparedInsert (1,'a');
EXECUTE preparedInsert (2,'b');
DEALLOCATE preparedInsert;
Create a Function
CREATE OR REPLACE FUNCTION month (timestamp) RETURNS integer
AS 'SELECT date_part(''month'', $1)::integer;'
LANGUAGE 'sql';
Table Maintenance
VACUUM ANALYZE table;
Reindex a database, table or index
REINDEX DATABASE dbName;
Show query plan
EXPLAIN SELECT _ FROM table;
Import from a file
COPY destTable FROM '/tmp/somefile';
Show all runtime parameters
SHOW ALL;
Grant all permissions to a user
GRANT ALL PRIVILEGES ON table TO username;
Perform a transaction
BEGIN TRANSACTION
UPDATE accounts SET balance += 50 WHERE id = 1;
COMMIT;
Basic SQL

Get all columns and rows from a table
SELECT \* FROM table;
Add a new row
INSERT INTO table (column1,column2)
VALUES (1, 'one');
Update a row
UPDATE table SET foo = 'bar' WHERE id = 1;
Delete a row
DELETE FROM table WHERE id = 1;

Magic words:

```bash
psql -U postgres
```

Some interesting flags (to see all, use `-h` or `--help` depending on your psql version):

- `-E`: will describe the underlaying queries of the `\` commands (cool for learning!)
- `-l`: psql will list all databases and then exit (useful if the user you connect with doesn't has a default database, like at AWS RDS)

Most `\d` commands support additional param of `__schema__.name__` and accept wildcards like `*.*`

- `\q`: Quit/Exit
- `\c __database__`: Connect to a database
- `\d __table__`: Show table definition (columns, etc.) including triggers
- `\d+ __table__`: More detailed table definition including description and physical disk size
- `\l`: List databases
- `\dy`: List events
- `\df`: List functions
- `\di`: List indexes
- `\dn`: List schemas
- `\dt *.*`: List tables from all schemas (if `*.*` is omitted will only show SEARCH_PATH ones)
- `\dT+`: List all data types
- `\dv`: List views
- `\dx`: List all extensions installed
- `\df+ __function__` : Show function SQL code.
- `\x`: Pretty-format query results instead of the not-so-useful ASCII tables
- `\copy (SELECT * FROM __table_name__) TO 'file_path_and_name.csv' WITH CSV`: Export a table as CSV
- `\des+`: List all foreign servers
- `\dE[S+]`: List all foreign tables

User Related:

- `\du`: List users
- `\du __username__`: List a username if present.
- `create role __test1__`: Create a role with an existing username.
- `create role __test2__ noinherit login password __passsword__;`: Create a role with username and password.
- `set role __test__;`: Change role for current session to `__test__`.
- `grant __test2__ to __test1__;`: Allow `__test1__` to set its role as `__test2__`.
- `\deu+`: List all user mapping on server

## Configuration

- Service management commands:

```
sudo service postgresql stop
sudo service postgresql start
sudo service postgresql restart
```

- Changing verbosity & querying Postgres log:
  <br/>1) First edit the config file, set a decent verbosity, save and restart postgres:

```
sudo vim /etc/postgresql/9.3/main/postgresql.conf

# Uncomment/Change inside:
log_min_messages = debug5
log_min_error_statement = debug5
log_min_duration_statement = -1

sudo service postgresql restart
```

2. Now you will get tons of details of every statement, error, and even background tasks like VACUUMs

```
tail -f /var/log/postgresql/postgresql-9.3-main.log
```

3. How to add user who executed a PG statement to log (editing `postgresql.conf`):

```
log_line_prefix = '%t %u %d %a '
```

## Create command

There are many `CREATE` choices, like `CREATE DATABASE __database_name__`, `CREATE TABLE __table_name__` ... Parameters differ but can be checked [at the official documentation](https://www.postgresql.org/search/?u=%2Fdocs%2F9.1%2F&q=CREATE).

## Handy queries

- `SELECT * FROM pg_proc WHERE proname='__procedurename__'`: List procedure/function
- `SELECT * FROM pg_views WHERE viewname='__viewname__';`: List view (including the definition)
- `SELECT pg_size_pretty(pg_total_relation_size('__table_name__'));`: Show DB table space in use
- `SELECT pg_size_pretty(pg_database_size('__database_name__'));`: Show DB space in use
- `show statement_timeout;`: Show current user's statement timeout
- `SELECT * FROM pg_indexes WHERE tablename='__table_name__' AND schemaname='__schema_name__';`: Show table indexes
- Get all indexes from all tables of a schema:

```sql
SELECT
   t.relname AS table_name,
   i.relname AS index_name,
   a.attname AS column_name
FROM
   pg_class t,
   pg_class i,
   pg_index ix,
   pg_attribute a,
    pg_namespace n
WHERE
   t.oid = ix.indrelid
   AND i.oid = ix.indexrelid
   AND a.attrelid = t.oid
   AND a.attnum = ANY(ix.indkey)
   AND t.relnamespace = n.oid
    AND n.nspname = 'kartones'
ORDER BY
   t.relname,
   i.relname
```

- Execution data:
  - Queries being executed at a certain DB:

```sql
SELECT datname, application_name, pid, backend_start, query_start, state_change, state, query
  FROM pg_stat_activity
  WHERE datname='__database_name__';
```

- Get all queries from all dbs waiting for data (might be hung):

```sql
SELECT * FROM pg_stat_activity WHERE waiting='t'
```

- Currently running queries with process pid:

```sql
SELECT pg_stat_get_backend_pid(s.backendid) AS procpid,
  pg_stat_get_backend_activity(s.backendid) AS current_query
FROM (SELECT pg_stat_get_backend_idset() AS backendid) AS s;
```

Casting:

- `CAST (column AS type)` or `column::type`
- `'__table_name__'::regclass::oid`: Get oid having a table name

Query analysis:

- `EXPLAIN __query__`: see the query plan for the given query
- `EXPLAIN ANALYZE __query__`: see and execute the query plan for the given query
- `ANALYZE [__table__]`: collect statistics

Generating random data ([source](https://www.citusdata.com/blog/2019/07/17/postgres-tips-for-average-and-power-user/)):

- `INSERT INTO some_table (a_float_value) SELECT random() * 100000 FROM generate_series(1, 1000000) i;`

![picture 1](./../images/10c39b09e6a7df30eeb73d33c1711ad6884315c7c368b6c74478725ae486a23d.png)

![picture 2](./../images/03ab52c85dfafd6033e75ae6b4c3156403f0e65b997edb00fbe7be4fe61d22fa.png)

## Forign keys are what make databases relational...they reference atable and column in another table.

![picture 3](./../images/ddfd524fb7f3da3fc3c44ccbef9a74fa7c5e0e1700ff97e4aaec52beb89ce1df.png)

```bash


\___________________________________________________
bryan_dir:~_exitstatus:0 ====>

sudo vim /etc/postgresql/12/main/postgresql.conf
[sudo] password for bryan:

\___________________________________________________
bryan_dir:~_exitstatus:0 ====>

sudo service postgresql status
12/main (port 5432): down

\___________________________________________________
bryan_dir:~_exitstatus:3 ====>

sudo service postgresql stop
* Stopping PostgreSQL 12 database server                                                                                       [ OK ]

\___________________________________________________
bryan_dir:~_exitstatus:0 ====>

sudo service postgresql start
* Starting PostgreSQL 12 database server                                                                                       [ OK ]

\___________________________________________________
bryan_dir:~_exitstatus:0 ====>

sudo -u postgres psql
psql (12.5 (Ubuntu 12.5-0ubuntu0.20.04.1))
Type "help" for help.

postgres=# ALTER USER bryan SUPERUSER;
ERROR:  role "bryan" does not exist
postgres=# ALTER USER postgres SUPERUSER;
ALTER ROLE
postgres=# ALTER USER postgres WITH ENCRYPTED PASSWORD 'password'
postgres-#

bryan_dir:~_exitstatus:0 ====>

sudo service postgresql start
* Starting PostgreSQL 12 database server                                                                                       [ OK ]

\___________________________________________________
bryan_dir:~_exitstatus:0 ====>

sudo -u postgres psql
psql (12.5 (Ubuntu 12.5-0ubuntu0.20.04.1))
Type "help" for help.

postgres=# CREATE USER test_superuser
postgres-# WITH
postgres-# PASSWORD
postgres-# 'test'
postgres-# SUPERUSER;
CREATE ROLE
postgres=# CREATE USER test_superuser
postgres-# WITH
postgres-# PASSWORD 'test'
postgres-# SUPERUSER;
ERROR:  role "test_superuser" already exists
postgres=# \q

\___________________________________________________
bryan_dir:~_exitstatus:0 ====>
```

> Now type the following command to connect to PostgreSQL with the newly-created user. It instructs the client to connect as the user "test_superuser" (-U test_superuser) to the database named "postgres" (postgres) and prompt for the password (-W) for the user.

```bash
bryan_dir:~_exitstatus:0 ====>

psql -W -U test_superuser postgres
Password:
psql: error: FATAL:  password authentication failed for user "test_superuser"
FATAL:  password authentication failed for user "test_superuser"

\___________________________________________________
bryan_dir:~_exitstatus:2 ====>

psql -W -U test_superuser postgres
Password:
psql (12.5 (Ubuntu 12.5-0ubuntu0.20.04.1))
SSL connection (protocol: TLSv1.3, cipher: TLS_AES_256_GCM_SHA384, bits: 256, compression: off)
Type "help" for help.

postgres=#


psql -W -U test_superuser postgres
Password:
psql (12.5 (Ubuntu 12.5-0ubuntu0.20.04.1))
SSL connection (protocol: TLSv1.3, cipher: TLS_AES_256_GCM_SHA384, bits: 256, compression: off)
Type "help" for help.

postgres=# SELECT CURRENT_USER;
  current_user
----------------
 test_superuser
(1 row)

postgres=#


 test_superuser
(1 row)

postgres=# CREATE USER test_normal_user
postgres-# WITH
postgres-# PASSWORD 'test'
postgres-# ;
CREATE ROLE
postgres=# \q

\___________________________________________________
bryan_dir:~_exitstatus:0 ====>

psql -U test_normal_user -W postgres
Password:
psql: error: FATAL:  password authentication failed for user "test_normal_user"
FATAL:  password authentication failed for user "test_normal_user"

\___________________________________________________
bryan_dir:~_exitstatus:2 ====>

psql -U test_normal_user -W postgres
Password:
psql (12.5 (Ubuntu 12.5-0ubuntu0.20.04.1))
SSL connection (protocol: TLSv1.3, cipher: TLS_AES_256_GCM_SHA384, bits: 256, compression: off)
Type "help" for help.

postgres=> SELECT CURRENT_USER;
   current_user
------------------
 test_normal_user
(1 row)

postgres=> CREATE USER hacking_the_planet WITH PASSWORD 'pwned';
ERROR:  permission denied to create role
postgres=>



```

---

---

# D2 TUESDAY

---

---

# Retrieving Rows From A Table Using SELECT

In the first reading, we covered SQL and PostgreSQL and how to set up
PostgreSQL. In this reading, we're going to learn how to write a simple SQL
query using SELECT.

## What is a query?

SQL stands for _Structured Query Language_, and whenever we write
SQL we're usually querying a database. A query is simply a question we're
asking a database, and we're aiming to get a response back. The response comes
back to us as a list of table rows.

## Example table

Let's say we had the following database table called `puppies`. We'll use this
table to make our queries:

_**puppies table**_

| name     | age_yrs | breed               | weight_lbs | microchipped |
| -------- | ------- | ------------------- | ---------- | ------------ |
| Cooper   | 1       | Miniature Schnauzer | 18         | yes          |
| Indie    | 0.5     | Yorkshire Terrier   | 13         | yes          |
| Kota     | 0.7     | Australian Shepherd | 26         | no           |
| Zoe      | 0.8     | Korean Jindo        | 32         | yes          |
| Charley  | 1.5     | Basset Hound        | 25         | no           |
| Ladybird | 0.6     | Labradoodle         | 20         | yes          |
| Callie   | 0.9     | Corgi               | 16         | no           |
| Jaxson   | 0.4     | Beagle              | 19         | yes          |
| Leinni   | 1       | Miniature Schnauzer | 25         | yes          |
| Max      | 1.6     | German Shepherd     | 65         | no           |

## Using psql in the terminal

As we covered in the first reading, psql allows us to access the PostgreSQL
server and make queries via the terminal. Open up the terminal on your machine,
and connect to the PostgreSQL server by using the following psql command:

```shell
psql -U postgres
```

The above command lets you access the PostgreSQL server as the user 'postgres'
(`-U` stands for user). After you enter this command, you'll be prompted for the
password that you set for the 'postgres' user during installation. Type it in,
and hit Enter. Once you've successfully logged in, you should see the following
in the terminal:

```shell
Password for user postgres:
psql (11.5, server 11.6)
Type "help" for help.

postgres=#
```

You can exit psql at anytime with the command `\q`, and you can log back in with
`psql -U postgres`. (_See this [Postgres Cheatsheet][1] for a list of more PSQL commands._)

We'll use the following PostgreSQL to create the `puppies` table above. After
you've logged into the psql server, type the following code and hit Enter.

_**puppies.sql**_

```sql
create table puppies (
  name VARCHAR(100),
  age_yrs NUMERIC(2,1),
  breed VARCHAR(100),
  weight_lbs INT,
  microchipped BOOLEAN
);

insert into puppies
values
('Cooper', 1, 'Miniature Schnauzer', 18, 'yes');

insert into puppies
values
('Indie', 0.5, 'Yorkshire Terrier', 13, 'yes'),
('Kota', 0.7, 'Australian Shepherd', 26, 'no'),
('Zoe', 0.8, 'Korean Jindo', 32, 'yes'),
('Charley', 1.5, 'Basset Hound', 25, 'no'),
('Ladybird', 0.6, 'Labradoodle', 20, 'yes'),
('Callie', 0.9, 'Corgi', 16, 'no'),
('Jaxson', 0.4, 'Beagle', 19, 'yes'),
('Leinni', 1, 'Miniature Schnauzer', 25, 'yes' ),
('Max', 1.6, 'German Shepherd', 65, 'no');
```

In the above SQL, we created a new table called `puppies`, and we gave it the
following columns: `name`, `age_yrs`, `breed`, `weight_lbs`, and `microchipped`.
We filled the table with ten rows containing data for each puppy, by using
`insert into puppies values ()`.

We used the following [PostgreSQL data types][2]: `VARCHAR`, `NUMERIC`, `INT`,
and `BOOLEAN`.

- `VARCHAR(n)` is a variable-length character string that lets you store up to
  _n_ characters. Here we've set the character limit to 100 for the `name` and
  `breed` columns.
- `NUMERIC(p,s)` is a floating-point number with _p_ digits and _s_ number of
  places after the decimal point. Here we've set the values for the `age_yrs`
  column to up to two digits before the decimal and one place after the decimal.
- `INT` is a 4-byte integer, which we've set on the `weight_lbs` column.
- `BOOLEAN` is, of course, a Boolean value. We've set the `microchipped` column
  to accept Boolean values. SQL accepts the standard Boolean values `true`,
  `false`, or `null`. However, you'll note that we've used `yes` and `no` in our
  `microchipped` column because [PostgreSQL Booleans][3] can be any of the
  following values:

| TRUE   | FALSE   |
| ------ | ------- |
| true   | false   |
| 't'    | 'f'     |
| 'true' | 'false' |
| 'yes'  | 'no'    |
| 'y'    | 'n'     |
| '1'    | '0'     |

## Simple SELECT Query

We can write a simple [SELECT query][4] to get results back from the table
above. The syntax for the SELECT query is `SELECT [columns] FROM [table]`.

### SELECT all rows

Using `SELECT *` is a quick way to get back all the rows in a given table. It
is discouraged in queries that you write for your applications. Use it only when
playing around with data, not for production code.

```sql
SELECT *
FROM   puppies;
```

Type the query above into your psql terminal, and make sure to add a semicolon
at the end, which terminates the statement. `SELECT` and `FROM` should be
capitalized. The above query should give us back the entire `puppies` table:

| name     | age_yrs | breed               | weight_lbs | microchipped |
| -------- | ------- | ------------------- | ---------- | ------------ |
| Cooper   | 1       | Miniature Schnauzer | 18         | yes          |
| Indie    | 0.5     | Yorkshire Terrier   | 13         | yes          |
| Kota     | 0.7     | Australian Shepherd | 26         | no           |
| Zoe      | 0.8     | Korean Jindo        | 32         | yes          |
| Charley  | 1.5     | Basset Hound        | 25         | no           |
| Ladybird | 0.6     | Labradoodle         | 20         | yes          |
| Callie   | 0.9     | Corgi               | 16         | no           |
| Jaxson   | 0.4     | Beagle              | 19         | yes          |
| Leinni   | 1       | Miniature Schnauzer | 25         | yes          |
| Max      | 1.6     | German Shepherd     | 65         | no           |

### SELECT by column

We can see all the rows in a given column by using `SELECT [column name]`.

```sql
SELECT name
FROM   puppies;
```

Type the query above into your psql terminal, and make sure to add a semicolon
at the end, which terminates the statement. `SELECT` and `FROM` should be
capitalized. The above query should give us back the following:

| name     |
| -------- |
| Cooper   |
| Indie    |
| Kota     |
| Zoe      |
| Charley  |
| Ladybird |
| Callie   |
| Jaxson   |
| Leinni   |
| Max      |

### SELECT multiple columns

To see multiple columns, we can concatenate the column names by using commas
between column names.

```sql
SELECT name
     , age_yrs
     , weight_lbs
FROM   puppies;
```

Type the query above into your psql terminal, and make sure to add a semicolon
at the end, which terminates the statement. `SELECT` and `FROM` should be
capitalized. The above query should give us back the following:

| name     | age_yrs | weight_lbs |
| -------- | ------- | ---------- |
| Cooper   | 1       | 18         |
| Indie    | 0.5     | 13         |
| Kota     | 0.7     | 26         |
| Zoe      | 0.8     | 32         |
| Charley  | 1.5     | 25         |
| Ladybird | 0.6     | 20         |
| Callie   | 0.9     | 16         |
| Jaxson   | 0.4     | 19         |
| Leinni   | 1       | 25         |
| Max      | 1.6     | 65         |

## Formatting SELECT statements

This is another of those hot-button topics with software developers. Some people
like to put all the stuff on one line for each SQL keyword.

```sql
SELECT name, age_yrs, weight_lbs
FROM   puppies;
```

That works for short lists. But some tables have hundreds of columns. That gets
long.

Some developers like what you saw earlier, the "each column name on its own line
with the comma at the front".

```sql
SELECT name
     , age_yrs
     , weight_lbs
FROM   puppies;
```

They like this because if they need to comment out a column name, they can just
put a couple of dashes at the beginning of the line.

```sql
SELECT name
--     , age_yrs
     , weight_lbs
FROM   puppies;
```

Some developers just do a word wrap when lines get too long.

All of these are fine. Just stay consistent within a project how you do them.

---

# Selecting Table Rows Using WHERE And Common Operators

In the last reading, we learned how to create a simple SQL query using SELECT.
In this reading, we'll be adding a [WHERE clause][1] to our SELECT statement to
further filter a database table and get specific rows back.

## Using SELECT and WHERE

Previously, we covered how to use SELECT queries to fetch all of a table's rows
or specified table rows by column(s). We can filter information returned by our query by using a WHERE clause in our SELECT statement.

Let's look at some examples of adding a WHERE clause using our `puppies` table
from before:

| name     | age_yrs | breed               | weight_lbs | microchipped |
| -------- | ------- | ------------------- | ---------- | ------------ |
| Cooper   | 1       | Miniature Schnauzer | 18         | yes          |
| Indie    | 0.5     | Yorkshire Terrier   | 13         | yes          |
| Kota     | 0.7     | Australian Shepherd | 26         | no           |
| Zoe      | 0.8     | Korean Jindo        | 32         | yes          |
| Charley  | 1.5     | Basset Hound        | 25         | no           |
| Ladybird | 0.6     | Labradoodle         | 20         | yes          |
| Callie   | 0.9     | Corgi               | 16         | no           |
| Jaxson   | 0.4     | Beagle              | 19         | yes          |
| Leinni   | 1       | Miniature Schnauzer | 25         | yes          |
| Max      | 1.6     | German Shepherd     | 65         | no           |

### WHERE clause for a single value

The simplest WHERE clause finds a row by a single column value. See the example
below, which finds the rows where the breed equals 'Corgi':

```shell
SELECT name, breed FROM puppies
  WHERE breed = 'Corgi';
```

`SELECT`, `FROM`, and `WHERE` are capitalized. Notice that the string must use
single quotation marks. _Note: PostgreSQL converts all names of tables, columns,
functions, etc. to lowercase unless they're double quoted._ For example:
`create table Foo()` will create a table called `foo`, and `create table "Bar"()` will create a table called `Bar`. If you use double quotation marks in
the query above, you'll get an error that says `column "Corgi" does not exist`
because it thinks you're searching for the capitalized column name `Corgi`.

Use the command `psql -U postgres` in the terminal, and type in your 'postgres'
user password to connect to the PostgreSQL server. You should have a puppies
table in your postgres database from the last reading. Once you're in psql,
enter the query above into the terminal and press Enter. You should get back one
result for Callie the Corgi.

```shell
  name  | breed
--------+-------
 Callie | Corgi
```

### WHERE clause for a list of values

We can also add a WHERE clause to check for a list of values. The syntax is
`WHERE [column] IN ('value1', 'value2', 'value3')`. Let's say we wanted to find
the name and breed of the puppies who are Corgis, Beagles, or Yorkshire
Terriers. We could do so with the query below:

```shell
SELECT name, breed FROM puppies
  WHERE breed IN ('Corgi', 'Beagle', 'Yorkshire Terrier');
```

Entering this query into psql should yield the following results:

```shell
  name  |       breed
--------+-------------------
 Indie  | Yorkshire Terrier
 Callie | Corgi
 Jaxson | Beagle
```

### WHERE clause for a range of values

In addition to checking for string values, we can use the WHERE clause to check
for a range of numeric/integer values. This time, let's find the name, breed,
and age of the puppies who are between 0 to 6 months old.

```shell
SELECT name, breed, age_yrs FROM puppies
  WHERE age_yrs BETWEEN 0 AND 0.6;
```

Entering this query into psql should yield the following results:

```shell
   name   |       breed       | age_yrs
----------+-------------------+---------
 Indie    | Yorkshire Terrier |     0.5
 Ladybird | Labradoodle       |     0.6
 Jaxson   | Beagle            |     0.4
```

## ORDER BY

Getting the values back from a database in any order it wants to give them to
you is ludicrous. Instead, you will often want to specify the order in which
you get them back. Say you wanted them in alphabetical order by their name.
Then, you would write

```sql
SELECT name, breed
FROM puppies
ORDER BY name;
```

Say you wanted that returned from oldest dog to youngest dog. You would write

```sql
SELECT name, breed
FROM puppies
ORDER BY age_yrs DESC;
```

where `DESC` means in descending order. Note that the column that you order on
does not have to appear in the column list of the `SELECT` statement.

## LIMIT and OFFSET

Say your query would return one million rows because you've cataloged every
puppy in the world. That would be a lot for any application to handle. Instead,
you may want to limit the number of rows returned. You can do that with the
`LIMIT` keyword.

```sql
SELECT name, breed
FROM puppies
ORDER BY age_yrs
LIMIT 100;
```

That would return the name and breed of the 100 youngest puppies. (Why?) That
is, of the million rows that the statement would find, it _limits_ the number to
only 100.

Let's say you want to see the _next_ 100 puppies after the first hundred. You
can do that with the `OFFSET` keyword which comes after the `LIMIT` clause.

```sql
SELECT name, breed
FROM puppies
ORDER BY age_yrs
LIMIT 100 OFFSET 100;
```

That will return only rows 101 - 200 of the result set. It _limits_ the total
number of records to return to 100. Then, it starts at the 100th row and counts
100 records. Those are the records returned.

## SQL operators

A SQL operator is a word or character that is used inside a WHERE clause to
perform comparisons or arithmetic operations. In the three examples above, we
used SQL operators inside of WHERE clauses to filter table rows -- `=`, `IN`,
`BETWEEN`, and `AND`.

The following is a listing of SQL operators. We can combine any of these
operators in our query or use a single operator by itself.

### Logical operators

| Operator | Description                                                   |
| -------- | ------------------------------------------------------------- |
| ALL      | TRUE if all of the subquery values meet the condition.        |
| AND      | TRUE if all the conditions separated by AND are TRUE.         |
| ANY      | TRUE if any of the subquery values meet the condition.        |
| BETWEEN  | TRUE if the operand is within the range of comparisons.       |
| EXISTS   | TRUE if the subquery returns one or more records.             |
| IN       | TRUE if the operand is equal to one of a list of expressions. |
| LIKE     | TRUE if the operand matches a pattern (accepts "wildcards").  |
| NOT      | Displays a record if the condition(s) is NOT TRUE.            |
| OR       | TRUE if any of the conditions separated by OR is TRUE.        |
| SOME     | TRUE if any of the subquery values meet the condition.        |

Here is another example query with a WHERE clause using several logical
operators: `NOT`, `IN`, `AND`, and `LIKE`.

```shell
SELECT name, breed FROM puppies
  WHERE breed NOT IN ('Miniature Schnauzer', 'Basset Hound', 'Labradoodle')
    AND breed NOT LIKE '%Shepherd';
```

**Note**: Pay attention to that `LIKE` operator. You will use it more than you
want to. The wildcard it uses is the percent sign. Here's a table to help you
understand.

| `LIKE`    | Matches "dog" | Matches "hotdog" | Matches "dog-tired" | Matches "ordogordo" |
| --------- | ------------- | ---------------- | ------------------- | ------------------- |
| `'dog'`   | yes           | no               | no                  | no                  |
| `'%dog'`  | yes           | yes              | no                  | no                  |
| `'dog%'`  | yes           | no               | yes                 | no                  |
| `'%dog%'` | yes           | yes              | yes                 | yes                 |

Entering this query into psql should yield the following results:

```shell
  name  |       breed
--------+-------------------
 Indie  | Yorkshire Terrier
 Zoe    | Korean Jindo
 Callie | Corgi
 Jaxson | Beagle
```

With the query above, we filtered out six puppies: two Miniature Schnauzers, one
Basset Hound, one Labradoodle, and two Shepherds. We started with ten puppies in
the table, so we're left with four table rows. There are two puppies who are
Shepherd breeds: an Australian Shepherd and a German Shepherd. We used the
`LIKE` operator to filter these. In `'%Shepherd`, the `%` matches any substring
value before the substring 'Shepherd'.

### Arithmetic operators

| Operator | Meaning                     | Syntax |
| -------- | --------------------------- | ------ |
| +        | Addition                    | a + b  |
| -        | Subtraction                 | a - b  |
| \*       | Multiplication              | a \* b |
| /        | Division                    | a / b  |
| %        | Modulus (returns remainder) | a % b  |

Here is an example query with a WHERE clause using the multiplication operator
to find puppies that are 6 months old:

```shell
SELECT name, breed, age_yrs FROM puppies
  WHERE age_yrs * 10 = 6;
```

Entering the above query into psql will yield one result:

```shell
   name   |    breed    | age_yrs
----------+-------------+---------
 Ladybird | Labradoodle |     0.6
```

### Comparison operators

| Operator | Meaning                  | Syntax |
| -------- | ------------------------ | ------ |
| =        | Equals                   | a = b  |
| !=       | Not equal to             | a != b |
| <>       | Not equal to             | a <> b |
| >        | Greater than             | a > b  |
| <        | Less than                | a < b  |
| >=       | Greater than or equal to | a >= b |
| <=       | Less than or equal to    | a <= b |
| !<       | Not less than            | a !< b |
| !>       | Not greater than         | a !> b |

Here is an example query with a WHERE clause using the `>` comparison operator:

```shell
SELECT name, breed, weight_lbs FROM puppies
  WHERE weight_lbs > 50;
```

Entering the above query into psql will yield one result:

```shell
 name |      breed      | weight_lbs
------+-----------------+------------
 Max  | German Shepherd |         65
```

---

# Inserting Data Into A Table

---

If you have data, but it's not in tables, does the data even exist? Not to an
app! We often need to create relational databases on the back end of the Web
apps we're building so that we can ultimately display this data on the front
end of our application. All relational database data is stored in tables, so
it's important to learn how to create tables and successfully query them.

Of the four data manipulation statements, `INSERT` is the easiest.

Create a new database named "folks". Now, create a new table named "friends"
with the following column specifications.

| Name       | Data type      | Constraints   |
| ---------- | -------------- | ------------- |
| id         | `SERIAL`       | `PRIMARY KEY` |
| first_name | `VARCHAR(255)` | `NOT NULL`    |
| last_name  | `VARCHAR(255)` | `NOT NULL`    |

Now that we have a new table, we need to add table rows with some data. We can
insert a new table row using the following syntax:

```shell
INSERT INTO table_name
VALUES
  (column1_value, colum2_value, column3_value);
```

Let's fill out our "friends" table with information about five friends. In
psql, enter the following to add new table rows. _Note the use of single
quotation marks for string values. Also note that, since we used the [`SERIAL`
pseudo-type][1] to auto-increment the ID values, we can simply write `DEFAULT`
for the ID values when inserting new table rows._

```shell
INSERT INTO friends (id, first_name, last_name)
VALUES
  (DEFAULT, 'Amy', 'Pond');
```

You can also completely omit the `DEFAULT` keyword if you specify the names of
the columns that you want to insert into.

You can also use the "multiple values" insert. This prevents you from having to
write `INSERT` with every statement. Even better, if one fails, they all fail.
That can help protect your data integrity.

```
INSERT INTO friends (first_name, last_name)
VALUES
('Rose', 'Tyler'),
('Martha', 'Jones'),
('Donna', 'Noble'),
('River', 'Song');
```

Use `SELECT * FROM friends;` to verify that there are rows in the "friends"
table:

```shell
appacademy=# SELECT * FROM friends;
 id | first_name | last_name
----+------------+-----------
  1 | Amy        | Pond
  2 | Rose       | Tyler
  3 | Martha     | Jones
  4 | Donna      | Noble
  5 | River      | Song
```

Now let's try to insert a new row using the ID of 5:

```shell
INSERT INTO friends (id, first_name, last_name)
VALUES (5, 'Jenny', 'Who');
```

Because ID is a primary key and that ID is already taken, we should get a
message in psql that it already exists:

```shell
appacademy=# insert into friends values (5, 'Jenny', 'Who');
ERROR:  duplicate key value violates unique constraint "friends_pkey"
DETAIL:  Key (id)=(5) already exists.
```

---

# Foreign Keys And The JOIN Operation

In relational databases, _relationships_ are key. We can create relationships,
or _associations_, among tables so that they can access and share data. In a
SQL database, we create table associations through _foreign keys_ and _primary
keys_.

You've learned about primary and foreign keys. Now, it's time to put them to
use.

## Setting up the database

Create a new database called "learn_joins". Connect to that database. Run the
following SQL statements to create tables and the data in them.

```sql
CREATE TABLE breeds (
  id SERIAL,
  name VARCHAR(50) NOT NULL,
  PRIMARY KEY (id)
);
```

```sql
INSERT INTO breeds (name)
VALUES
('Australian Shepherd'),
('Basset Hound'),
('Beagle'),
('Corgi'),
('German Shepherd'),
('Korean Jindo'),
('Labradoodle'),
('Miniature Schnauzer'),
('Yorkshire Terrier');
```

```sql
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

```sql
INSERT INTO puppies (name, age_yrs, breed_id, weight_lbs, microchipped)
VALUES
('Cooper', 1, 8, 18, true),
('Indie', 0.5, 9, 13, true),
('Kota', 0.7, 1, 26, false),
('Zoe', 0.8, 6, 32, true),
('Charley', 1.5, 2, 25, false),
('Ladybird', 0.6, 7, 20, true),
('Callie', 0.9, 4, 16, false),
('Jaxson', 0.4, 3, 19, true),
('Leinni', 1, 8, 25, true),
('Max', 1.6, 5, 65, false);
```

## Using JOIN to retrieve rows from multiple tables

Now that we've set up an association between the "puppies" table and the
"friends" table, we can access data from both tables. We can do so by using a
[JOIN operation][3] in our SELECT query. Type the following into psql:

```sql
SELECT * FROM puppies
INNER JOIN breeds ON (puppies.breed_id = breeds.id);
```

The `JOIN` operation above is joining the "puppies" table with the "breeds"
table together into a single table using the foreign key/primary key shared
between the two tables: `breed_id`.

You should get all rows back containing all information for the puppies and
breeds with matching `breed_id` values:

```sql
postgres=# SELECT * FROM puppies
postgres-# INNER JOIN breeds ON (puppies.breed_id = breeds.id);
 id |   name   | age_yrs | breed_id | weight_lbs | microchipped | id |        name
----+----------+---------+----------+------------+--------------+----+---------------------
  1 | Cooper   |     1.0 |        8 |         18 | t            |  8 | Miniature Schnauzer
  2 | Indie    |     0.5 |        9 |         13 | t            |  9 | Yorkshire Terrier
  3 | Kota     |     0.7 |        1 |         26 | f            |  1 | Australian Shepherd
  4 | Zoe      |     0.8 |        6 |         32 | t            |  6 | Korean Jindo
  5 | Charley  |     1.5 |        2 |         25 | f            |  2 | Basset Hound
  6 | Ladybird |     0.6 |        7 |         20 | t            |  7 | Labradoodle
  7 | Callie   |     0.9 |        4 |         16 | f            |  4 | Corgi
  8 | Jaxson   |     0.4 |        3 |         19 | t            |  3 | Beagle
  9 | Leinni   |     1.0 |        8 |         25 | t            |  8 | Miniature Schnauzer
 10 | Max      |     1.6 |        5 |         65 | f            |  5 | German Shepherd
(10 rows)
```

We could make our query more specific by selecting specific columns, adding a
`WHERE` clause, or doing any number of operations that we could do in a normal
`SELECT` query. Aside from an `INNER JOIN`, we could also do different types of
`JOIN` operations. (Refer to this overview on [PostgreSQL JOINS][4] for more
information.)

## Helpful links:

- [PostgreSQL Docs: Constraints][1]
- [PostgreSQL Docs: Data Types > Numeric Types][2]
- [PostgreSQL Docs: Joins Between Tables][3]
- [PostgreSQL Tutorial: PostgreSQL Joins][4]

[1]: https://www.postgresql.org/docs/9.2/ddl-constraints.html
[2]: https://www.postgresql.org/docs/10/datatype-numeric.html
[3]: https://www.postgresql.org/docs/8.3/tutorial-join.html
[4]: http://www.postgresqltutorial.com/postgresql-joins/

---

# Writing And Running A Seed File In PSQL

After a database is created, we need to populate it, or _seed_ it, with data.
Until now, we've used the command-line psql interface to create tables and
insert rows into those tables. While that's fine for small datasets, it would
be cumbersome to add a large dataset using the command line.

In this reading, we'll learn how to create and run a seed file, which makes the
process of populating a database with test data much easier.

## Creating a seed file

You can create a seed file by opening up VSCode or any text editor and saving a
file with the `.sql` extension.

Let's create a seed file called `seed-data.sql` that's going to create a new
table called `pies` and insert 50 pie rows into the table. Use the code below
to create the seed file, and make sure to save your seed file on your machine.

_**seed-data.sql**_

```sql
CREATE TABLE pies (
  flavor VARCHAR(255) PRIMARY KEY,
  price FLOAT
);

INSERT INTO pies VALUES('Apple', 19.95);
INSERT INTO pies VALUES('Caramel Apple Crumble', 20.53);
INSERT INTO pies VALUES('Blueberry', 19.31);
INSERT INTO pies VALUES('Blackberry', 22.86);
INSERT INTO pies VALUES('Cherry', 22.32);
INSERT INTO pies VALUES('Peach', 20.45);
INSERT INTO pies VALUES('Raspberry', 20.99);
INSERT INTO pies VALUES('Mixed Berry', 21.45);
INSERT INTO pies VALUES('Strawberry Rhubarb', 24.81);
INSERT INTO pies VALUES('Banana Cream', 18.66);
INSERT INTO pies VALUES('Boston Toffee', 25.00);
INSERT INTO pies VALUES('Banana Nutella', 22.12);
INSERT INTO pies VALUES('Bananas Foster', 24.99);
INSERT INTO pies VALUES('Boston Cream', 23.75);
INSERT INTO pies VALUES('Cookies and Cream', 18.27);
INSERT INTO pies VALUES('Coconut Cream', 22.89);
INSERT INTO pies VALUES('Chess', 25.00);
INSERT INTO pies VALUES('Lemon Chess', 25.00);
INSERT INTO pies VALUES('Key Lime', 19.34);
INSERT INTO pies VALUES('Lemon Meringue', 19.58);
INSERT INTO pies VALUES('Guava', 18.92);
INSERT INTO pies VALUES('Mango', 19.55);
INSERT INTO pies VALUES('Plum', 20.21);
INSERT INTO pies VALUES('Apricot', 20.55);
INSERT INTO pies VALUES('Gooseberry', 23.54);
INSERT INTO pies VALUES('Lingonberry', 24.35);
INSERT INTO pies VALUES('Pear Vanilla Butterscotch', 25.13);
INSERT INTO pies VALUES('Baked Alaska', 25.71);
INSERT INTO pies VALUES('Chocolate', 19.00);
INSERT INTO pies VALUES('Chocolate Mousse', 21.46);
INSERT INTO pies VALUES('Mexican Chocolate', 28.33);
INSERT INTO pies VALUES('Chocolate Caramel', 26.67);
INSERT INTO pies VALUES('Chocolate Chip Cookie Dough', 18.65);
INSERT INTO pies VALUES('Pecan', 26.33);
INSERT INTO pies VALUES('Bourbon Caramel Pecan', 27.88);
INSERT INTO pies VALUES('Chocolate Pecan', 27.63);
INSERT INTO pies VALUES('Pumpkin', 20.91);
INSERT INTO pies VALUES('Sweet Potato', 20.75);
INSERT INTO pies VALUES('Purple Sweet Potato', 26.34);
INSERT INTO pies VALUES('Cheesecake', 28.99);
INSERT INTO pies VALUES('Butterscotch Praline', 29.78);
INSERT INTO pies VALUES('Salted Caramel', 30.32);
INSERT INTO pies VALUES('Salted Honey', 59.00);
INSERT INTO pies VALUES('Sugar Cream', 33.89);
INSERT INTO pies VALUES('Mississippi Mud', 28.67);
INSERT INTO pies VALUES('Turtle Fudge', 30.58);
INSERT INTO pies VALUES('Fruit Loops', 20.45);
INSERT INTO pies VALUES('Black Forest', 34.99);
INSERT INTO pies VALUES('Maple Cream', 35.88);
INSERT INTO pies VALUES('Smores', 26.43);
INSERT INTO pies VALUES('Milk Bar', 46.00);

SELECT * FROM pies;
```

## Populating a database via < ("left caret")

Now that you have a seed file, you can insert it into a database with a
simple command.

Create a database named "bakery".

The syntax is `psql -d [database] < [path_to_file/file.sql]`. The left caret
(`<`) takes the standard input from the file on the right (your seed file) and
inputs it into the program on the left (`psql`).

Open up your terminal, and enter the following command. Make sure to replace
`path_to_my_file` with the actual file path.

```shell
psql -d bakery < path_to_my_file/seed-data.sql
```

In the terminal, you should see a bunch of `INSERT` statements and the entire
"pies" table printed out (from the `SELECT *` query in the seed file).

You can log into psql and use `\dt` to verify that your new table has been
added to the database:

```shell
postgres=# \dt
List of relations
 Schema |     Name     | Type  |  Owner
 public | breeds       | table | appacademy
 public | pies         | table | appacademy
 public | puppies      | table | appacademy
```

## Populating the database via | ("pipe")

You could also use the "pipe" (`|`) to populate the database with your seed
file.

The syntax is `cat [path_to_file/file.sql] | psql -d [database]`. 'cat' is a
standard Unix utility that reads files sequentially, writing them to standard
output. The "pipe" (`|`) takes the standard output of the command on the left
and pipes it as standard input to the command on the right.

Try out this method in your terminal. If you have an existing "pies" table,
you'll need to drop this table before you can add it again:

```sql
DROP TABLE pies;
```

Then, enter the following. Make sure to replace `path_to_my_file` with the
actual file path.

```shell
cat path_to_my_file/seed-data.sql | psql -d postgres
```

Again, you should see a bunch of `INSERT` statements and the entire "pies"
table printed out (from the `SELECT *` query in the seed file).

You can log into psql and use `\dt` to verify that your new table has been
added to the database:

```shell
postgres=# \dt
List of relations
 Schema |     Name     | Type  |  Owner
 public | friends      | table | postgres
 public | pies         | table | postgres
 public | puppies      | table | postgres
```

![](./D2/my/postgresql-cheat-sheet.png)

![picture 1](../images/d27c1165ce9a18c7212e61174c3fbd006e14707443024269dbe80103c601ee5c.png)

![picture 1](../images/d4e79fffbd3f93e4c728b7541fa8cef4c84b43adb012e61fb85abdd4abdbd954.png)

## --password

#### ---> master password for pgAdmin

![picture 2](../images/f6655c62ad8c0047f35a0738707f0e5dee44215cc75abf92cac548c27015cdba.png)

Host name : postgreSQL12
port:5432
:username postgres
password: password
username:

![picture 4](../images/85dfcbf7bc3a70a1a77e931ec39edc28307d6f9ba629ecedecc178cd32635ff7.png)

---

---

# Wednesday

---

---

1. Connect to PostgreSQL database

---

The following command [connects to a database](https://www.postgresqltutorial.com/postgresql-jdbc/connecting-to-postgresql-database/) under a specific user. After pressing `Enter` PostgreSQL will ask for the password of the user.

`psql -d database -U user -W`

For example, to connect to `dvdrental` database under `postgres` user, you use the following command:

`C:\Program Files\PostgreSQL\9.5\bin>psql -d dvdrental -U postgres -W Password for user postgres: dvdrental=`

If you want to connect to a database that resides on another host, you add the -h option as follows:

`psql -h host -d database -U user -W`

In case you want to use SSL mode for the connection, just specify it as shown in the following command:

`psql -U user -h host "dbname=db sslmode=require"`

2. Switch connection to a new database

---

Once you are connected to a database, you can switch the connection to a new database under a user specified by `user`. The previous connection will be closed. If you omit the `user` parameter, the current `user` is assumed.

The following command connects to `dvdrental` database under `postgres` user:

`postgres= You are now connected to database "dvdrental" as user "postgres". dvdrental=`

3. List available databases

---

To [list all databases](https://www.postgresqltutorial.com/postgresql-show-databases/) in the current PostgreSQL database server, you use `\l` command:

4. List available tables

---

To [list all tables](https://www.postgresqltutorial.com/postgresql-show-tables/) in the current database, you use `\dt` command:

Note that this command shows the only table in the currently connected database.

5. Describe a table

---

To [describe a table](https://www.postgresqltutorial.com/postgresql-describe-table/) such as a column, type, modifiers of columns, etc., you use the following command:

6. List available schema

---

To list all [schemas](https://www.postgresqltutorial.com/postgresql-schema/) of the currently connected database, you use the `\dn` command.

7. List available functions

---

To list available functions in the current database, you use the `\df` command.

8. List available views

---

To list available [views](https://www.postgresqltutorial.com/postgresql-views/) in the current database, you use the `\dv` command.

9. List users and their roles

---

To list all users and their assign roles, you use `\du` command:

10. Execute the previous command

---

To retrieve the current version of PostgreSQL server, you use the `version()` function as follows:

Now, you want to save time typing the previous command again, you can use `\g` command to execute the previous command:

psql executes the previous command again, which is the [SELECT statement](https://www.postgresqltutorial.com/postgresql-select/),.

11. Command history

---

To display command history, you use the `\s` command.

If you want to save the command history to a file, you need to specify the file name followed the `\s` command as follows:

12. Execute psql commands from a file

---

In case you want to execute psql commands from a file, you use `\i` command as follows:

13. Get help on psql commands

---

To know all available psql commands, you use the `\?` command.

To get help on specific PostgreSQL statement, you use the `\h` command.

For example, if you want to know detailed information on [ALTER TABLE](https://www.postgresqltutorial.com/postgresql-alter-table/) statement, you use the following command:

14. Turn on query execution time

---

To turn on query execution time, you use the `\timing` command.

`dvdrental=
Timing is on.
dvdrental=
count

1000
(1 row)

Time: 1.495 ms
dvdrental=`

You use the same command `\timing` to turn it off.

`dvdrental= Timing is off. dvdrental=`

15. Edit command in your own editor

---

It is very handy if you can type the command in your favorite editor. To do this in psql, you `\e` command. After issuing the command, psql will open the text editor defined by your EDITOR environment variable and place the most recent command that you entered in psql into the editor.

![psql commands](https://sp.postgresqltutorial.com/wp-content/uploads/2015/07/psql-commands.jpg)

After you type the command in the editor, save it, and close the editor, psql will execute the command and return the result.

![psql command example](https://sp.postgresqltutorial.com/wp-content/uploads/2015/07/psql-command-example.jpg)

It is more useful when you edit a function in the editor.

![psql commadn ef edit function](https://sp.postgresqltutorial.com/wp-content/uploads/2015/07/psql-command-ef-edit-function.jpg)

16. Switch output options

---

psql supports some types of output format and allows you to customize how the output is formatted on the fly.

- `\a` command switches from aligned to non-aligned column output.
- `\H` command formats the output to HTML format.

17. Quit psql

---

To quit psql, you use `\q` command and press `enter` to exit psql.

# Learing Objectives

---

---

# Databases, SQL, and Sequelize (Week 10) - Learning Objectives

## Assessment Structure

- 2 hours, 55 minutes
- Mixture of multiple choice (5-10), free response (1-3) and VSCode problems (40ish specs).
  - Free response just requires enough detail to answer the question, 1-3 sentences. As long as you are able to explain the concept and answer all aspects that it asks, you are good.
  - Coding problems come in two varieties:
    - Writing raw SQL like the projects from Tuesday to create tables, insert values, query for records, join tables for queries, etc.
    - Using sequelize to perform actions such as creating migrations, models, seeders, and then interacting with those models to query for, create, modify, delete, etc.
    - Both of these sections have their own practice assessment
- Standard assessment procedures
  - You will be in an individual breakout room
  - Use a single monitor and share your screen
  - Only have open those resources needed to complete the assessment:
    - Zoom
    - VSCode
    - Browser with AAO and Progress Tracker (to ask questions)
    - Approved Resources for this assessment:
      - Postgres Docs: https://www.postgresql.org/docs/
      - Sequelize Docs: https://sequelize.org/
      - Sequelize "Cheatsheet"

## Portfolio Quality, RDBMS and Database Entitities (W10D1) - Learning Objectives

### Portfolio Quality (Not directly assessed)

1. Recall the items recruiters are most interested in

- Professionalism and good design (described below)
- Would you be able to tell that this wasn't done by a professional dev?

2. Explain aspects of a good looking Web application

- Padding and Margin
  - Padding on every element allows for content that does not butt up against edges
  - Margins on every element allow for elements that do not butt up against each other
  - Balance your whitespace: be consistent and even across your page
- Use a color palette to ensure a consistent theme and avoid clashes.
  - You'll typicaly want a main and secondary color with an accent color or two used sparingly
  - There are many sites and applications that can help you in choosing these colors, use those resources if you aren't as confident in this design aspect! (I like https://coolors.co/ personally!)
- Use fonts that pair well
  - In general, if using multiple fonts, try to keep it to two that pair well. More fonts can look inconsistent and messy.
  - The [Google Fonts page](https://fonts.google.com/) has a section for common pairings which can be helpful to see what other developers and designers have commonly used together.
- Use font size, weight, and spacing to make your page easy for your user to parse
  - Large, bold headers, smaller subheaders, and smaller bodies allow the user to easily scan your pages and pick up the highlights.
  - With these variances, still try to be consistent. Having ten different font sizes is generally more confusing for a user than having just two or three.
  - Breaking up large blocks into multiple smaller lines/sections is easier for a user to digest.
- Accessibility should be a goal for any application's design. One easy check is to see if your color choices pass accessibility [contrast requirements](https://webaim.org/resources/contrastchecker/), allowing users with a variety of visual disabilities to enjoy your product.
- Use modern styles and CSS features. These can include things like:
  - Rounding the corners of buttons and modals
  - Applying CSS transitions when elements appear on or disappear from the page
  - Using shadows to make elements stand out
  - Making sure page elements feel interactive, such as changing background colors or cursors on hover
  - etc.

3. Identify App Academy's expectations of your projects for after you graduate

- There are some core features that should be part of each of your projects that you use in your portfolio.
- These features allow for recruiters to easily navigate your site and provide a base level of functionality and professionalism.
  - Have plenty of seed data. Make your project look as though it is an actively used application. The barebones functionality is not as impressive if someone looking at it cannot imagine what it would actually look like in practice.
  - Have a favicon. The little icon in your browser's tab is an easy way to show your attention to detail and make your page stand out.
  - Provide a demo login. Recruiters generally will not want to have to use their own credentials to create an account on your site. A button to simulate a demo user logging in is an easy way for them to see the application and gives you an opportunity to seed your site with more content for the user to interact with.
  - Remove any console output. Logging the internal state of the application may be helpful during your development, but when it is time to showcase your work a clean console free of logs and error messages is a sign of professionalism.
  - Include personal links. The intent of these projects is for recruiters and other developers to see them, be impressed, and want to have you join their team. Include your personal links such as GitHub, LinkedIn, a personal portfolio site, etc., so that they can take the next step and connect with you!
  - Include a scorecard! We'll get more into the specifics of this process as we start producing projects, but scorecards are a way for App Academy to be able to provide you feedback on your projects. It's an easy format for you to be able to see ways that you could improve the project and for instructors and career coaches to be able to provide that feedback. This will only be seen by you and the a/A team, but it'll help you get your project in its most presentable form!

4. Practice good code hygiene when making projects live

- Making your application as polished as possible means developers (and potential future coworkers) will want to take a look at how you got it working. This means we should try to make our code as presentable as our actual applications!
- Use comments! Describe what you are actually implementing. Explain what a function does. If a particularly tricky bit of logic is being used, explain what is actually happening. A concise explanation can make complicated code easy to understand.
- Use standard naming conventions. A descriptive variable name in an identifiable convention can be extremely helpful in reading code.
- Indent your code! Opening up a new block of code should result in an indent.
- Break up large chunks of code into smaller functions. Remember that your functions should be performing single tasks. Can you create a couple of helper functions so that your code makes more sense?

### RDBMS and Database Entities

1. Define what a relational database management system is

- RDBMS stands for Relational Database Management System
- A software application that you run that your programs can connect to so that they can store, modify, and retrieve data.
- An RDBMS can track many databases. We will use PostgreSQL, or "postgres", primarily for our RDBMS and it will be able to create individual databases for each of our projects.

2. Describe what relational data is

- In general, relational data is information that is connected to other pieces of information.
- When working with relational databases, we can connect two entries together utilizing foreign keys (explained below).
- In a pets database, we could be keeping track of dogs and cats as well as the toys that each of them own. That "ownership" of a cat to a toy is the "relational" aspect of relational data. Two pieces of information that can be connected together to show some sort of meaning.

3. Define what a database is

- The actual location that data is stored.
- A database can be made up of many tables that each store specific kinds of information.
- We could have a pets database that stores information about many different types of animals. Each animal type could potentially be represented by a different table.

4. Define what a database table is

- Within a database, a table stores one specific kind of information.
- The records (entries) on these tables can be connected to records on other tables through the use of foreign keys
- In our pets database, we could have a `dogs` table, with individual records

5. Describe the purpose of a primary key

- A primary key is used in the database as a unique identifier for the table.
- We often use an "id" field that simply increments with each entry. The incrementing ensures that each record has a unique identifier, even if their are other fields of the record that are repeated (two people with the same name would still need to have a unique identifier, for example).
- With a unique identifier, we can easily connect records within the table to records from other tables.

6. Describe the purpose of a foreign key

- A foreign key is used as the connector from this record to the primary key of another table's record.
- In our pets example, we can imagine two tables to demonstrate: a table to represent cats and a table to represent toys. Each of these tables has a primary key of "id" that is used as the unique identifier. In order to make a connection between a toy and a cat, we can add another field to the cat table called "owner_id", indicating that it is a foreign key for the cat table. By setting a toy's "owner_id" to the same value as a particular cat's "id", we can indicate that the cat is the owner of that toy.

7. Describe how to properly name things in PostgreSQL

- Names within postgres should generally consist of only lowercase letters, numbers, and underscores.
- Tables within a database are plural by convention, so a table for cats would typically be "cats" and office locations would be "office_locations" (all lowercase, underscores to replace spaces, plural)

8. Install and configure PostgreSQL 12, its client tools, and a GUI client for it named Postbird

- macOS: https://open.appacademy.io/learn/js-py---aug-2020-online/week-10-aug-2020-online/installing-postgresql-on-macos
- Ubuntu: The section starting with "Installing PostgreSQL Client Tools on Ubuntu": https://open.appacademy.io/learn/js-py---aug-2020-online/week-10-aug-2020-online/installing-postgresql-on-windows
  - Additional resource: https://help.ubuntu.com/community/PostgreSQL
- WSL2: https://github.com/appacademy-starters/postgres-docker
- WSL1: https://open.appacademy.io/learn/js-py---aug-2020-online/week-10-aug-2020-online/installing-postgresql-on-windows

9. Connect to an instance of PostgreSQL with the command line tool psql

- The `psql` command by default will try to connect to a database and username that matches your system's username
- We connect to a different database by providing an argument to the psql command
  - `psql pets`
- To connect with a different username we can use the `-U` flag followed by the username we would like to use. To connect to the `pets` database as `pets_user`
  - `psql -U pets_user pets`
- If there is a password for the user, we can tell psql that we would like a prompt for the password to show up by using the `-W` flag.
  - `psql -U pets_user -W pets` (the order of our flags doesn't matter, as long as any arguments associated with them are together, such as `pets_user` directly following `-U` in this example)

10. Identify whether a user is a normal user or a superuser by the prompt in the psql shell

- You can tell if you are logged in as a superuser or normal user by the prompt in the terminal.
- If the prompt shows `=>`, the user is a normal user
- If the prompt show `=#`, the user is a superuser

11. Create a user for the relational database management system

- Within psql, we can create a user with the `CREATE USER {username} {WITH options}` command.
- The most common options we'll want to use are `WITH PASSWORD 'mypassword'` to provide a password for the user we are creating, `CREATEDB` to allow the user to create new databases, or `SUPERUSER` to create a user with all elevated permissions.

12. Create a database in the database management system

- We can use the command `CREATE DATABASE {database name} {options}` inside psql to create a new database.
- A popular option we may utilize is `WITH OWNER {owner name}` to set another user as the owner of the database we are making.

13. Configure a database so that only the owner (and superusers) can connect to it

- We can `GRANT` and `REVOKE` privileges from a database to users or categories of users.
- In order to remove connection privileges to a database from the public we can use `REVOKE CONNECT ON DATABASE {db_name} FROM PUBLIC;`, removing all public connection access.
- If we wanted to grant it back, or to a specific user, we could similarly do `GRANT CONNECT ON DATABASE {db_name} FROM {specific user, PUBLIC, etc.};`

14. View a list of databases in an installation of PostgreSQL

- To list all databases we can use the `\l` or `\list` command in psql.

15. Create tables in a database

```sql
CREATE TABLE {table name} (
  {columnA} {typeA},
  {columnB} {typeB},
  etc...
);
```

- The whitespace does not matter. Creating the SQL statements on multiple lines is easier to read, but just like JavaScript, they can be presented differently.
- One common issue is that SQL does not like trailing commas, so the last column cannot have a comma after its type in this example.

16. View a list of tables in a database

- To list all database tables, use the `\dt` command.

17. Identify and describe the common data types used in PostgreSQL

- There are many different data types that we can use in our tables, here are some common examples:
  - `SERIAL`: autoincrementing, very useful for IDs
  - `VARCHAR(n)`: a string with a character limit of `n`
  - `TEXT`: doesn't have character limit, but less performant
  - `BOOLEAN`: true/false
  - `SMALLINT`: signed two-byte integer (-32768 to 32767)
  - `INTEGER`: signed four-byte integer (standard)
  - `BIGINT`: signed eight-byte integer (very large numbers)
  - `NUMERIC`: or `DECIMAL`, can store exact decimal values
  - `TIMESTAMP`: date and time

18. Describe the purpose of the UNIQUE and NOT NULL constraints, and create columns in database tables that have them

- In addition to the data type, we can provide flags for constraints to place on our column data.
- The `UNIQUE` flag indicates that the data for the column must not be repeated.
- By default we can create entries in our tables that are missing data from columns. When creating a pet, maybe we don't provide an age because we don't know it, for example. If we want to require that the data be present in order to create a new record, we can indicate that column must be `NOT NULL`.
- In the example below, we are requiring our pets to have unique names and for them to be present (both UNIQUE and NOT NULL). We have no such constraints on the age column, allowing repetition of ages or their complete absence.

```sql
CREATE TABLE pets (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  age SMALLINT
);
```

19. Create a primary key for a table

- When creating a table we can indicate the primary key by passing in the column name to parentheses like so:

```sql
CREATE TABLE people (
  id SERIAL,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  PRIMARY KEY (id)
);
```

- We could have also used the `PRIMARY KEY` flag on the column definition itself:

```sql
CREATE TABLE people (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50),
  last_name VARCHAR(50)
);
```

20. Create foreign key constraints to relate tables

- In our table definition, we can use the line `FOREIGN KEY (foreign_key_stored_in_this_table) REFERENCE {other table} ({other_tables_key_name})` to connect two tables.
- This is probably easier to see in an example:

```sql
CREATE TABLE people (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50),
  last_name VARCHAR(50)
);

CREATE TABLE pets (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  age SMALLINT,
  person_id INTEGER,
  FOREIGN KEY (person_id) REFERENCES people (id)
);
```

21. Explain that SQL is not case sensitive for its keywords but is for its entity names

- Exactly as the LO states, `CREATE TABLE` and `create table` are interpreted the same way. Using capitalization is a good convention in order to distinguish your keywords.
- The entity names that we use ARE case-sensitive, however. So a table named `pets` is unique from a table named `Pets`. In general, we prefer to use all lowercase for our entities to avoid any of this confusion.

## SQL (W10D2) - Learning Objectives

### SQL

1. How to use the `SELECT ... FROM ...` statement to select data from a single table

- Supply the column names in the `SELECT` clause. If we want all columns, we can also use `*`
- Supply the table names in the `FROM` clause

```sql
-- Selects all columns from the friends table
SELECT
  *
FROM
  friends;

-- Selects the first_name column from the friends table (remember whitespace is ignored)
SELECT name
FROM friends;
```

- Sometimes we may need to specify what table we are selecting a column from, particulurly if we had joined multiple tables together.

```sql
-- Notice here we are indicating that we want the "name" field from the "friends" table as well as the "name" field from the "puppies" table. We indicate the table name by table.column
-- We are also aliasing these fields with the AS keyword so that our returned results have friend_name and puppy_name as field headers
SELECT
  friends.name AS friend_name , puppies.name AS puppy_name
FROM
  friends
JOIN
  puppies ON friends.puppy_id = puppies.id
```

2. How to use the `WHERE` clause on `SELECT`, `UPDATE`, and `DELETE` statements to narrow the scope of the command

- The `WHERE` clause allows us to select or apply actions to records that match specific criteria instead of to a whole table.
- We can use `WHERE` with a couple of different operators when making our comparison

  - `WHERE {column} = {value}` provides an exact comparison
  - `WHERE {column} IN ({value1}, {value2}, {value3}, etc.)` matches any provided value in the `IN` statement. We can make this more complex by having a subquery inside of the parentheses, having our column match any values within the returned results.
  - `WHERE {column} BETWEEN {value1} AND {value2}` can check for matches between two values (numeric ranges)
  - `WHERE {column} LIKE {pattern}` can check for matches to a string. This is most useful when we use the wildcard `%`, such as `WHERE breed LIKE '%Shepherd'`, which will match any breed that ends in "Shepherd"
  - The `NOT` operator can also be used for negation in the checks.
  - Mathematical operators can be used when performing calculations or comparisons within a query as well, such as

  ```sql
  SELECT name, breed, weight_lbs FROM puppies
  WHERE weight_lbs > 50;

  -- OR

  SELECT name, breed, age_yrs FROM puppies
  WHERE age_yrs * 10 = 5;
  ```

3. How to use the `JOIN` keyword to join two (or more) tables together into a single virtual table

- When we want to get information from a related table or do querying based on related table values, we can join the connected table by comparing the foreign key to where it lines up on the other table:

```sql
-- Here we are joining the puppies table on to the friends table. We are specifying that the comparison we should make is the foreign key puppy_id on the friends table should line up with the primary key id on the puppies table.
SELECT
  *
FROM
  friends
JOIN
  puppies ON friends.puppy_id = puppies.id
```

4. How to use the `INSERT` statement to insert data into a table

- When a table is already created we can then insert records into it using the `INSERT INTO` keywords.
- We provide the name of the table that we would like to add records to, followed by the `VALUES` keyword and each record we are adding. Here's an example:

```sql
-- We are providing the table name, then multiple records to insert
-- The values are listed in the order that they are defined on the table
INSERT INTO table_name
VALUES
  (column1_value, colum2_value, column3_value),
  (column1_value, colum2_value, column3_value),
  (column1_value, colum2_value, column3_value);
```

- We can also specify columns when we are inserting data. This makes it clear which fields we are providing data for and allows us to provide them out of order, skip null or default values, etc.

```sql
-- In this example, we want to use the default value for id since it is autoincremented, so we provide DEFAULT for this field
INSERT INTO friends (id, first_name, last_name)
VALUES
  (DEFAULT, 'Amy', 'Pond');

-- Alternatively, we can leave it out completely, since the default value will be used if none is provided
INSERT INTO friends (first_name, last_name)
VALUES
  ('Rose', 'Tyler'),
  ('Martha', 'Jones'),
  ('Donna', 'Noble'),
  ('River', 'Song');
```

5. How to use an `UPDATE` statement to update data in a table

- The `UPDATE` keyword can be used to find records and change their values in our database.
- We generally follow the pattern of `UPDATE {table} SET {column} = {new value} WHERE {match condition};`.
- Without a condition to narrow our records down, we will update every record in the table, so this is an important thing to double check!
- We can update multiple fields as well by specifying each column in parentheses and their associated new values: `UPDATE {table} SET ({column1}, {column2}) = ({value1}, {value2}) WHERE {match condition};`

```sql
-- Updates the pet with id of 4 to change their name and breed
UPDATE
  pets
SET
  (name, breed) = ('Floofy', 'Fluffy Dog Breed') WHERE id = 4;
```

6. How to use a `DELETE` statement to remove data from a table

- Similar to selecting records, we can delete records from a table by specifying what table we are deleting from and what criteria we would like to match in order to delete.
- We follow the general structure `DELETE FROM {table} WHERE {condition};`
- The condition here is also very important! Without a condition, all records match and will be deleted.

```sql
-- Deletes from the pets table any record that either has a name Floofy, a name Doggo, or an id of 3.
DELETE FROM
  pets
WHERE
  name IN ('Floofy', 'Doggo') OR id = 3;
```

7. How to use a seed file to populate data in a database

- Seed files are a great way for us to create records that we want to start our database out with.
- Instead of having to individually add records to our tables or manually entering them in psql or postbird, we can create a file that has all of these records and then just pass this file to psql to run.
- Seed files are also great if we ever need to reset our database. We can clear out any records that we have by dropping all of our tables, then just run our seed files to get it into a predetermined starting point. This is great for our personal projects, testing environments, starting values for new tables we create, etc.
- There are two main ways we can use a seed file with psql, the `<` and the `|` operators. They perform the same function for us, just in slightly different orders, taking the content of a .sql file and executing in within the psql environment:
  - `psql -d {database} < {sql filepath}`
  - `cat {sql filepath} | psql -d {database}`

## SQL (continued) (W10D3) - Learning Objectives

### SQL (continued)

1. How to perform relational database design

- Steps to Designing the Database:
  - Define the entities. What data are are you storing, what are the fields for each entity?
    - You can think of this in similar ways to OOP (object oriented programming).
    - If you wanted to model this information using classes, what classes would you make? Those are generally going to be the tables that are created in your database.
    - The attributes of your classes are generally going to be the fields/columns that we need for each table.
  - Identify primary keys. Most of the time these will be ids that you can generate as a serial field, incrementing with each addition to the database.
  - Establish table relationships. Connect related data together with foreign keys. Know how we store these keys in a one-to-one, one-to-many, or many-to-many relationship.
    - With a one-to-one or one-to-many relationship, we are able to use a foreign key on the table to indicate the other specific record that it is connected to.
    - With a many-to-many relationship, each record could be connected to multiple records, so we have to create a join table to connect these entities. A record on this join table connects a record from one table to a record from another table.
      ![one-to-one](./oto-relationship.svg)
      ![one-to-many many-to-many](./otm-and-mtm-relationships.svg)

2. How to use transactions to group multiple SQL commands into one succeed or fail operation

- We can define an explicit transaction using `BEGIN` and ending with either `COMMIT` or `ROLLBACK`.
- If any command inside the block fails, everything will be rolled back. We can also specify that we want to roll back at the end of the block instead of committing. We saw that this can be useful when analyzing operations that would manipulate our database.

```sql
BEGIN;
  UPDATE accounts SET balance = balance - 100.00
      WHERE name = 'Alice';
  UPDATE branches SET balance = balance - 100.00
      WHERE name = (SELECT branch_name FROM accounts WHERE name = 'Alice');
  UPDATE accounts SET balance = balance + 100.00
      WHERE name = 'Bob';
  UPDATE branches SET balance = balance + 100.00
      WHERE name = (SELECT branch_name FROM accounts WHERE name = 'Bob');
COMMIT;
```

```sql
BEGIN;
  EXPLAIN ANALYZE
  UPDATE cities
  SET city = 'New York City'
  WHERE city = 'New York';
ROLLBACK;
```

3. How to apply indexes to tables to improve performance

- An index can help optimize queries that we have to run regularly. If we are constantly looking up records in a table by a particular field (such as username or phone number), we can add an index in order to speed up this process.
- An index maintains a sorted version of the field with a reference to the record that it points to in the table (via primary key). If we want to find a record based on a field that we have an index for, we can look through this index in a more efficient manner than having to scan through the entire table (generally O(log n) since the index is sorted, instead of O(n) for a sequential scan).
- To add an index to a field we can use the following syntax:

```sql
CREATE INDEX index_name ON table_name (column_name);
```

- To drop an index we can do the following:

```sql
DROP INDEX index_name
```

- Making an index is not always the best approach. Indices allow for faster lookup, but slow down record insertion and the updating of associated fields, since we not only have to add the information to the table, but also manipulate the index.
  - We generally wouldn't care about adding an index if:
    - The tables are small
    - We are updating the table frequently, especially the associated columns
    - The column has many NULL values

4. Explain what and why someone would use EXPLAIN

- EXPLAIN gives us information about how a query will run (the query plan)
- It gives us an idea of how our database will search for data as well as a qualitative comparitor for how expensive that operation will be. Comparing the cost of two queries will tell us which one is more efficient (lower cost).
- We can also use the ANALYZE command with EXPLAIN, which will actually run the specified query. Doing so gives us more detailed information, such as the milliseconds it took our query to execute as well as specifics like the exact number of rows filtered and returned.

5. Demonstrate how to install and use the node-postgres library and its Pool class to query a PostgreSQL-managed database

- We can add the `node-postgres` library to our application with `npm install pg`. From there we will typically use the Pool class associated with this library. That way we can run many SQL queries with one database connection (as opposed to Client, which closes the connection after a query).

```javascript
const { Pool } = require("pg");

// If we need to specify a username, password, or database, we can do so when we create a Pool instance, otherwise the default values for logging in to psql are used:
const pool = new Pool({
  username: "<<username>>",
  password: "<<password>>",
  database: "<<database>>",
});
```

- The `query` method on the Pool instance will allow us to execute a SQL query on our database. We can pass in a string that represents the query we want to run

```javascript
const allAirportsSql = `
  SELECT id, city_id, faa_id, name
  FROM airports;
`;

async function selectAllAirports() {
  const results = await pool.query(allAirportsSql);
  console.log(results.rows);
  pool.end(); // invoking end() will close our connection to the database
}

selectAllAirports();
```

- The return value of this asynchronous function is an object with a `rows` key that points to an array of objects, each object representing a record with field names as keys.

6. Explain how to write prepared statements with placeholders for parameters of the form "$1", "$2", and so on

- The prepared statement (SQL string that we wrote) can also be made more dynamic by allowing for parameters to be passed in.
- The Pool instance's `query` function allows us to pass a second argument, an array of parameters to be used in the query string. The location of the parameter substitutions are designated with `$1`, `$2`, etc., to signify the first, second, etc., arguments.

```javascript
const airportsByNameSql = `
  SELECT name, faa_id
  FROM airports
  WHERE UPPER(name) LIKE UPPER($1)
`;

async function selectAirportsByName(name) {
  const results = await pool.query(airportsByNameSql, [`%${name}%`]);
  console.log(results.rows);
  pool.end(); // invoking end() will close our connection to the database
}

// Get the airport name from the command line and store it
// in the variable "name". Pass that value to the
// selectAirportsByName function.
const name = process.argv[2];
// console.log(name);
selectAirportsByName(name);
```

## ORM (W10D4) - Learning Objectives

### ORM

1. How to install, configure, and use Sequelize, an ORM for JavaScript

- To start a new project we use our standard npm initialize statement
  - `npm init -y`
- Add in the packages we will need (sequelize, sequelize-cli, and pg)
  - `npm install sequelize@^5.0.0 sequelize-cli@^5.0.0 pg@^8.0.0`
- Initialize sequelize in our project
  - `npx sequelize-cli init`
- Create a database user with credentials we will use for the project
  - `psql`
  - `CREATE USER example_user WITH PASSWORD 'badpassword'`
- Here we can also create databases since we are already in postgres
  - `CREATE DATABASE example_app_development WITH OWNER example_user`
  - `CREATE DATABASE example_app_test WITH OWNER example_user`
  - `CREATE DATABASE example_app_production WITH OWNER example_user`
- If we don't create these databases now, we could also create them after we make our changes to our config file. If we take this approach, we need to make sure our user that we created has the `CREATEDB` option when we make them, since sequelize will attempt to make the databases with this user. This other approach would look like:
  - In psql: `CREATE USER example_user WITH PASSWORD 'badpassword' CREATEDB`
  - In terminal: `npx sequelize-cli db:create`
- Double check that our configuration file matches our username, password, database, dialect, and seederStorage (these will be filled out for you in an assessment scenario):

```json
{
  "development": {
    "username": "sequelize_recipe_box_app",
    "password": "HfKfK79k",
    "database": "recipe_box_development",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "seederStorage": "sequelize"
  },
  "test": {
    "username": "sequelize_recipe_box_app",
    "password": "HfKfK79k",
    "database": "recipe_box_test",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "seederStorage": "sequelize"
  },
  "production": {
    "username": "sequelize_recipe_box_app",
    "password": "HfKfK79k",
    "database": "recipe_box_production",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "seederStorage": "sequelize"
  }
}
```

2. How to use database migrations to make your database grow with your application in a source-control enabled way

- #### Migrations
  - In order to make new database tables and sequelize models that reflect them, we want to generate a migration file and model file using `model:generate`
    - `npx sequelize-cli model:generate --name Cat --attributes "firstName:string,specialSkill:string"`
    - Here we are creating a migration file and a model file for a Cat. We are specifying that we want this table to have fields for firstName and specialSkill. Sequelize will automatically make fields for an id, createdAt, and updatedAt, as well, so we do not need to specify these.
  - Once our migration file is created, we can go in and edit any details that we need to. Most often we will want to add in database constraints such as `allowNull: false`, adding a uniqueness constraint with `unique: true`, adding in character limits to fields such as `type: Sequelize.STRING(100)`, or specifying a foreign key with references to another table `references: { model: 'Categories' }`.
  - After we make any necessary changes to our migration file, we need to perform the migration, which will run the SQL commands to actually create the table.
    - `npx sequelize-cli db:migrate`
    - This command runs any migration files that have not been previously run, in the order that they were created (this is why the timestamp in the file name is important)
  - If we realize that we made a mistake after migrating, we can undo our previous migration, or all of our migrations. After undoing them, we can make any changes necessary to our migration files (They won't be deleted from the undo, so we don't need to generate anything! Just make the necessary changes to the files that already exist and save the files.). Running the migrations again will make the tables with the updates reflected.
    - `npx sequelize-cli db:migrate:undo`
    - `npx sequelize-cli db:migrate:undo:all`
- #### Models - Validations and Associations

  - In addition to the migration files, our `model:generate` command also created a model file for us. This file is what allows sequelize to transform the results of its SQL queries into useful JavaScript objects for us.
  - The model is where we can specify a validation that we want to perform before trying to run a SQL query. If the validation fails, we can respond with a message instead of running the query, which can be an expensive operation that we know won't work.

    ```javascript
    // Before we make changes, sequelize generates the type that this field represents
    specification: DataTypes.TEXT

    // We can replace the generated format with an object to specify not only the type, but the validations that we want to implement. The validations can also take in messages the respond with on failure and arguments.
    specification: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: {
          msg: 'The specification cannot be empty'
        },
        len: {
          args: [10, 100]
          msg: 'The specifcation must be between 10 and 100 characters'
        }
      }
    }
    ```

  - Another key part of the model file is setting up our associations. We can use the `belongsTo`, `hasMany`, and `belongsToMany` methods to set up model-level associations. Doing so is what creates the helpful functionality like `addOwner` that we saw in the pets example, a function that automatically generates the SQL necessary to create a petOwner record and supplies the appropriate petId and ownerId.

    - In a one-to-many association, we need to have a `belongsTo` association on the "many" side, and a `hasMany` association on the "one" side:
      - `Instruction.belongsTo(models.Recipe, { foreignKey: 'recipeId' });`
      - `Recipe.hasMany(models.Instruction, { foreignKey: 'recipeId' });`
    - In a many-to-many association, we need to have a `belongsToMany` on each side of the association. We generally specify a columnMapping object to show the association more clearly:

      ```javascript
      // In our Owner model
      // To connect this Owner to a Pet through the PetOwner
      const columnMapping = {
        through: "PetOwner", // joins table
        otherKey: "petId", // key that connects to other table we have a many association with
        foreignKey: "ownerId", // our foreign key in the joins table
      };
      Owner.belongsToMany(models.Pet, columnMapping);

      // In our Pet model
      // To connect this Pet to an Owner through the PetOwner
      const columnMapping = {
        through: "PetOwner", // joins table
        otherKey: "ownerId", // key that connects to other table we have a many association with
        foreignKey: "petId", // our foreign key in the joins table
      };
      Pet.belongsToMany(models.Owner, columnMapping);
      ```

3. How to perform CRUD operations with Sequelize

- #### Seed Files
  - Seed files can be used to populate our database with starter data.
    - `npx sequelize-cli seed:generate --name add-cats`
    - `up` indicates what to create when we seed our database, `down` indicates what to delete if we want to unseed the database.
    - For our up, we use the `queryInterface.bulkInsert()` method, which takes in the name of the table to seed and an array of objects representing the records we want to create:
      ```javascript
      up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert("<<TableName>>", [
          { field1: value1a, field2: value2a },
          { field1: value1b, field2: value2b },
          { field1: value1c, field2: value2c },
        ]);
      };
      ```
    - For our down, we use the `queryInterface.bulkDelete()` method, which takes in the name of the table and an object representing our WHERE clause. Unseeding will delete all records from the specified table that match the WHERE clause.
    ```javascript
    // If we want to specify what to remove:
    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete("<<TableName>>", {
        field1: [value1a, value1b, value1c], //...etc.
      });
    };
    // If we want to remove everything from the table:
    down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete("<<TableName>>", null, {});
    };
    ```
    - Running `npx sequelize-cli db:seed:all` will run all of our seeder files.
    - `npx sequelize-cli db:seed:undo:all` will undo all of our seeding.
    - If we omit the `:all` we can run specific seed files
- #### Inserting with Build and Create

  - In addition to seed files, which we generally use for starter data, we can create new records in our database by using `build` and `save`, or the combined `create`

    - Use the .build method of the Cat model to create a new Cat instance in index.js

    ```javascript
    // Constructs an instance of the JavaScript `Cat` class. **Does not
    // save anything to the database yet**. Attributes are passed in as a
    // POJO.
    const newCat = Cat.build({
      firstName: "Markov",
      specialSkill: "sleeping",
      age: 5,
    });

    // This actually creates a new `Cats` record in the database. We must
    // wait for this asynchronous operation to succeed.
    await newCat.save();

    // This builds and saves all in one step. If we don't need to perform any operations on the instance before saving it, this can optimize our code.
    const newerCat = await Cat.create({
      firstName: "Whiskers",
      specialSkill: "sleeping",
      age: 2,
    });
    ```

- #### Updating Records

  - When we have a reference to an instance of a model (i.e. after we have queried for it or created it), we can update values by simply reassigning those fields and using the `save` method

  ```javascript
  // Get a reference to the cat record that we want to update (here just the cat with primary key of 1)
  const cat = await Cat.findByPk(1);

  // Change cat's attributes.
  cat.firstName = "Curie";
  cat.specialSkill = "jumping";
  cat.age = 123;

  // Save the new name to the database.
  await cat.save();
  ```

- #### Deleting Records
  - When we have a reference to an instance of a model, we can delete that record by using `destroy`
  ```javascript
  const cat = await Cat.findByPk(1);
  // Remove the Markov record.
  await cat.destroy();
  ```
  - We can also call `destroy` on the model itself. By passing in an object that specifies a where clause, we can destroy all records that match that query
  ```javascript
  await Cat.destroy({ where: { specialSkill: "jumping" } });
  ```

4. How to query using Sequelize

- #### findAll
  ```javascript
  const cats = await Cat.findAll();
  // Log the fetched cats.
  // The extra arguments to stringify are a replacer and a space respectively
  // Here we're specifying a space of 2 in order to print more legibly
  // We don't want a replacer, so we pass null just so that we can pass a 3rd argument
  console.log(JSON.stringify(cats, null, 2));
  ```
- #### WHERE clause
  - Passing an object to findAll can add on clauses to our query
  - The `where` key takes an object as a value to indicate what we are filtering by
  - { where: { field: value } } => WHERE field = value
  ```javascript
  const cats = await Cat.findAll({
    where: {
      firstName: "Markov",
    },
  });
  console.log(JSON.stringify(cats, null, 2));
  ```
- #### OR in the WHERE clause
  - Using an array for the value tells sequelize we want to match any of these values
  - { where: { field: [value1, value2] } => WHERE field IN (value1, value2)
  ```javascript
  const cats = await Cat.findAll({
    where: {
      firstName: ["Markov", "Curie"],
    },
  });
  console.log(JSON.stringify(cats, null, 2));
  ```
- #### AND in the WHERE clause
  - Providing additional key/value pairs to the where object indicates all filters must match
  - { where: { field1: value1, field2: value2 } } => WHERE field1 = value1 AND field2 = value2
  ```javascript
  const cats = await Cat.findAll({
    where: {
      firstName: "Markov",
      age: 4,
    },
  });
  console.log(JSON.stringify(cats, null, 2));
  ```
- #### Sequelize Op operator
  - By requiring Op from the sequelize library we can provide more advanced comparison operators
  - `const { Op } = require("sequelize");`
  - Op.ne: Not equal operator
    ```javascript
    const cats = await Cat.findAll({
      where: {
        firstName: {
          // All cats where the name is not equal to "Markov"
          // We use brackets in order to evaluate Op.ne and use the value as the key
          [Op.ne]: "Markov",
        },
      },
    });
    console.log(JSON.stringify(cats, null, 2));
    ```
  - Op.and: and operator
    ```javascript
    const cats = await Cat.findAll({
      where: {
        // The array that Op.and points to must all be true
        // Here, we find cats where the name is not "Markov" and the age is 4
        [Op.and]: [{ firstName: { [Op.ne]: "Markov" } }, { age: 4 }],
      },
    });
    console.log(JSON.stringify(cats, null, 2));
    ```
  - Op.or: or operator
    ```javascript
    const cats = await Cat.findAll({
      where: {
        // One condition in the array that Op.or points to must be true
        // Here, we find cats where the name is "Markov" or where the age is 4
        [Op.or]: [{ firstName: "Markov" }, { age: 4 }],
      },
    });
    console.log(JSON.stringify(cats, null, 2));
    ```
  - Op.gt and Op.lt: greater than and less than operators
    ```javascript
    const cats = await Cat.findAll({
      where: {
        // Find all cats where the age is greater than 4
        age: { [Op.gt]: 4 },
      }
      },
    });
    console.log(JSON.stringify(cats, null, 2));
    ```
- #### Ordering results
  - Just like the where clause, we can pass an order key to specify we want our results ordered
  - The key `order` points to an array with the fields that we want to order by
  - By default, the order is ascending, just like standard SQL. If we want to specify descending, we can instead use a nested array with the field name as the first element and "DESC" as the second element. (We could also specify "ASC" as a second element in a nested array, but it is unnecessary as it is default)
  ```javascript
  const cats = await Cat.findAll({
    // Order by age descending, then by firstName ascending if cats have the same age
    order: [["age", "DESC"], "firstName"],
  });
  console.log(JSON.stringify(cats, null, 2));
  ```
- #### Limiting results
  - We can provide a `limit` key in order to limit our results to a specified number
  ```javascript
  const cats = await Cat.findAll({
    order: [["age", "DESC"]],
    // Here we are limiting our results to one record. It will still return an array, just with one object inside. We could have said any number here, the result is always an array.
    limit: 1,
  });
  console.log(JSON.stringify(cats, null, 2));
  ```
- #### findOne
  - If we only want one record to be returned we can use findOne instead of findAll
  - If multiple records would have matched our findOne query, it will return the first record
  - Unlike findAll, findOne will return the object directly instead of an array. If no records matched the query it will return null.
  ```javascript
  // finds the oldest cat
  const cat = await Cat.findOne({
    order: [["age", "DESC"]],
  });
  console.log(JSON.stringify(cat, null, 2));
  ```
- #### Querying with Associations
  - We can include associated data by adding an `include` key to our options object
  ```javascript
  const pet = Pet.findByPk(1, { include: [PetType, Owner] });
  console.log(
    pet.id,
    pet.name,
    pet.age,
    pet.petTypeId,
    pet.PetType.type,
    pet.Owners
  );
  ```
  - We can get nested associations by having `include` point to an object that specifies which `model` we have an association with, then chaining an association on with another `include`
  ```javascript
  const owner = Owner.findByPk(1, {
    include: { model: Pet, include: PetType },
  });
  console.log(
    pet.id,
    pet.name,
    pet.age,
    pet.petTypeId,
    pet.PetType.type,
    pet.Owners
  );
  ```

5. How to perform data validations with Sequelize

- See the database migrations section above.
- In general, we add in a validate key to each field that we want validations for. This key points to an object that specifies all of the validations we want to make on that field, such as `notEmpty`, `notNull`, `len`, `isIn`, etc.

```javascript
specification: {
  type: DataTypes.TEXT,
  validate: {
    notEmpty: {
      msg: 'The specification cannot be empty'
    },
    len: {
      args: [10, 100]
      msg: 'The specifcation must be between 10 and 100 characters'
    }
  }
}
```

6. How to use transactions with Sequelize

- We can create a transaction block in order to make sure either all operations are performed or none of them are
- We use the `.transaction` method in order to create our block. The method takes in a callback with an argument to track our transaction id (typically just a simple `tx` variable).
- All of our sequelize operations can be passed a `transaction` key on their options argument which points to our transaction id. This indicates that this operation is part of the transaction block and should only be executed in the database when the whole block executes without error.

```javascript
async function main() {
  try {
    // Do all database access within the transaction.
    await sequelize.transaction(async (tx) => {
      // Fetch Markov and Curie's accounts.
      const markovAccount = await BankAccount.findByPk(1, { transaction: tx });
      const curieAccount = await BankAccount.findByPk(2, { transaction: tx });

      // No one can mess with Markov or Curie's accounts until the
      // transaction completes! The account data has been locked!

      // Increment Curie's balance by $5,000.
      curieAccount.balance += 5000;
      await curieAccount.save({ transaction: tx });

      // Decrement Markov's balance by $5,000.
      markovAccount.balance -= 5000;
      await markovAccount.save({ transaction: tx });
    });
  } catch (err) {
    // Report if anything goes wrong.
    console.log("Error!");

    for (const e of err.errors) {
      console.log(`${e.instance.clientName}: ${e.message}`);
    }
  }

  await sequelize.close();
}

main();
```
