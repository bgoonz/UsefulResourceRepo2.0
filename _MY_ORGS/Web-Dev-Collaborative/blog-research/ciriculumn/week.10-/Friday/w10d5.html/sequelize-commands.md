revoke connect ondatabase_name on public

```\l``` to view databases in psql or ``psql -c "\l"`` in ubuntu cli


```references {tableName}({primaryKey})```

Start a sequelize project by
```npx sequelize init```
 
can use ```psql -c "Postgres code here"``` to create stuff without logging in the psql.

Inserting data with foreign keys, put in the ID of that foreign key
```
INSERT INTO merchants
VALUES
('Zingo', 1 //this is an ID//, CURRENT_TIMESTAMP )
```


# Joining
Join before the order by statement
```
SELECT users.full_name, merchant_types.type, countries.name, merchants.merchant_name
FROM countries
JOIN merchants on merchants.country_id = countries.id
JOIN users ON users.id = merchants.admin.id
JOIN merchant_types ON merchant_types.id = marchants.merchant_types_id 
ORDER BY merchants.merchant_name
```
how to set foreign keys on a migration file
```references:{model:DJFKS}```

# generateing seed files in cli

```npx sequelize-cli seed:generate --name demo-user```

Add to the up in seed file
```return queryInterface.bulkInsert(tableName, arrayOfObjects. {});```

Add to the down in seed file
```return queryInterface.bulkDelete(tableName, null. {});```

# add associations through the model files
```
function(models){
  Person.belongsToMany(models.Course,{
    through: models.Enrollment.
    foreign:Key: 'personId'.
    otherKey: 'courseId'
    });
}
```
```
function(models){
  Course.belongsToMany(models.person, {
  through:models.Enrollment,
  foreignKey: 'courseId',
  otherKey: 'personId'
  }
  Course.belongsTo(model.campus, {
    through:models.Enrollment,
    foreignKey: ''
  })
}
```
