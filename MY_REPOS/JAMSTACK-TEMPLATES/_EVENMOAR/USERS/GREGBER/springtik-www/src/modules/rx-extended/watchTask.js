import Rx from 'rxjs/Observable';

/**
 * @typedef {Object} TaskPayload
 * @property {Symbol} state (IDLE|PROGRESS|SUCCESS|ERROR)
 * @property {*=} input
 * @property {*=} output
 * @property {Error=} error
 */

/**
 * Async task watcher.
 *
 * @param {Function|Promise} selectorOrPromise
 * @returns {Rx.Observable.<TaskPayload>}
 */
Rx.Observable.prototype.watchTask = function watchTask(selectorOrPromise) {
  return this
    .switchMap(input => {
      const source$ = typeof selectorOrPromise === 'function'
          ? selectorOrPromise(input) : selectorOrPromise;
      const task$ = (typeof source$.then === 'function'
          ? Rx.Observable.fromPromise(source$)
          : source$)
        .map(output => ({success: true, input, output}))
        .catch(error => (Rx.Observable.from([{error, input}])));

      return Rx.Observable
        .from([{progress: true, input}])
        .concat(task$);
    })
    .startWith({idle: true});
};

Rx.Observable.watchTask = selectorOrPromise => {
  return Rx.Observable.from([undefined])
    .watchTask(selectorOrPromise);
};

Rx.Observable.prototype.resetTask = function resetTask({
  delay = 0,
  filter = () => true,
} = {}) {
  return this.switchMap(data =>
    Rx.Observable
      .from([data])
      .merge(
        Rx.Observable
          .from([data])
          .filter(filter)
          .delay(delay)
          .mapTo({idle: true})
      )
  );
};
