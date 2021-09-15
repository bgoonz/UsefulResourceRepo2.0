# Getting Started With PostgreSQL

In database jargon, PostgreSQL uses a client/server model. A PostgreSQL session consists of the following cooperating processes (programs):

---

### Getting Started With PostgreSQL

#### In database jargon, PostgreSQL uses a client/server model. A PostgreSQL session consists of the following cooperating processes (programs):

- <span id="d5d8">A server process, which manages the database files, accepts connections to the database from client applications, and performs database actions on behalf of the clients. The database server program is called `postgres`.</span>
- <span id="91d1">The user’s client (frontend) application that wants to perform database operations. Client applications can be very diverse in nature: a client could be a text-oriented tool, a graphical application, a web server that accesses the database to display web pages, or a specialized database maintenance tool. Some client applications are supplied with the PostgreSQL distribution; most are developed by users.</span>

As is typical of client/server applications, the client and the server can be on different hosts. In that case they communicate over a TCP/IP network connection. You should keep this in mind, because the files that can be accessed on a client machine might not be accessible (or might only be accessible using a different file name) on the database server machine.

The PostgreSQL server can handle multiple concurrent connections from clients. To achieve this it starts (“forks”) a new process for each connection. From that point on, the client and the new server process communicate without intervention by the original `postgres` process. Thus, the master server process is always running, waiting for client connections, whereas client and associated server processes come and go. (All of this is of course invisible to the user. We only mention it here for completeness.)

### What is SQL?

###

SQL is short for Structured Query Language. Originally, it used to be called SEQUEL (Structured English Query Language) and was used for storing and manipulating data in databases. Today SQL is used to perform all types of data operations in relational database management systems (RDBMS).

SQL is a powerful language where we can perform a wide range of operations:

- <span id="7f0b">execute queries</span>
- <span id="d14a">fetch data</span>
- <span id="5389">insert, update, and delete records in a database (DML operations)</span>
- <span id="f62e">create new objects in a database (DDL operations)</span>
- <span id="d790">set permissions on tables, procedures, functions, and views</span>
- <span id="ebab">and much, much more...</span>

### What is the ANSI SQL standard?

###

The American National Standards Institute (ANSI) created a standard for SQL in 1986, and it was adopted by the International Organization for Standardization (ISO) in 1987. For each RDBMS to be compliant with the ANSI standard, they all have to support the major commands, like DML, in a similar manner as closely as possible. More information about the ANSI standard can be found on the <a href="https://en.wikipedia.org/wiki/SQL" class="markup--anchor markup--p-anchor">SQL Wikipedia page</a>.

SQL follows ANSI/ISO standards, but there are different versions of the SQL language used by different database systems. For example, in PostgreSQL we can perform an INSERT operation using RETURNING clauses, which not all other databases can do.

    [centos@tushar-ldap-docker bin]$ ./psql postgres
        psql.bin (11.9.17)
        Type "help" for help.
        postgres=# create table tyu(n int);
        CREATE TABLE
        postgres=# insert into tyu values(1),(2) returning *;
        n
        ---
        1
        2
       (2 rows)
       INSERT 0 2

But to be compliant with the ANSI standard, all databases support commands (like DELETE, UPDATE, SELECT, INSERT) in the same way—that is, the syntax should work anywhere.

If we check the <a href="https://www.postgresql.org/docs/12/sql-insert.html" class="markup--anchor markup--p-anchor">PostgreSQL documentation of the INSERT statement</a>, its conformity to the SQL standard is discussed in the page’s Compatibility section:

> _Compatibility_

> _INSERT conforms to the SQL standard, except that the RETURNING clause is a PostgreSQL extension, as is the ability to use WITH with INSERT, and the ability to specify an alternative action with ON CONFLICT. Also, the case in which a column name list is omitted, but not all the columns are filled from the VALUES clause or query, is disallowed by the standard._

> _The SQL standard specifies that OVERRIDING SYSTEM VALUE can only be specified if an identity column that is generated always exists. PostgreSQL allows the clause in any case and ignores it if it is not applicable._

>

>

The PostgreSQL documentation includes clear descriptions of any differences from the SQL standard for any command, including:

- <span id="a637">DML (INSERT, SELECT, DELETE)</span>
- <span id="f912">DDL (CREATE, ALTER, TRUNCATE, DROP, RENAME)</span>
- <span id="292c">TCL (COMMIT, ROLLBACK, SAVEPOINT)</span>
- <span id="20cf">DCL (GRANT, REVOKE)</span>

under each command’s Compatibility section.

### SQL query examples

###

Now let’s explore some examples of common and useful PostgreSQL queries that can be used in various situations.

### 1. CREATE TABLE query in PostgreSQL

###

<a href="https://www.postgresql.org/docs/12/sql-createtable.html" class="markup--anchor markup--p-anchor">CREATE TABLE</a> is a keyword that will create a new, initially empty table in the database. The table will be owned by the user who has issued this command.

    postgres=# create table dummy_table(name varchar(20),address text,age int);
          CREATE TABLE

### 2. INSERT query in PostgreSQL

###

The <a href="https://www.postgresql.org/docs/12/sql-insert.html" class="markup--anchor markup--p-anchor">INSERT command</a> is used to insert data into a table:

    postgres=# insert into dummy_table values('XYZ','location-A',25);
            INSERT 0 1
            postgres=# insert into dummy_table values('ABC','location-B',35);
            INSERT 0 1
            postgres=# insert into dummy_table values('DEF','location-C',40);
            INSERT 0 1
            postgres=# insert into dummy_table values('PQR','location-D',54);
            INSERT 0 1

### 3. SELECT query without WHERE condition in PostgreSQL

###

The <a href="https://www.postgresql.org/docs/12/sql-select.html" class="markup--anchor markup--p-anchor">SELECT command</a> (when used without the optional WHERE condition) is used to fetch all data from a database table:

    postgres=# select * from dummy_table;
            name |  address   | age
            ---------+--------------+ -----
            XYZ   | location-A |  25
            ABC   | location-B |  35
            DEF   | location-C |  40
            PQR   | location-D |  54
            (4 rows)

### 4. UPDATE query in PostgreSQL

###

<a href="https://www.postgresql.org/docs/12/sql-update.html" class="markup--anchor markup--p-anchor">UPDATE</a> is used to make updates to the data or row(s) of a database table. In the example below we use UPDATE to change the age of a person whose name is ‘PQR’:

    postgres=# update dummy_table set age=50 where name='PQR';
            UPDATE 1
            postgres=# select * from dummy_table;
            name |  address   | age
            --------+--------------+-------
            XYZ  | location-A |  25
            ABC  | location-B |  35
            DEF  | location-C |  40
            PQR  | location-D |  50
            (4 rows)

Next, we’ll use the UPDATE command to change the name and age of a person whose address is ‘location-D’:

    postgres=# update dummy_table set name='GHI',age=54 where address='location-D';
    UPDATE 1
    postgres=# select * from dummy_table;
     name |  address   | age
    ------+------------+-----
     XYZ  | location-A |  25
     ABC  | location-B |  35
     DEF  | location-C |  40
     GHI  | location-D |  54
    (4 rows)

    postgres=#

If we want to modify all the values in the address and age columns in dummy_table, then we do not need to use the WHERE clause. The UPDATE query would look like this:

    postgres=# update dummy_table set age=54,address='location-X';
    UPDATE 4


    postgres=# select * from dummy_table ;
     name |  address   | age
    ------+------------+--------
     XYZ  | location-X |  54
     ABC  | location-X |  54
     DEF  | location-X |  54
     GHI  | location-X |  54
    (4 rows)

    postgres=#

A RETURNING clause returns the updated rows. This is optional in UPDATE:

    postgres=# update dummy_table set age=30 where name='XYZ' returning age as age_no;
     age_no
    ---------
          30
    (1 row)

    UPDATE 1

It is always recommended to perform such operations under transaction blocks (i.e., BEGIN...COMMIT/ROLLBACK;), so we have the option to roll back the operation.

### 5. DELETE query in PostgreSQL

###

The <a href="https://www.postgresql.org/docs/12/sql-delete.html" class="markup--anchor markup--p-anchor">DELETE command</a> is used to delete row(s). It can be used with or without the optional WHERE condition, but take note: if the WHERE condition is missing, the command will delete all rows, leaving you with an empty table.

In this example, we are deleting one row whose age column has the value 65:

    postgres=# delete from dummy_table where age=65;
    DELETE 1
    postgres=#

### 6. Comparison Operators in PostgreSQL queries

###

In PostgreSQL, with the help of <a href="https://www.postgresql.org/docs/12/functions-comparison.html" class="markup--anchor markup--p-anchor">comparison operators</a> we can find results where the value in a column is not equal to the specified condition or value.

### Less than or equal to query:

###

    postgres=# select * from dummy_table where age <=50;
     name |  address   | age
    ------+------------+-----
     XYZ  | location-A |  25
     ABC  | location-B |  35
     DEF  | location-C |  40
     PQR  | location-D |  50
    (4 rows)

### Greater than or equal to query:

###

    postgres=# select * from dummy_table where age>=50;
     name |  address   | age
    ------+------------+-----
     PQR  | location-D |  50
    (1 row)

### Not equal to query:

###

    postgres=# select * from dummy_table where age<>50;
     name |  address   | age
    ------+------------+-----
     XYZ  | location-A |  25
     ABC  | location-B |  35
     DEF  | location-C |  40
    (3 rows)

### Equal to query:

###

    postgres=# select * from dummy_table where age=50;
     name |  address   | age
    ------+------------+-----
     PQR  | location-D |  50
    (1 row)

### 7. SELECT DISTINCT query in PostgreSQL

###

The <a href="https://www.postgresql.org/docs/12/sql-select.html#SQL-DISTINCT" class="markup--anchor markup--p-anchor">SELECT DISTINCT</a> statement is used to return only distinct values from the table. It removes any duplicate values.

### SELECT query without DISTINCT clause

###

    postgres=# select age from dummy_table order by 1;
     age
    -----
       1
       1
       2
       2
       3
    (5 rows)

### SELECT query with DISTINCT clause

###

    postgres=# select distinct age from dummy_table order by 1;
     age
    -----
       1
       2
       3
    (3 rows)

