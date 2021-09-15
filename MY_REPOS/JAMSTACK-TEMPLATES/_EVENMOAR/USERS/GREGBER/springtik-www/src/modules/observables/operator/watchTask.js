import {of} from 'rxjs/observable/of';
import {fromPromise} from 'rxjs/observable/fromPromise';
import {map} from 'rxjs/operator/map';
import {_catch} from 'rxjs/operator/catch';
import {concat} from 'rxjs/operator/concat';
import {switchMap} from 'rxjs/operator/switchMap';

const PROGRESS = 'progress';
const SUCCESS = 'success';
const ERROR = 'error';

/**
 * Returns state object.
 *
 * @returns {object} state
 * @returns {boolean} state.idle
 * @returns {boolean} state.progress
 * @returns {boolean} state.error
 * @returns {boolean} state.success
 */
function getState(state) {
  return {
    progress: state === PROGRESS,
    error: state === ERROR,
    success: state === SUCCESS,
  };
}

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
 * @param {Function} selector
 * @returns {Rx.Observable.<TaskPayload>}
 */
export function watchTask(selector) {
  return this
    ::switchMap(input => {
      const source$ = selector(input);
      const task$ = (typeof source$.then === 'function'
          ? fromPromise(source$)
          : source$)
        ::map(output => ({
          ...getState(SUCCESS),
          input,
          successOutput: output,
          output,
        }))
        ::_catch(errorOutput => (of({
          ...getState(ERROR),
          input,
          errorOutput,
        })));

      return of({...getState(PROGRESS), input})
        ::concat(task$);
    });
}

export function watchTaskStatic(selector) {
  return of(true)::watchTask(selector);
}
