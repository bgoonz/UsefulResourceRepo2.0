# Simple JS-Range

    A simple range function for javascript that handles both letters and numbers forward and in reverse.

## Installation

```sh
npm install simple-jsrange
```

## Usage example

Flags:

- step: Integer representing the incrementation. Default 1.
- inc: Boolean representing inclusive or exclusive range. Default true

`range(startVal, endVal, options = {step: int, inc: bool})`

```js
//Default usage -- {step: 1, inc: true}
range(1, 3); //[1,2,3]
range(3, 1); //[3,2,1]
range("a", "c"); //["a","b","c"]
range("c", "a"); //["c","b","a"]

//With user defined step
range(0, 10, { step: 2 }); //[0,2,4,6,8,10]

//Exclusive range
range(1, 3, { inc: false }); //[1,2]

//Exclusive + user defined step
range(0, 10, { step: 2, inc: false }); //[0,2,4,6,8]
```

## Release History

- 1.0.5 - Documentation
- 1.0.4 - Added range options
- 1.0.3 - Documentation
- 1.0.2 - Documentation
- 1.0.1 - Bug fixes
- 1.0.0 - Initial release

## Maintainer

William Vincent – william@william-vincent.dev - [GitHub](https://github.com/WJVincent)

Distributed under the MIT license. See `LICENSE` for more information.

## Contributing

1. Fork it (<https://github.com/WJVincent/js-range>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request
