# angular-ws-mock

# This plugin is no longer actively maintained, you can still use it but issues will not be resolved. If you want the npm name, you can contact me by email.

[![Build Status](https://travis-ci.org/neoziro/angular-ws-mock.svg?branch=master)](https://travis-ci.org/neoziro/angular-ws-mock)
[![Dependency Status](https://david-dm.org/neoziro/angular-ws-mock.svg?theme=shields.io)](https://david-dm.org/neoziro/angular-ws-mock)
[![devDependency Status](https://david-dm.org/neoziro/angular-ws-mock/dev-status.svg?theme=shields.io)](https://david-dm.org/neoziro/angular-ws-mock#info=devDependencies)

Mock for [AngularJS WebSocket service](https://github.com/neoziro/angular-ws).

## Install

```
bower install angular-ws-mock
```

## Usage

```js
describe('My service', function () {
  var ws, myService;

  beforeEach(module('app', 'wsMock'));

  beforeEach(inject(function ($injector) {
    ws = $injector.get('ws');
    myService = $injector.get('myService');
  }));

  it('should connect to the WebSocket', function () {
    ws.emit('open');

    expect(ws.getReadyState()).to.equal(1);
  });
```

### ws.emit(event, data)

Emit a new event.

```js
ws.emit('message', {data: 'my message'});
```

### ws.messages

Read the messages sent.

```js
ws.send('hello')
console.log(ws.messages); // ['hello']
```

### ws.reset()

Empty messages.

```js
ws.send('hello')
console.log(ws.messages); // ['hello']
ws.reset();
console.log(ws.messages); // []
```

## License

MIT
