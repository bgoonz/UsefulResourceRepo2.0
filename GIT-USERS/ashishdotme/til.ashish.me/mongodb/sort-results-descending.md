# Sort results in descending

-1 for descending and 1 for ascending

```javascript
todos
  .find({ completed: true }, { sort: { completedDate: -1 } })
  .then((completedTodos) => {});
```
