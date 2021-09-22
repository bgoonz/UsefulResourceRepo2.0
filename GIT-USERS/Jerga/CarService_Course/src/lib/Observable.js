class Observer {
  constructor(handlers) {
    this._handlers = handlers;
    this.isSubscribed = true;
  }

  next(value) {
    if (this._handlers[0] && this.isSubscribed) {
      this._handlers[0](value);
    }
  }

  error(error) {
    if (this._handlers[1] && this.isSubscribed) {
      this._handlers[1](error);
    }

    this.isSubscribed = false;
  }

  complete() {
    if (this._handlers[2] && this.isSubscribed) {
      this._handlers[2]();
    }

    this.isSubscribed = false;
  }
}

class Observable {
  constructor(executionFunction) {
    this._executionFunction = executionFunction;
  }

  subscribe(...handlers) {
    const observer = new Observer(handlers);
    this._executionFunction(observer);
  }
}

// module.exports = Observable;
exports.Observable = Observable;