### 8. TRUNCATE query in PostgreSQL

###

The <a href="https://www.postgresql.org/docs/12/sql-truncate.html" class="markup--anchor markup--p-anchor">TRUNCATE command</a> is used to empty a table:

    postgres=# truncate table dummy_table;
    TRUNCATE TABLE

### 9. DROP TABLE query in PostgreSQL

###

This <a href="https://www.postgresql.org/docs/12/sql-droptable.html" class="markup--anchor markup--p-anchor">DROP TABLE command</a> is used to drop a table from the database:

    postgresql=# drop table if exists dummy;
    NOTICE:  table "dummy" does not exist, skipping
    DROP TABLE

This command has removed the full table, including any associated data, indexes, rules, triggers, and constraints for that table.

### 10. CREATE VIEW query in PostgreSQL

###

The <a href="https://www.postgresql.org/docs/12/sql-createview.html" class="markup--anchor markup--p-anchor">CREATE VIEW</a> command is used to generate views. Views are pseudo-tables, which are used to present a full table, subset, or select columns from the underlying table:

    postgres=# create or replace view vi as select * from dummy_table where age is NULL;
    CREATE VIEW

### 11. Create a table in Postgresql using the SELECT statement

###

Using the syntax in the example below, we can create a table using a SELECT statement:

    postgres=# select 'My name  is X' as col1 , 10 as col2, 'Address is -XYZ location' as col3  into new_table;
    SELECT 1
    postgres=# select * from new_table ;
         col1      | col2 |           col3
    ---------------+------+--------------------------
     My name  is X |   10 | Address is -XYZ location
    (1 row)

### 12. Query timeout in PostgreSQL

###

We can command a query to timeout after a certain period with the help of <a href="https://www.enterprisedb.com/postgres-tutorials/how-tune-postgresql-guc-parameters" class="markup--anchor markup--p-anchor">GUC parameters</a> (short for grand unified configuration) like statement_timeout, which aborts any statement that takes more than the specified number of milliseconds:

    postgresql=# set statement_timeout=10;
    SET
    postgresql=# select pg_sleep(20);
    ERROR:  canceling statement due to statement timeout

### 13. Using CREATE SEQUENCE with the INSERT query in PostgreSQL

###

The <a href="https://www.postgresql.org/docs/12/sql-createsequence.html" class="markup--anchor markup--p-anchor">CREATE SEQUENCE</a> command is a sequential number generator. Once the sequence is created, we can use the sequence’s nextval and currval functions to insert values into a table:

    postgres=# create sequence seq;
    CREATE SEQUENCE
    postgres=# create table tab(n int);
    CREATE TABLE
    postgres=# insert into tab values (nextval('seq'));
    INSERT 0 1
    postgres=# insert into tab values (currval('seq'));
    INSERT 0 1
    postgres=# insert into tab values (nextval('seq'));
    INSERT 0 1
    postgres=# select * from tab;
     n
    ---
     1
     1
     2
    (3 rows)

### 14. Importing BLOB data types into PostgreSQL

###

PostgreSQL doesn’t directly support BLOBs (binary large objects), but we can work with them using the following methods:

Let's assume you have an image (in png format) downloaded in the /home/edb/ folder:

    [edb@localhost]$ ls /home/edb/mypic.png
    /home/edb/mypic.png

We want to store this image in the PostgreSQL database.

Go to the bin folder of your PostgreSQL installation and connect to the psql terminal:

    postgres=# Create table testing(n int,n1 oid);
    CREATE TABLE
    postgres=# insert into testing values (1,lo_import('/home/edb/mypic.png'));
    INSERT 0 1

The lo_import() function loads the named file into pg_largeobject and returns an OID (object identifier) value that will refer to the large object. Selecting the testing table will show just the OID and not the bits that have made up this photo.

### 15. ILIKE query in PostgreSQL

###

The ILIKE operator is a <a href="https://www.postgresql.org/docs/12/functions-matching.html" class="markup--anchor markup--p-anchor">matching function</a> similar to the LIKE operator, but with the advantage that it matches valus case-insensitively.

    postgres=# select * from ted;
      n
    -----
     TAR
     TaR
     Tar
     tar
    (4 rows)

### Using ILIKE in a WHERE condition

###

    postgres=# select * from ted where n ilike 'TAR%';
      n
    -----
     TAR
     TaR
     Tar
     tar
    (4 rows)

### 16. Hierarchical queries in PostgreSQL

###

<a href="https://www.enterprisedb.com/postgres-tutorials/how-run-hierarchical-queries-oracle-and-postgresql" class="markup--anchor markup--p-anchor">Hierarchical queries</a> are ones where the results have a structured or parent-child relationship and are displayed in a tree structure. To see how hierarchical queries work, create a dummy table:

    create table test_table(
      emp_no                int,
      ename                 char(5),
      job                       char(9),
      manager_no        int
    );

