---
id: basics
title: Basics
---

## Create table

```sql
--Create the main employee table
CREATE TABLE employee (
  id int PRIMARY KEY,
  name varchar(255),
  age int
);

--Create the employee age table
CREATE TABLE employee_age (
  id int PRIMARY KEY,
  age int
);
```

## Insert

```sql
INSERT INTO employee
  VALUES (1, 'Ashish', 'Pune');
INSERT INTO employee
  VALUES (2, 'patel', 'Nagpur');
INSERT INTO employee
  VALUES (4, 'Ansu', 'Bikaner');

INSERT INTO employee_age
  VALUES (1, 23);
INSERT INTO employee_age
  VALUES (2, 27);
INSERT INTO employee_age
  VALUES (3, 21);
```

## Select

```sql
SELECT * FROM employee;
```

| id  | name   | city    |
| :-- | :----- | :------ |
| 1   | Ashish | Pune    |
| 2   | patel  | Nagpur  |
| 4   | Ansu   | Bikaner |

```sql
SELECT * FROM employee_age;
```

| id  | age |
| :-- | :-- |
| 1   | 23  |
| 2   | 27  |
| 3   | 21  |
