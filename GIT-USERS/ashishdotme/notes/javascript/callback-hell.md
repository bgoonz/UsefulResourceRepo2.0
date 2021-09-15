## Callback Hell

- The callback pattern is the default pattern for managing the outcome of an asynchronous method
- Nested callbacks become unmanageable and unreadable
- Nested callbacks are often termed as "Callback hell"

### Example

```javascript
firstFunction(args, function () {
  secondFunction(args, function () {
    thirdFunction(args, function () {
      // And so on…
    });
  });
});
```
