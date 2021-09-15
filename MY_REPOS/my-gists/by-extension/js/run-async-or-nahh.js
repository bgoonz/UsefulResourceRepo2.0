function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

/**
 * Return a function that will run a function asynchronously or synchronously
 *
 * example:
 * runAsync(wrappedFunction, callback)(...args);
 *
 * @param   {Function} func  Function to run
 * @param   {Function} cb    Callback function passed the `func` returned value
 * @return  {Function(arguments)} Arguments to pass to `func`. This function will in turn
 *                                return a Promise (Node >= 0.12) or call the callbacks.
 */

const runAsync = module.exports = (func, cb) => {
  cb = cb || (() => {});

  return function () {

    const args = arguments;

    const promise = new Promise((resolve, reject) => {
      let resolved = false;
      const wrappedResolve = value => {
        if (resolved) {
          console.warn('Run-async promise already resolved.')
        }
        resolved = true;
        resolve(value);
      }

      let rejected = false;
      const wrappedReject = value => {
        if (rejected) {
          console.warn('Run-async promise already rejected.')
        }
        rejected = true;
        reject(value);
      }

      let usingCallback = false;
      let callbackConflict = false;
      let contextEnded = false;

      const answer = func.apply({
        async() {
          if (contextEnded) {
            console.warn('Run-async async() called outside a valid run-async context, callback will be ignored.');
            return () => {};
          }
          if (callbackConflict) {
            console.warn('Run-async wrapped function (async) returned a promise.\nCalls to async() callback can have unexpected results.');
          }
          usingCallback = true;
          return (err, value) => {
            if (err) {
              wrappedReject(err);
            } else {
              wrappedResolve(value);
            }
          };
        }
      }, Array.prototype.slice.call(args));

      if (usingCallback) {
        if (isPromise(answer)) {
          console.warn('Run-async wrapped function (sync) returned a promise but async() callback must be executed to resolve.');
        }
      } else {
        if (isPromise(answer)) {
          callbackConflict = true;
          answer.then(wrappedResolve, wrappedReject);
        } else {
          wrappedResolve(answer);
        }
      }
      contextEnded = true;
    });

    promise.then(cb.bind(null, null), cb);

    return promise;
  };
};

runAsync.cb = (func, cb) => {
  return runAsync(function () {
    const args = Array.prototype.slice.call(arguments);
    if (args.length === func.length - 1) {
      args.push(this.async());
    }
    return func.apply(this, args);
  }, cb);
};