Insert data into ‘test_table’:

    insert into test_table values(10,'A1','CEO',null);
    insert into test_table values(11, 'B1', 'VP', 10);
    insert into test_table values(12, 'B2', 'VP', 10);
    insert into test_table values(13, 'B3', 'VP', 10);
    insert into test_table values(14, 'C1', 'DIRECTOR', 13);
    insert into test_table values(15, ‘C2’, ‘DIRECTOR’, 13);
    insert into test_table values(16, 'D1', 'MANAGER', 15);
    insert into test_table values(17 ,'E1', 'ENGINEER', 11);
    insert into test_table values(18, 'E2', 'ENGINEER', 11);

We can perform hierarchical queries on this table using the methods below.

### 17. Length function in PostgreSQL

###

The <a href="https://www.postgresql.org/docs/9.1/functions-string.html" class="markup--anchor markup--p-anchor">length function</a> returns the number of characters or number of bytes in a specified string variable.

### Basic SELECT query

###

    postgres=# select name,age from dummy_table;
     name | age
    ------+-----
     XYZ  |  25
     ABC  |  35
     DEF  |  40
     PQR  |  54
     PQR  |
    (5 rows)

### Query with length function for column name and age

###

    postgres=# select length(name),length(age) from dummy_table;
     length | length
    --------+--------
          3 |      2
          3 |      2
          3 |      2
          3 |      2
          3 |
    (5 rows)

### 18. When a query has no destination for result data in PostgreSQL

###

Say that while selecting a given function, we receive the error message below:

    postgresql=# create or replace function f(n int)
    returns int
    as
    $$
    begin
    select now();
    return 1;
     end;
    $$ language 'plpgsql';
    CREATE FUNCTION
    postgres=# select f(9);
    ERROR:  query has no destination for result data
    HINT:  If you want to discard the results of a SELECT, use PERFORM instead.

To avoid such errors, we can either use PERFORM or declare a variable and use it in a <a href="https://www.postgresql.org/docs/9.1/sql-selectinto.html" class="markup--anchor markup--p-anchor">SELECT INTO</a> statement:

### Using PERFORM

###

    postgres=# create or replace function f(n int)
    returns int
    as
    $$
    begin
    perform
    now();
     return 1;
     end;
    $$ language 'plpgsql';
    CREATE FUNCTION
    postgresql=# select f(9);
     f
    ---
     1
    (1 row)

### Declaring a variable and using it in a SELECT INTO statement

###

    postgres=# create or replace function f(n int)
    returns int
    as
    $$
    declare
    a date;
    begin
    select now() into a;
    raise notice ‘%s’,a;
    return 1;
    end;
    $$ language 'plpgsql';
    CREATE FUNCTION


    postgresql=# select f(9);
              NOTICE: 24-SEP-20 13:15:46.23388s
                 f
                ---
                1
            (1 row)

### 19. Exporting query result to a text file in PostgreSQL

###

With the help of the <a href="https://www.postgresql.org/docs/12/sql-copy.html" class="markup--anchor markup--p-anchor">COPY command</a>, we can export data from a table to an outside text file as well as import data from a text file into a table.

### Exporting data from a table to a text file

###

    postgres=#  copy dummy_table to '/tmp/abc.txt';
    COPY 5

    postgres=# \! cat /tmp/abc.txt
    XYZ    location-A  25
    ABC   location-B  35
    DEF   location-C  40
    PQR   location-D  50
    CXC   1   50

### Importing data from a text file into a table

###

    postgres=# copy dummy_table from '/tmp/abc.txt';
    COPY 5

###

- <span id="8e52">With the help of common table expressions (CTE):</span>

###

###

- <span id="ddbe">`postgres=#WITH RECURSIVE cte AS ( SELECT emp_no, ename, manager_no, 1 AS level FROM test_table where manager_no is null UNION ALL SELECT e.emp_no, e.ename, e.manager_no, c.level + 1 FROM cte c JOIN test_table e ON e.manager_no = c.emp_no ) SELECT * FROM cte; emp_no | ename | manager_no | level -----------+----------+------------------+------- 10 | A1 | | 1 11 | B1 | 10 | 2 12 | B2 | 10 | 2 13 | B3 | 10 | 2 14 | C1 | 13 | 3 17 | E1 | 11 | 3 18 | E2 | 11 | 3 15 | C2 | 13 | 3 16 | D1 | 15 | 4 (9 rows) postgres=#`</span>

<!-- -->

1.  <span id="a513">  
    </span>

###

- <span id="b6ad">Using the tablefunc extension:</span>

###

###

1.  <span id="c6e2">The <a href="https://www.postgresql.org/docs/8.3/tablefunc.html" class="markup--anchor markup--li-anchor">tablefunc extension</a> is a contrib module that resides in the contrib/ folder in PostgreSQL sources.</span>
2.  <span id="2847">First, create the tablefunc extension:</span>

<!-- -->

- <span id="3505">`postgres=# CREATE EXTENSION tablefunc; CREATE EXTENSION postgres=#`</span>

<!-- -->

1.  <span id="b334">Then, use tablefunc’s connectby function to display results hierarchically:</span>

<!-- -->

