## Engines

> Register template engines to use for rendering templates

### Register engines

**Consolidate**

Register an engine using [consolidate]:

```js
var consolidate = require('consolidate');
app.engine('hbs', consolidate.handlebars);
app.engine('md', consolidate.lodash);
```

**Engines**

Register an engine using [engines], a library that offers synchronous engine support with consolidate conventions.

```js
var engine = require('engines');
app.engine('hbs', engine.handlebars);
app.engine('md', engine.lodash);
```

**Author your own**

Engines take a string, (optional) options and a callback:

```js
app.engine('foo', function(str, options, cb) {
  if (typeof options === 'function') {
    cb = options;
    options = {};
  }
  // do stuff to string
  try {
    cb(null, str);
  } catch(err) {
    cb(err);
  }
});
```

