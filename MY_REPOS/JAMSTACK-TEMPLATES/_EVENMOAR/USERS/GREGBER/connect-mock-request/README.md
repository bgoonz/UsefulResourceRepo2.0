[![Build Status](https://travis-ci.org/neoziro/connect-mock-request.png?branch=master)](https://travis-ci.org/neoziro/connect-mock-request)

# Connect mock request

Add a request method to connect app useful for testing app.

## Installing

````
npm install connect-mock-request
````

## How to use ?

````javascript
var request = require('connect-mock-request'),
    connect = require('connect'),
    app = connect()
          .use(function (req, res) {
            res.end('Hello world !');
          });

request(app)
.get('/')
.end(function (res) {
  console.log(res.body); // Hello World
});
````

## API

### request(method, path)

Execute a request using a method and a path.

````javascript
request(app)
.request('post', '/')
...
````

#### Aliases

All of these methods are avalaible via alias :

* GET
* POST
* PUT
* PATCH
* DELETE
* HEAD

````javascript
request(app)
.patch('/')
...
````

### set(name, value)

Set a header.

````javascript
request(app)
.set('Content-Type', 'application/json')
...
````

### write(data)

Write body data.

````javascript
request(app)
.write('{"user": "greg"}')
...
````

### end(callback)

End the request.

Callback takes a single `response` argument which contains all response attributes and a `body` attribute.

````javascript
request(app)
.get('/')
.end(function (res) {
  console.log(res.body);
});
````

## License

Copyright (c) 2012 Bergé Greg

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
