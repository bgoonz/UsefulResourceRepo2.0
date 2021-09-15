## MusicBox Schema Instructions

You are in charge of implementing the schema found in database-schema.png. You will implement the database using SQL. After it, you will drop the database and implement it again using Sequelize.

Before you start, create a user called "musicbox_app" with a password and CREATEDB privileges.

- SQL Practice
	1. Create a database called "musicbox" with owner "musicbox_app"
	2. Create the three tables in the schema "Genres", "Albums" and "Artists". Ensure that you capture the associations as foreign keys in your tables
	3. Create a sql file with seed data from `data-seed.txt`. Seed your database.
	4. Write the following queries in SQL

	- Find the release date for all the albums by The Beatles.
	- Find the artist for the album The Life of Pablo.
	- Find all the albums along with their genres and artists.

- Sequelize Practice
	1. Drop the database called "musicbox"
	2. Use sequelize to initialize a project
	3. Update config/config.json with your "musicbox_app" user and the "musicbox" database
	4. Utilize sequelize_cli model:generate to create the three Models that correspond to every table in the schema. Remember that `sequelize model:generate` takes the singular model names ("Genre", "Album" and "Artist") and will generate a migration file with the pluralized table names ("Genres", "Albums", and "Artists").
	5. Update the migrations files with validations and references
	6. Update the models with the associations in the schema
	7. Utilize sequelize-cli seed:generate to create seed files for each Model, and migrate the data in `data-seed.txt` into these files.
	8. Create a new file called `queries.js` in the top level of your application.
	9. Require your three models:

```js
	const { Album, Genre, Artist } = require('./models');
```

Using the Sequelize query syntax, prepare three functions that will return the values specified in these queries:

	- Find the release date for all the albums by The Beatles.
	- Find the artist for the album The Life of Pablo.
	- Find all the albums along with their genres and artists.