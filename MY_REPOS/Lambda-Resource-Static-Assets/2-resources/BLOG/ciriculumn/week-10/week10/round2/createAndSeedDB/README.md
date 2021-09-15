### Week 10 Oct 2020 Online



Create And Seed A Database
==========================

In our SQL readings, we installed PostgreSQL, and we learned how to create a new PostgreSQL database and how to create and run a seed file in our database.

In this project, you'll practice seeding your database with a seed file that's full of, well, _seeds_! Hopefully when you're done, you'll have _grown_ your SQL knowledge.

Project overview
----------------

Practice creating a new database and piping a seed file into your database.

*   In Phase 1, you'll create a new database.
*   In Phase 2, you'll create a new seed data file.
*   In Phase 3, you'll pipe your seed data in your database via `psql` on the command line.

Phase 1: Create a new database
------------------------------

First, log into `psql` on the command line as your user.

Second, create a new database in PostgreSQL called `farm` by using the following syntax:

```
CREATE DATABASE [databasename];
```

_Note:_ You can check to make sure you've created a new database by viewing the list of databases with `\l`.

Phase 2: Create a seeds seed file
---------------------------------

Create a seed file full of seeds! Set up a SQL file with seed data that will produce two tables: an "edible\_seeds" with 40 rows and a "flower\_seeds" table with 20 rows.

**Edible Seeds**

| id | name | type | price\_per\_pound | in\_stock |
| --- | --- | --- | --- | --- |
| 1 | Chia | Pseudocereal | 6.95 | yes |
| 2 | Flax | Pseudocereal | 6.90 | yes |
| 3 | Amaranth | Pseudocereal | 14.99 | yes |
| 4 | Quinoa | Pseudocereal | 12.49 | no |
| 5 | Sesame | Pseudocereal | 13.49 | yes |
| 6 | Hemp | Other | 10.99 | yes |
| 7 | Chickpea | Legume | 7.99 | yes |
| 8 | Pea | Legume | 7.50 | no |
| 9 | Soybean | Legume | 12.99 | yes |
| 10 | Acorn | Nut | 11.99 | yes |
| 11 | Almond | Nut | 13.99 | yes |
| 12 | Beech | Nut | 10.94 | yes |
| 13 | Chestnut | Nut | 13.99 | yes |
| 14 | Water Chestnut | Nut | 9.99 | no |
| 15 | Macadamia | Nut | 25.00 | yes |
| 16 | Pistachio | Nut | 20.00 | yes |
| 17 | Pine nuts | Nut-like gymnosperm | 23.00 | yes |
| 18 | Pecan | Nut | 6.99 | yes |
| 19 | Juniper berries | Nut-like gymnosperm | 11.99 | yes |
| 20 | Cashew | Nut | 23.61 | yes |
| 21 | Hazelnut | Nut | 25.49 | yes |
| 22 | Sunflower seed | Other | 9.99 | yes |
| 23 | Poppy seed | Other | 12.99 | yes |
| 24 | Barley | Cereal | 9.99 | yes |
| 25 | Maize | Cereal | 6.98 | yes |
| 26 | Oats | Cereal | 9.99 | yes |
| 27 | Rice | Cereal | 7.90 | yes |
| 28 | Rye | Cereal | 9.87 | yes |
| 29 | Spelt | Cereal | 7.50 | yes |
| 30 | Wheat berries | Cereal | 2.50 | no |
| 31 | Buckwheat | Pseudocereal | 5.60 | yes |
| 32 | Jackfruit | Other | 15.00 | yes |
| 33 | Durian | Other | 8.26 | no |
| 34 | Lotus seed | Other | 12.99 | yes |
| 35 | Ginko | Nut-like gymnosperm | 12.80 | yes |
| 36 | Peanut | Legume | 5.99 | yes |
| 37 | Pumpkin seed | Other | 5.99 | yes |
| 38 | Watermelon seed | Other | 6.99 | yes |
| 39 | Pomegranate seed | Other | 27.63 | yes |
| 40 | Cacao bean | Other | 12.99 | yes |

Use the following data types for your "edible\_seeds" columns:

