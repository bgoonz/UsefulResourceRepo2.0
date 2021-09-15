# Database Primer Notes

>Each project has many people working on it: **one to many**
_-->we are assuming that one person may not work on more than one project._

```shell
sudo -u postgres psql
```
---
ID  First  Last     SSN          PROJECT_ID
1   One    First    1-11-1111    1
2   Two    Second   ZZZ-22-2222  1
3   Three  Third    33333-3333   2
4   Four   Forth    444-44-4444  2
5   Five   Fifth    555-55-5555  2
6   Six    Sixth    666-66-6666  3
7   Seven  Seventh  777-77-7777  3
8   Eight  Eighth   888-88-8888  4
9   Nine   Ninth    999-99-9999  4

---


```sql
CREATE TABLE employees(
  ID         INTEGER  NOT NULL PRIMARY KEY ,
  First      VARCHAR(15) NOT NULL,
  Last       VARCHAR(15) NOT NULL,
  SSN        VARCHAR(15) NOT NULL,
  PROJECT_ID INTEGER  NOT NULL
);

```

```sql

CREATE TABLE Projects(
 ID   INTEGER NOT NULL PRIMARY KEY ,
 NAME  VARCHAR(4) NOT NULL

);


```

```sql


INSERT INTO employees
VALUES
(1,'One','First','1-11-1111',1),
(2,'Two','Second','222-22-2222',1),
(3,'Three','Third','333-33-3333',2),
(4,'Four','Forth','444-44-4444',2),
(5,'Five','Fifth','555-55-5555',2),
(6,'Six','Sixth','666-66-6666',3),
(7,'Seven','Seventh','777-77-7777',3),
(8,'Eight','Eighth','888-88-8888',4),
(9,'Nine','Ninth','999-99-9999',4);


```

```sql
INSERT INTO projects
VALUES
(1,'p-1'),
(2,'p-2'),
(3,'p-3'),
(4,'p-4'),
(5,'p-5'),
(6,'p-6'),
(7,'p-7'),
(8,'p-8'),
(9,'p-9');


```


```shell

sudo -u postgres psql
psql (13.1 (Ubuntu 13.1-1.pgdg20.04+1), server 12.5 (Ubuntu 12.5-0ubuntu0.20.04.1))
Type "help" for help.


postgres=# CREATE USER bryan1
postgres-# WITH
postgres-# PASSWORD 'password';
CREATE ROLE


postgres=# CREATE DATABASE primer WITH OWNER bryan1;
CREATE DATABASE


postgres=# \c primer
psql (13.1 (Ubuntu 13.1-1.pgdg20.04+1), server 12.5 (Ubuntu 12.5-0ubuntu0.20.04.1))
You are now connected to database "primer" as user "postgres".



primer=# SET ROLE bryan1;
SET


primer-> \i create-employees.sql;
CREATE TABLE

primer-> \i create-projects.sql;
CREATE TABLE
primer-> \i insert-into-employees.sql;
INSERT 0 9

primer=> SELECT * FROM employees;
 id | first |  last   |     ssn     | project_id
----+-------+---------+-------------+------------
  1 | One   | First   | 1-11-1111   |          1
  2 | Two   | Second  | 222-22-2222 |          1
  3 | Three | Third   | 333-33-3333 |          2
  4 | Four  | Forth   | 444-44-4444 |          2
  5 | Five  | Fifth   | 555-55-5555 |          2
  6 | Six   | Sixth   | 666-66-6666 |          3
  7 | Seven | Seventh | 777-77-7777 |          3
  8 | Eight | Eighth  | 888-88-8888 |          4
  9 | Nine  | Ninth   | 999-99-9999 |          4
(9 rows)



primer=> SELECT * FROM projects;
 id | name
----+------
  1 | p-1
  2 | p-2
  3 | p-3
  4 | p-4
  5 | p-5
  6 | p-6
  7 | p-7
  8 | p-8
  9 | p-9
(9 rows)
```

>To express the one-to-many relationship, the EMPLOYEE table also has a key named "PROJECT_ID".To express the one-to-many relationship, the EMPLOYEE table also has a key named "PROJECT_ID".


>The PROJECT_ID is a foreign key... which represents the primary key of a different table



