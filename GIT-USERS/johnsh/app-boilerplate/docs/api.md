## API

> Persist, get and update config values

**Set**

Set a value on `app.config.cache`:

```js
app.config.set('foo', 'bar');
//=> {config: {cache: {foo: 'bar'}}}

app.config.set('baz');
//=> {config: {cache: {baz: true}}}
```