*   id - SERIAL
*   name - VARCHAR that accepts 255 characters
*   type - VARCHAR that accepts 255 characters
*   price\_per\_pound - FLOAT or REAL
*   in\_stock - BOOLEAN

**Flower Seeds**

| id | name | main\_color | seeds\_per\_packet | price\_per\_packet | in\_stock |
| --- | --- | --- | --- | --- | --- |
| 1 | Begonia Fiona Red | Red | 25 | 4.95 | yes |
| 2 | Moonflower Seeds | White | 25 | 2.95 | yes |
| 3 | Easy Wave F1 Lavender Sky Blue Petunia Seeds | Lavender | 10 | 4.25 | yes |
| 4 | Super Hero Spry Marigold Seeds | Marigold | 50 | 2.95 | no |
| 5 | Zinnia Zinderella Lilac | Pink | 25 | 3.95 | yes |
| 6 | Mini Ornamental Mint Seeds | Green | 10 | 3.95 | yes |
| 7 | Kabloom Light Pink Blast Calibrachoa | Green | 10 | 4.95 | yes |
| 8 | Calibrachoa Kabloom Coral | Coral | 10 | 4.95 | no |
| 9 | Fiesta del Sol Mexican Sunflower Seeds | Red | 30 | 3.95 | no |
| 10 | Cosmos Apricot Lemonade | Yellow | 25 | 3.95 | yes |
| 11 | Zinderella Purple Zinnia Seeds | Purple | 25 | 3.95 | yes |
| 12 | Fireball Marigold Seeds | Varies | 25 | 3.95 | yes |
| 13 | Gerbera Revolution Bicolor Red Lemon | Red | 10 | 8.95 | no |
| 14 | Paradise Island Calibrachoa Fuseables Seeds | Varies | 5 | 6.95 | yes |
| 15 | Cheyenne Spirit Coneflower Seeds | Varies | 15 | 7.95 | no |
| 16 | Leucanthemum Madonna | White | 25 | 4.95 | no |
| 17 | Zinnia Zinderella Peach | Peach | 25 | 3.95 | yes |
| 18 | Kabloom Orange Calibrachoa | Orange | 10 | 4.95 | yes |
| 19 | Fountain Blue Lobelia Seeds | Blue | 100 | 2.50 | yes |
| 20 | Envy Zinnia Seeds | Green | 50 | 2.95 | yes |

Use the following data types for your "flower\_seeds" columns:

*   id - SERIAL
*   name - VARCHAR that accepts 300 characters
*   main\_color - VARCHAR that accepts 100 characters
*   seeds\_per\_packet - INT
*   price\_per\_packet - FLOAT
*   in\_stock - BOOLEAN

_Note:_ Make sure to save your seed file on your machine so that you can pipe it into your database in the next phase!

Phase 3: Pipe your seed file into your new database
---------------------------------------------------

After you've saved your seed file, use the caret and pipe methods to seed your `farm` database with the data from the "edible_seeds" table. (\_Note: Make sure you've quit `psql` first with `\q`._)

There are two ways to seed your database:

### Method 1. Seed your database via caret method

```
psql -d [database] -U [username] < [path_to_file/file.sql]
```

### Method 2. Seed your database via pipe method

```
cat [path_to_file/file.sql] | psql -d [database] -U [username]
```

Try both of these methods.

### If you want to seed using the file again, you need to first drop the tables.

Access the database by:

```
psql -d [database] -U [username]
```

Then drop the tables:

```
DROP TABLE [table];
```

Then you can run the seed file again using any of the two above methods.

### Check to make sure your seed file has actually updated the `farm` database

*   Log into `psql` again.
*   Connect to the `farm` database (syntax: `\c [database]`).
*   Make sure your "edible\_seeds" table is filled with seeds: `SELECT * FROM «table name»;`
*   Make sure your "flower\_seeds" table is filled with seeds: `SELECT * FROM «table name»;`

Did you find this lesson helpful?

No

Yes

**✔︎ Submit Project**

Archive your file into a **.zip** folder and click **Submit Project** to upload.

Solutions become available after uploading.