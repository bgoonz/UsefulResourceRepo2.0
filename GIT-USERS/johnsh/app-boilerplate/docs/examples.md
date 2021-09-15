## Examples

Since this library uses orchestrator and vinyl, tasks have the same API as [gulp]:

```js
app.task('default', function() {
  app.src('vendor/*.js')
    .pipe(app.src('dist'));
});
```

**Tasks with plugins**

```js
var one = require('plugin-one');
var two = require('plugin-two');

app.task('default', function() {
  app.src('vendor/*.js')
    .pipe(one())
    .pipe(two())
    .pipe(app.src('dist'));
});
```
