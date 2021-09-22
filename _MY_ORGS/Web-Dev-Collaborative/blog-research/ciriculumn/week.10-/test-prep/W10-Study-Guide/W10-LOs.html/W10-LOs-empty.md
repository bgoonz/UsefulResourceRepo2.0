# Databases, SQL, and Sequelize  (Week 10) - Learning Objectives

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
2. Explain aspects of a good looking Web application
3. Identify App Academy's expectations of your projects for after you graduate
4. Practice good code hygiene when making projects live

### RDBMS and Database Entities
1. Define what a relational database management system is
2. Describe what relational data is
3. Define what a database is
4. Define what a database table is
5. Describe the purpose of a primary key
6. Describe the purpose of a foreign key
7. Describe how to properly name things in PostgreSQL
8. Install and configure PostgreSQL 12, its client tools, and a GUI client for it named Postbird
9. Connect to an instance of PostgreSQL with the command line tool psql
10. Identify whether a user is a normal user or a superuser by the prompt in the psql shell
11. Create a user for the relational database management system
12. Create a database in the database management system
13. Configure a database so that only the owner (and superusers) can connect to it
14. View a list of databases in an installation of PostgreSQL
15. Create tables in a database
16. View a list of tables in a database
17. Identify and describe the common data types used in PostgreSQL
18. Describe the purpose of the UNIQUE and NOT NULL constraints, and create columns in database tables that have them
19. Create a primary key for a table
20. Create foreign key constraints to relate tables
21. Explain that SQL is not case sensitive for its keywords but is for its entity names


## SQL (W10D2) - Learning Objectives

### SQL
1. How to use the `SELECT ... FROM ...` statement to select data from a single table
2. How to use the `WHERE` clause on `SELECT`, `UPDATE`, and `DELETE` statements to narrow the scope of the command
3. How to use the `JOIN` keyword to join two (or more) tables together into a single virtual table
4. How to use the `INSERT` statement to insert data into a table
5. How to use an `UPDATE` statement to update data in a table
6. How to use a `DELETE` statement to remove data from a table
7. How to use a seed file to populate data in a database


## SQL (continued) (W10D3) - Learning Objectives

### SQL (continued)
1. How to perform relational database design
2. How to use transactions to group multiple SQL commands into one succeed or fail operation
3. How to apply indexes to tables to improve performance
4. Explain what and why someone would use EXPLAIN
5. Demonstrate how to install and use the node-postgres library and its Pool class to query a PostgreSQL-managed database
6. Explain how to write prepared statements with placeholders for parameters of the form "$1", "$2", and so on


## ORM (W10D4) - Learning Objectives

### ORM
1. How to install, configure, and use Sequelize, an ORM for JavaScript
2. How to use database migrations to make your database grow with your application in a source-control enabled way
3. How to perform CRUD operations with Sequelize
4. How to query using Sequelize
5. How to perform data validations with Sequelize
6. How to use transactions with Sequelize