- <span id="e7f5">`postgres=# SELECT * FROM connectby('dummy_table', 'emp_no', 'manager_no', '10', 0, '->') AS t(emp_no int, manager_no int, level int, ord text) order by emp_no; emp_no | manager_no | level | ord --------+------------+-------+---------------- 10 | | 0 | 10 11 | 10 | 1 | 10->11 12 | 10 | 1 | 10->12 13 | 10 | 1 | 10->13 14 | 13 | 2 | 10->13->14 15 | 13 | 2 | 10->13->15 16 | 15 | 3 | 10->13->15->16 17 | 11 | 2 | 10->11->17 18 | 11 | 2 | 10->11->18 (9 rows) postgres=#`</span>

<!-- -->

1.  <span id="8781">  
    </span>

### 20. Listing databases query in PostgreSQL

###

The following query can be used to show all the databases created:

    postgres=# select oid,datname from pg_database;
      oid     |  datname
    -----------+-----------
     13743 | postgres
         1     | template1
     13742 | template0
    (3 rows)

We can also list out all the database names using the \\l command at the psql prompt.

### 21. Checking query execution time in PostgreSQL

###

We can check the time needed for a query to execute by enabling \\timing at the psql prompt:

    postgres=# \timing
    Timing is on.

The SELECT query will now show the execution time:

    postgres=# select * from dummy_table;
     name |  address   | age
    ------+------------+--------
     XYZ  | location-A | 25
     ABC  | location-B | 35
     DEF  | location-C | 40
     PQR  | location-D | 50
     CXC  | 1               | 50
    (5 rows)

    Time: 0.440 ms
    postgres=#

### 22. Dynamic SQL query in PostgreSQL

###

<a href="https://www.postgresql.org/docs/9.1/ecpg-dynamic.html" class="markup--anchor markup--p-anchor">Dynamic SQL</a> is used to reduce repetitive tasks when it comes to querying.  
Dynamic SQL queries are not cached in memory.

    postgres=# do
    postgres-# $$
    postgres$# begin
    postgres$# execute 'select * from dummy_table';
    postgres$# end;
    postgres$# $$;
    DO

### 23. COUNT query in PostgreSQL

###

The <a href="https://www.postgresql.org/docs/8.2/functions-aggregate.html" class="markup--anchor markup--p-anchor">COUNT query</a> returns the number of rows in a table. If we use (\*) this will include null values; otherwise null values will be excluded.

    postgres=# select count(*) from dummy_table;
     count
    -------
         5
    (1 row)

    postgres=# select count(avg) from dummy_table;
     count
    -------
         4
    (1 row)

### 24. LIMIT and OFFSET query in PostgreSQL

###

The <a href="https://www.postgresql.org/docs/12/queries-limit.html" class="markup--anchor markup--p-anchor">LIMIT clause</a> is used to limit the data amount returned by the SELECT statement. The query below will display only 1 row:

    postgres=# select * from dummy_table  limit 1;
     name |  address   | age
    ------+------------+-----
     XYZ  | location-A |  25
    (1 row)

<a href="https://www.postgresql.org/docs/12/queries-limit.html" class="markup--anchor markup--p-anchor">OFFSET</a> is used when we want to skip a particular number of rows:

    postgres=# select * from dummy_table  offset 4;
     name | address | age
    ------+---------+-----
     cxc  | 1       |  50
    (1 row)

### 25. IF … ELSE expression in PostgreSQL

###

We can use <a href="https://www.postgresql.org/docs/9.1/plpgsql-control-structures.html" class="markup--anchor markup--p-anchor">conditional statements</a> like IF ... ELSE in an anonymous block. The example below checks if the values of variables abc and xyz are matching and prints the result— i.e., 150:

    postgres=# Do
                 $$
                 Declare
                  abc int;
                  xyz int;
                  begin
                  abc:=100;
                  xyz:=abc;
                  if abc=xyz then
                   xyz=150;
                  raise notice '%',xyz;
                 else
                 end if;
                 end;
                   $$
    ;
    NOTICE:  150
    DO

### 26. UPDATE with JOIN query in PostgreSQL

###

We can use UPDATE with a JOIN and WHERE clause when we want to update the values from one table (table X) based on values from another table (table Y):

    postgres=# create table X(n int, n1 char(10));
    CREATE TABLE
    postgres=# insert into X values (1,'abc');
    INSERT 0 1
    postgres=# insert into X values (2,'xyz');
    INSERT 0 1
    postgres=# insert into X values (3,'pqr');
    INSERT 0 1

    postgres=# create table Y(n int, n1 char(10));
    CREATE TABLE

    postgres=# insert into Y values (1,'');
    INSERT 0 1
    postgres=# insert into Y values (2,'');
    INSERT 0 1

    postgres=# insert into Y values (5,'axyz');
    INSERT 0 1

    postgres=# update Y set n1=X.n1 from X  where X.n=Y.n;
    UPDATE 2
    postgres=# select * from Y;
     n |     n1
    ---+------------
     5 | axyz
     1 | abc
     2 | xyz
    (3 rows)

    postgres=#

### 27. INNER JOIN query in PostgreSQL

###

The <a href="https://www.postgresql.org/docs/current/tutorial-join.html" class="markup--anchor markup--p-anchor">INNER JOIN</a> command will find rows from two (or more) tables where the specified columns data in the tables match:

    postgres=# select *  from x inner join  y on  x.n1 = y.n1;
     n |     n1     | n |     n1
    ---+------------+---+------------
     1 | abc        | 1 | abc
     2 | xyz        | 2 | xyz
    (2 rows)

    postgres=#

