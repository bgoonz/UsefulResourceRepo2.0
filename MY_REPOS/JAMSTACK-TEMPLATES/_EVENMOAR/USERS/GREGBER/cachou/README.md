# cachou [![Build Status](https://travis-ci.org/neoziro/angular-notification.svg?branch=master)](https://travis-ci.org/neoziro/angular-notification)

Simple and fast cache module based on redis.

## Install

```
npm install cachou
```

## Usage

```js
var cachou = require('cachou');

var cache = cachou();

cache.set('user:12', { foo: 'bar' }, function (err) { ... });
cache.get('user:23', function (err, user) { ... });
cache.del('user:23', function (err) { ... });
```

### cachou(options) / new cachou.Cache(options)

Create a new custom cache.

```js
var cache = cachou({ ttl: 20 });
```

or

```js
var cache = new cachou.Cache({ ttl: 20 });
```

There are several options avalaible:

#### redis

Type: `Object` or `Function`

If you specify an **object**, the properties will be used to call `redis.createClient` method. The redis module used
will be the Redis module installed. This project doesn't have [node_redis](https://github.com/mranney/node_redis/) module as dependency.

```js
var cache = cachou({
  redis: {
    port: 6379,
    host: '127.0.0.1',
    connect_timeout: 200
  }
})
```

If you specify a **function**, it will be called to create redis client.

```js
var redis = require('redis');

var cache = cachou({
  redis: createClient
})

function createClient() {
  var client = redis.createClient();
  client.select(1); // Choose a custom database.
  return client;
}
```

#### ttl

Type: `Number`

Specify the time after the cache will expire in milliseconds.

```js
var cache = cachou({
  ttl: 3600 // 1 hour
});
```

#### prefix

Type: `String`

Specify the prefix of the keys.

```js
var cache = cachou({
  prefix: 'myprefix:'
});
```

### cache.get(key, callback)

Fetch a data from the cache.

```js
cache.get('my:key', function (err, data) { ... });
```

### cache.set(key, data, callback)

Put a data in the cache.

```js
cache.set('my:key', { foo: 'bar' }, function (err) { ... });
```

### cache.del(key, callback)

Remove a key from the cache.

```js
cache.del('my:key', function (err) { ... });
```

### cache.delAll(pattern, callback)

Delete key using a glob matching pattern.

```js
cache.delAll('my:*', function (err) { ... }); // Will delete all keys starting with "my:"
```

## License

MIT
