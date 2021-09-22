```
SELECT * FROM puppies
INNER JOIN breeds ON (puppies.breed_id = breeds.id);
```
The JOIN operation above is joining the "puppies" table with the "breeds" table together into a single table using the foreign key/primary key shared between the two tables: breed_id.

You should get all rows back containing all information for the puppies and breeds with matching breed_id values:
