---
id: joins
title: Joins
---

SQL Joins is used to combine data or rows from two or more tables based on a common field between them. Different types of Joins are:

**Employee Table**

| id  | name   | city    |
| :-- | :----- | :------ |
| 1   | Ashish | Pune    |
| 2   | patel  | Nagpur  |
| 4   | Ansu   | Bikaner |

**Age Table**

| id  | age |
| :-- | :-- |
| 1   | 23  |
| 2   | 27  |
| 3   | 21  |

## Inner Join

It selects all rows from both the tables as long as the condition satisfies.
**Only using JOIN is same as INNER JOIN**

```sql
SELECT
  employee_age.id,
  employee.name,
  employee.city
FROM employee
INNER JOIN employee_age
  ON employee.id = employee_age.id;
```

| id  | name   | city   | age |
| :-- | :----- | :----- | :-- |
| 1   | Ashish | Pune   | 23  |
| 2   | patel  | Nagpur | 27  |

## Left Join

This join returns all the rows of the table on the left side of the join and matching rows for the table on the right side of join.

```sql
SELECT
  employee_age.id,
  employee.name,
  employee.city
FROM employee
LEFT JOIN employee_age
  ON employee.id = employee_age.id;
```

| id   | name   | city    | age  |
| :--- | :----- | :------ | :--- |
| 1    | Ashish | Pune    | 23   |
| 2    | patel  | Nagpur  | 27   |
| NULL | Ansu   | Bikaner | NULL |

## Right Join

RIGHT JOIN is similar to LEFT JOIN. This join returns all the rows of the table on the right side of the join and matching rows for the table on the left side of join.

```sql
SELECT
  employee_age.id,
  employee.name,
  employee.city
FROM employee
RIGHT JOIN employee_age
  ON employee.id = employee_age.id;
```

| id  | name   | city   | age |
| :-- | :----- | :----- | :-- |
| 1   | Ashish | Pune   | 23  |
| 2   | patel  | Nagpur | 27  |
| 3   | NULL   | NULL   | 21  |

## Full Join

FULL JOIN creates the result-set by combining result of both LEFT JOIN and RIGHT JOIN.

```sql
SELECT
  employee_age.id,
  employee.name,
  employee.city,
  employee_age.age
FROM employee
FULL JOIN employee_age
  ON employee.id = employee_age.id;
```

| id   | name   | city    | age  |
| :--- | :----- | :------ | :--- |
| 1    | Ashish | Pune    | 23   |
| 2    | patel  | Nagpur  | 27   |
| 3    | NULL   | NULL    | 21   |
| NULL | Ansu   | Bikaner | NULL |
