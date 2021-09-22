# Options API

> Set, enable, and disable application options

See [Config Overview](./config-overview.md) to learn more about the available methods for object caching and storage.

## .option

**Set an option:**

```js
app.option('a', true);
//=> {a: true}
```

**Get an option:**

```js
app.option('a');
//=> true
```

Or:

```js
var a = app.options.a;
//=> true
```

**Extend an option:**

```js
app.option({a: {b: 'c'}});
app.option({a: {d: 'e'}});
//=> {a: {b: 'c', d: 'e'}}
```

## .enable

Enable `key`:

```js
app.enable('a');
//=> {a: true}
```

## .disable

Disable `key`.

```js
app.disable('a');
//=> {a: false}
```

## .enabled

Check if `key` is enabled (truthy).

```js
app.enabled('a');
//=> false

app.enable('a');
app.enabled('a');
//=> true
```

## .disabled

Check if `key` is disabled (falsey).

```js
app.disabled('a');
//=> true

app.enable('a');
app.disabled('a');
//=> false
```

## .isTrue

Returns true if the value of `key` is strictly `true`.

```js
app.option('a', 'b');
app.isTrue('a');
//=> false

app.option('c', true);
app.isTrue('c');
//=> true
```

## .isFalse

Returns true if `key` is strictly `false`.

```js
app.option('a', null);
app.isFalse('a');
//=> false

app.option('c', false);
app.isFalse('c');
//=> true
```

## .isBoolean

Return true if `key` is either strictly `true` or strictly `false`.

```js
app.option('a', 'b');
app.isBoolean('a');
//=> false

app.option('c', true);
app.isBoolean('c');
//=> true
```

## .hasOption

Return true if `options.hasOwnProperty(key)`

```js
app.hasOption('a');
//=> false
app.option('a', 'b');
app.hasOption('a');
//=> true
```

## .flags

Generate an array of command line args from the given `keys` or all options.

```js
// set some options
app.option('foo', 'bar');
app.option('abc', true);
app.option('xyz', 10);
app.option('one', false);

// create command line args for all options
app.flags();
//=> ['--foo=bar', '--abc', '--xyz=10', '--no-one']

// or specific options
app.flags(['foo', 'abc']);
//=> ['--foo=bar', '--abc']
```
