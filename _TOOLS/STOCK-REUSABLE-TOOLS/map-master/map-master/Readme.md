# map

  Map an object or array.

## Installation

    $ component install ianstormtaylor/map
    $ npm install ianstormtaylor/map

## Example

Arrays:

```js
var map = require('map');

map([1, 2, 3], function (val, i) {
  return 10 + val;
});

// [11, 12, 13]
```

Objects:

```js
var map = require('map');

map({ a: 1, b: 2, c: 3 }, function (key, val) {
  return 10 + val;
});

// [11, 12, 13]
```

## API

### map(obj, iterator)
  Map the `obj` using an `iterator`.

## License

  MIT
