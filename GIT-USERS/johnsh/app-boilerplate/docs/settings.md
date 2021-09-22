# Settings

> Set, get and delete values

See [Config Overview](./config-overview.md) to learn more about the available methods for object caching and storage.

## .set

Set a value:

```js
app.set('a', 'b');
//=> {cache: {a: 'b'}

app.set('c.d.e', 'f');
//=> {cache: {c: {d: {e: 'f'}}}
```

## .extend

Extend a value:

```js
app.set('a', {b: 'c'});
app.extend({a: {d: 'e'}});
//=> {cache: {a: {b: 'c', d: 'e'}}}
```

## .union

Push elements onto an array value:

```js
app.set('a', ['a', 'b']);
app.union('a', ['c', 'd']);
//=> {cache: {a: ['a', 'b', 'c', 'd']}}
```

## .get

Get a value: 

```js
app.get('a');
//=> 'b'
```

**Nested properties**

Given: `{cache: {a: 'b', c: {d: {e: 'f'}}}`

```js
app.get('c.d.e'); 
//=> 'f'
```

**Direct reference**

```js
var a = app.cache.a;
//=> 'b'

var c = app.cache.c.d.e;
//=> 'f'
```

## .del

Delete a property:

```js
app.del('a');
app.get('a');
//=> undefined
```

## .omit

Omit `key` or an array of keys: 

```js
app.omit('a');
app.omit(['a', 'b']);
```
