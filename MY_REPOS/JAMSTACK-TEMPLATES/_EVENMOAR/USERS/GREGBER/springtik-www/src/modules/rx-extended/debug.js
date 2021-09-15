import Rx from 'rxjs/Observable';

/**
 * Log observable labeled output.
 *
 * @param {string} label
 * @param {boolean} [showValue=true]
 * @returns {Rx.Observable.<*>}
 */
Rx.Observable.prototype.debug = function debug(label = 'debug', showValue = true) {
  /* global console */
  /* eslint no-console: 0 */
  return this.do(xs => console.log(label, showValue ? xs : ''));
};