### 28. CASE expression in PostgreSQL

###

The <a href="https://www.postgresql.org/docs/12/functions-conditional.html" class="markup--anchor markup--p-anchor">CASE expression</a> is a generic conditional expression, similar to the IF … ELSE statement.

    postgres=# SELECT age,
           CASE age WHEN 25 THEN 'one'
                  WHEN 50 THEN 'two'
                  ELSE 'other'
           END
        FROM  dummy_table;
     age | case
    -----+-------
      25 | one
      35 | other
      40 | other
      50 | two
      50 | two
    (5 rows)

### 29. PostgreSQL recursive query

###

Recursive queries are used to deal with hierarchical queries or tree-structured data. The structure of a WITH RECURSIVE query is always: a) Non-recursive term  
  b) UNION (or UNION ALL), then a recursive term

where the recursive term includes a reference to the query's output.

    CREATE TABLE emp_test (
      id int,
      ename varchar(255),
      emanager int
    );

    INSERT INTO emp_test VALUES (1, 'abc', null);
    INSERT INTO emp_test VALUES (2, 'xyz', 1);
    INSERT INTO emp_test VALUES (3, 'def', 2);
    INSERT INTO emp_test VALUES (4, 'cde', 1);
    INSERT INTO emp_test VALUES (5, 'qrs', 2);
    INSERT INTO emp_test VALUES (9, 'iop', 3);
    INSERT INTO emp_test VALUES (10, 'klm', 4);

The recursive query below will give all the reports in a certain order:

    postgres=#WITH RECURSIVE emp_testnew  AS (
      SELECT id, ename, emanager
      FROM emp_test
      WHERE id = 2
      UNION ALL
      SELECT e.id, e.ename, e.emanager
      FROM emp_test e
      INNER JOIN emp_testnew e1 ON e1.id = e.emanager
    )
    SELECT *
    FROM emp_testnew;

     id | ename | emanager
    ----+-------+----------
      2 | xyz   |        1
      3 | def   |        2
      5 | qrs   |        2
      9 | iop   |        3
    (4 rows)

    postgres=#

### 30. PostgreSQL log queries

###

Using the <a href="https://www.postgresql.org/docs/12/pgstatstatements.html" class="markup--anchor markup--p-anchor">pg_stat_statements module</a>, we can track execution statistics for all SQL statements. To do this, we need to create an extension and add in shared_preload_libraries inside the postgresql.conf file:

    postgres=# create extension pg_stat_statements;
    CREATE EXTENSION


    postgres=# show shared_preload_libraries ;
                               shared_preload_libraries
    -------------------------------------------------
     $libdir/pg_stat_statements
    (1 row)


    postgres=# select query from pg_stat_statements where query like 'create table%';
    -[ RECORD 1 ]-------------------
    query | create table test(n int)

We can also configure PostgreSQL to generate log output by enabling these parameters in the postgresql.conf file:

    logging_collector = on
    log_directory = 'log'
    log_filename = ‘postgresql-%Y-%m-%d_%H%M%S.log'
    log_destination = ‘stderr’
    Log file will be created under the pg_log directory which resides under the data folder.

    [centos@tushar-ldap-docker bin]$ ls  data/log
    postgresql-2020-09-17_150932.log  postgresql-2020-09-19_000000.log
    [centos@tushar-ldap-docker bin]$

Queries will be recorded in these files.

### 31. Using a variable in a PostgreSQL query

###

We can declare a variable in PostgreSQL at the psql prompt:

    postgres=# \set cond 50

### Using a variable in a WHERE condition

###

    postgres=# select * from dummy_table where age=:cond;
     name |  address   | age
    ------+------------+-----
     PQR  | location-D |  50
    (1 row)

OR

    postgres=# \set cond 50
    postgres=# select :cond+100 ;
     ?column?
    ----------
          150
    (1 row)

### 32. Date query in PostgreSQL

###

PostgreSQL offers <a href="https://www.postgresql.org/docs/12/functions-datetime.html" class="markup--anchor markup--p-anchor">functions for date and time</a> that can be used in queries.

    postgres=# select now();
                   now
    ----------------------------------
     22-SEP-20 03:08:42.636385 +05:30
    (1 row)

    postgres=# select current_date;
     current_date
    --------------
     22-SEP-20
    (1 row)

    postgres=# select current_time;
         current_time
    -----------------------
     03:08:53.648466+05:30
    (1 row)

We can also perform a date range query to find rows with values between two time stamps:

    postgres=# create table datetable(n int,n1 date);
    CREATE TABLE

    postgres=# insert into datetable values (1,'12-01-1980');
    INSERT 0 1
    postgres=# insert into datetable values (2,'12-01-2020');
    INSERT 0 1
    postgres=# insert into datetable values (3,'12-01-2000');
    INSERT 0 1
    postgres=# select * from datetable where n1 between '12-01-1980' and '12-01-2000';
     n |         n1
    ---+--------------------
     1 | 12-JAN-80 00:00:00
     3 | 12-JAN-00 00:00:00
    (2 rows)

