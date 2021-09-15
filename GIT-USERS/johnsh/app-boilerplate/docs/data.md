# Data API

> Set, load and extend data to be passed as context to templates

See [Config Overview](./config-overview.md) to learn more about the available methods for object caching and storage.

## .data

**Set and extend data:**

```js
app.data({a: {b: 'c'}});
app.data({a: {d: 'e'}});
//=> {a: {b: 'c', d: 'e'}}
```

**Load data:**

```js
app.data('*.json');
app.data(['foo/*.json', 'bar/*.{json,yml}']);
```

**Get data:**

Data is stored on the `app.cache.data` object:

```js
var a = app.cache.data.a;
//=> {b: 'c', d: 'e'}
```
