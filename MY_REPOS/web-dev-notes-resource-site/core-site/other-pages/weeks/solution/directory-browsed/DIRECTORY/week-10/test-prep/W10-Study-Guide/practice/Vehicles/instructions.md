## Vehicle Schema Instructions

You are in charge of implementing the schema found in database-schema.png. You will implement the database using SQL. After it, you will drop the database and implement it again using Sequelize.

Before you start, create a user called "vehicles_app" with a password and CREATEDB privileges.

- SQL Practice
	1. Create a database called "vehicles" with owner "vehicles_app"
	2. Create the three tables in the schema "People", "VehicleTypes" and "Vehicles". Ensure that you capture the associations as foreign keys in your tables
	3. Create a sql file with seed data from `data-seed.txt`. Seed your database.
	4. Write the following queries in SQL

	- Find all People who own "Ford" "Focus"'s
	- Find all People who own Trucks
	- Find all Vehicle Types owned by "Kris"'s

- Sequelize Practice
	1. Drop the database called "vehicles"
	2. Use sequelize to initialize a project
	3. Update config/config.json with your "vehicles_app" user and the "vehicles" database
	4. Utilize sequelize_cli model:generate to create the three Models that correspond to every table in the schema. Remember that `sequelize model:generate` takes the singular model names ("Person", "VehicleType" and "Vehicle") and will generate a migration file with the pluralized table names ("People", "VehicleTypes", and "Vehicles").
	5. Update the migrations files with validations and references
	6. Update the models with the associations in the schema
	7. Utilize sequelize-cli seed:generate to create seed files for each Model, and migrate the data in `data-seed.txt` into these files.
	8. Create a new file called `queries.js` in the top level of your application.
	9. Require your three models:

```js
	const { Person, VehicleType, Vehicle } = require('./models');
```

Using the Sequelize query syntax, prepare three functions that will return the values specified in these queries:

	- Find all People who own "Ford" "Focus"'s
	- Find all People who own Trucks
	- Find all Vehicle Types owned by "Kris"'s