### 33. PostgreSQL function RETURN QUERY result

###

When a PL/pgSQL function is declared to return a SETOF some data type, the return is specified by a <a href="https://www.postgresql.org/docs/12/plpgsql-control-structures.html" class="markup--anchor markup--p-anchor">RETURN QUERY</a> command:

    postgres=# CREATE FUNCTION get(int) RETURNS SETOF integer AS
    $BODY$
    BEGIN
        RETURN QUERY SELECT age
                       FROM dummy_table
                      WHERE age >= $1  ;
        RETURN;
     END
    $BODY$
    LANGUAGE plpgsql;


    postgres=# select * from get(9);
     get
    -----
      25
      35
      40
      50
    (4 rows)

### 34. PostgreSQL parallel query performance

###

<a href="https://www.postgresql.org/docs/12/parallel-query.html" class="markup--anchor markup--p-anchor">Parallel queries</a> in PostgreSQL allow you to finish queries faster by utilizing many CPUs. These GUCs parameters are set in postgresql.conf file:

    #max_parallel_maintenance_workers = 2   # taken from max_parallel_workers
    #max_parallel_workers_per_gather = 2    # taken from max_parallel_workers
    #parallel_leader_participation = on
    #max_parallel_workers = 8               # maximum number of max_worker_processes that
                                                               # can be used in parallel operations


    postgres=# create table ty(n int);
    CREATE TABLE
    postgres=# insert into ty values (generate_series(1,300000));
    INSERT 0 300000

    postgres=# analyze ty;
    ANALYZE
    postgres=# explain  select * from ty where n<=1;
                                 QUERY PLAN
    ---------------------------------------------------------------------
     Gather  (cost=1000.00..4536.88 rows=30 width=4)
       Workers Planned: 1
       ->  Parallel Seq Scan on ty  (cost=0.00..3533.88 rows=18 width=4)
             Filter: (n <= 1)
    (4 rows)

    postgres=#

### 35. Logical operators in PostgreSQL

###

There are three basic <a href="https://www.postgresql.org/docs/12/functions-logical.html" class="markup--anchor markup--p-anchor">logical operators</a> available in PostgreSQL: AND, OR, and NOT.

These operators are used to match conditions in SQL statements—e.g., in WHERE and HAVING clauses.

    AND = when both boolean expressions are true then it will return TRUE
    OR   = when any boolean expression is true then it will return TRUE
    NOT = reverses the value of Boolean operator

### Some logical operator examples

###

- <span id="d614">`If both expressions are true, then the result is TRUE. postgresql=# select 1=1/1 and 200=2+198 as result_and_operator; result_and_operator --------------------- t (1 row) postgresql=#`</span>
- <span id="c7c1">`If one expression is true and another expression is NULL, then the result is NULL. postgresql=# select 4=4 and null; ?column? ---------- (1 row)`</span>
- <span id="8c12">`If one expression is true and another expression is false, then the result is TRUE. postgres=# select 1=100 OR 2=2; ?column? ---------- t (1 row)`</span>

### 36. Catching duplicate rows in a PostgreSQL table

###

In the following SQL query, there are two records with the value 50:

    postgres=# select age from dummy_table;
     age
    -----
      25
      35
      40
      50
      50
    (5 rows)

We can use the following SELECT … HAVING query to find the duplicate rows:

    postgres=#  select age, count(age) from dummy_table group by age having count(age)>1;
     age | count
    -----+-------
      50 |     2
    (1 row)

### 37. Enum query in PostgreSQL

###

<a href="https://www.postgresql.org/docs/12/datatype-enum.html" class="markup--anchor markup--p-anchor">Enumerated (enum) types</a> are data types that comprise a static, ordered set of values.

    postgres=# CREATE TYPE mood AS ENUM ('sad', 'ok', 'happy');
    CREATE TYPE
    postgres=# create table testi(n int, n1 mood);
    CREATE TABLE
    postgres=# insert into testi values (1,'happy');
    INSERT 0 1
    postgres=# insert into testi values (1,'sad');
    INSERT 0 1
    postgres=# insert into testi values (1,'ok');
    INSERT 0 1

If the enum has not been specified, it will give an error:

    postgres=# insert into testi values (1,'happyo');
    ERROR:  invalid input value for enum mood: "happyo"

### 38. Pivot query in PostgreSQL

###

A pivot table is a useful way to analyze large quantities of data by organizing it into a more manageable format.

    CREATE TABLE newtb(id SERIAL, rowid varchar(10), attri varchar(10), val varchar(10));
    INSERT INTO newtb(rowid, attri, val) values('t1','a1','v1');
    INSERT INTO newtb(rowid, attri, val) values('t1','a2','v2');
    INSERT INTO newtb(rowid, attri, val) values('t1','a3','v3');
    INSERT INTO newtb(rowid, attri, val) values('t1','a4','v4');
    INSERT INTO newtb(rowid, attri, val) values('t2','a1','v5');
    INSERT INTO newtb(rowid, attri, val) values('t2','a2','v6');
    INSERT INTO newtb(rowid, attri, val) values('t2','a3','v7');
    INSERT INTO newtb(rowid, attri, val) values('t2','a4','v8');

