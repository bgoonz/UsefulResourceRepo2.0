# Config API

> API for persisting and getting values that can be used across projects

See [Config Overview](./config-overview.md) to learn more about the available methods for object caching and storage.

The config store persists values to disk. If you want to just get/set values in memory, just use

## .set

Set a value:

```js
app.config.set('foo', 'bar');
```

## .get

Get a value:

```js
app.config.get('foo');
//=> 'bar'
```

Settings are stored on the `app.config.data` object, so you can also do:

```js
var setting = app.config.data.foo;
//=> 'bar'
```


## .del

Delete a value:

```js
app.config.del('foo');
app.config.get('foo');
//=> undefined
```
