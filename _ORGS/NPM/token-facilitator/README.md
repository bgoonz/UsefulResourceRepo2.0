# Token Facilitator

Let's generate tokens and store them in redis!

It's pretty simple - we generate a random key associated with some data. That data gets stored as a string in redis.

```js
var data = {
  a: 'one',
  b: 'two'
};

var facilitator = new Facilitator({redis: client});
facilitator.generate(data)
  .then(function (token) {
    expect(token).to.exist();

    var key = sha(token);
    client.get(key, function (err, data) {
      expect(data).to.be.a.string();
      data = JSON.parse(data);
      expect(data.a).to.equal('one');
      expect(data.b).to.equal('two');
      done();
    });
  });
```

You can also set some options! Right now, our options include `timeout` and `prefix`:

```js
var opts = {
  timeout: 10, //seconds
  prefix: 'something:' // don't forget that separator!
};

facilitator.generate(data, opts)
  .catch(function (err) { /* ... */ })
  .then(function (key) {
    // now the key has a prefix of `something:` and will live for 10 seconds :-)
  });

```

# License

ISC

