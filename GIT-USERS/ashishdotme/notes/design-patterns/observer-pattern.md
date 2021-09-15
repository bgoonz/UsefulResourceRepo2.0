# Observer Pattern

- The Observer pattern involves an observable object and multiple observers that are notified when the observable changes state
- Implemented using the EventEmitter interface in Node.js
- We use an emitter to emit events, which can be intercepted using listeners
- Multiple event listeners are executed in the order they were registered
