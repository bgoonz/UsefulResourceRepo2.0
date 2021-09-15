#Where
Used to further filter our queries

```
SELECT name, breed FROM puppies
  WHERE breed = 'Corgi';
  ```
# Selecting between ranges.
  ``` 
 SELECT name, breed, age_yrs FROM puppies
  WHERE age_yrs BETWEEN 0 AND 0.6;
  ```
  
# Limit and offset.
```
SELECT name, breed
FROM puppies
ORDER BY age_yrs
LIMIT 100;
```