To create a pivot table you need to install the <a href="https://www.postgresql.org/docs/12/tablefunc.html" class="markup--anchor markup--p-anchor">tablefunc extension</a>:

    postgres=# create extension tablefunc;
    CREATE EXTENSION

    Select *
    FROM crosstab(
      'select rowid, attri, val
       from newtb
       where attri = ''a2'' or attri = ''a3''
       order by 1,2')
    AS newtb(row_name varchar(10), category_1 varchar(10), category_2 varchar(10), category_3 varchar(10));
     row_name | category_1 | category_2 | category_3
    ----------+------------+------------+--------------------------
       t1       |              v2        |            v3    |
       t2       |             v6         |             v7   |
    (2 rows)

### 39. SELF JOIN query in PostgreSQL

###

When we join a table against itself, this is called a SELF JOIN. This can be done using INNER JOIN or LEFT JOIN. SELF JOINs are useful when comparing the columns of rows within the same table:

    postgres=# create table emp1(emp_id int, firstname char(10), lastname char(10) , manager_id int);
    CREATE TABLE
    postgres=#
    postgres=#
    postgres=# insert into emp1 values(1,'ABC','XYZ',NULL);
    INSERT 0 1
    postgres=# insert into emp1 values(2,'TYU','BGV',1);
    INSERT 0 1
    postgres=# insert into emp1 values(3,'TEU','ZZV',1);
    INSERT 0 1
    postgres=# insert into emp1 values(4,'REU','AZV',2);
    INSERT 0 1
    postgres=# insert into emp1 values(5,'QREU','WZV',2);
    INSERT 0 1
    postgres=# insert into emp1 values(6,'DREU','QZV',3);
    INSERT 0 1


    postgres=# select a.firstname,b.lastname from emp1 a inner join emp1 b on a.emp_id=b.manager_id order by 1 ;
     firstname  |  lastname
    ------------+------------
     ABC        | ZZV
     ABC        | BGV
     TEU        | QZV
     TYU        | WZV
     TYU        | AZV
    (5 rows)

    postgres=#

### 40. Parent-child recursive query in PostgreSQL

###

With the help of <a href="https://www.postgresql.org/docs/12/queries-with.html" class="markup--anchor markup--p-anchor">common table expressions</a> (CTE) we can perform parent-child recursive queries:

    postgres=# CREATE TABLE recu_pc (
     id SERIAL PRIMARY KEY,
     name varchar(10) NOT NULL,
     parent_id integer );
    CREATE TABLE

    postgres=# insert into recu_pc values (1, 'Grandmother', NULL);
    INSERT 0 1
    postgres=# insert into recu_pc values (2, 'mother', 1);
    INSERT 0 1
    postgres=# insert into recu_pc values (3, 'daughter', 2);
    INSERT 0 1


    postgres=# WITH RECURSIVE rec_q (id) as
    (
      SELECT recu_pc.id, recu_pc.name from recu_pc where name='mother'
      UNION ALL
      SELECT recu_pc.id, recu_pc.name from rec_q, recu_pc where recu_pc.parent_id = rec_q.id
      )
    SELECT *
    FROM rec_q;
     id |   name
    ----+----------
      2 | mother
      3 | daughter
    (2 rows)

### 41. Defining a variable in a query in PostgreSQL

###

Using an <a href="https://www.postgresql.org/docs/12/sql-do.html" class="markup--anchor markup--p-anchor">anonymous block</a>, we can define a variable that can be passed to in a query:

    postgres=# do
    $$
    declare
    a int;
    begin
    select age into a from dummy_table
    where name ='XYZ';
    raise notice '%',a;
    end;
    $$;
    NOTICE:  25
    DO

### 42. PREPARE statement in PostgreSQL

###

A prepared statement is used to optimize performance. When the <a href="https://www.postgresql.org/docs/12/sql-prepare.html" class="markup--anchor markup--p-anchor">PREPARE statement</a> is executed, it is not only parsed but analyzed too, and when we fire the EXECUTE command the prepared statement is planned and executed.

Prepared statements can accept parameters.

    postgres=# prepare test(int) as
    select * from dummy_table where age=$1;
    PREPARE

    postgres=# execute test(50);
     name |  address   | age
    ------+------------+---------
     PQR  | location-D |  50
     CXC | 1                |  50
    (2 rows)

### 43. Checking NULL values in PostgreSQL

###

To Identify or select rows that have NULL values, the <a href="https://www.postgresql.org/docs/12/functions-comparison.html" class="markup--anchor markup--p-anchor">IS NULL</a> condition can be used in the WHERE clause.

    postgres=# select * from dummy_table;
     name |  address   | age
    ------+------------+-----
     XYZ  | location-A |  25
     ABC  | location-B |  35
     DEF  | location-C |  40
     PQR  | location-D |  54
     PQR  | location-D |
    (5 rows)

Identifying null values in ‘age’ column:

    postgres=# select name from dummy_table where age is null;
     name
    ------
     PQR
    (1 row)

[View original.](https://medium.com/p/19fba3e37110)

Exported from [Medium](https://medium.com) on July 13, 2021.
