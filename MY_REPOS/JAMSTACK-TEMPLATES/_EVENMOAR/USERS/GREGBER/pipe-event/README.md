# pipe-event
[![Build Status](https://travis-ci.org/neoziro/pipe-event.svg?branch=master)](https://travis-ci.org/neoziro/pipe-event)
[![Dependency Status](https://david-dm.org/neoziro/pipe-event.svg?theme=shields.io)](https://david-dm.org/neoziro/pipe-event)
[![devDependency Status](https://david-dm.org/neoziro/pipe-event/dev-status.svg?theme=shields.io)](https://david-dm.org/neoziro/pipe-event#info=devDependencies)

Pipe an event from an event emitter to another.

## Install

```
npm install pipe-event
```

## Usage

```js
var pipeEvent = require('pipe-event');
pipeEvent(['error', 'complete'], sourceEventEmitter, targetEventEmitter);
```

### pipeEvent(events, source, target)

```
  {string|string[]} events Events to pipe
  {EventEmitter} source Source event emitter
  {EventEmitter} target Target event emitter
```

## License

MIT