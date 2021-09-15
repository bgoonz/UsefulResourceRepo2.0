"use strict";
import WorkerSettings from "../WorkerSettings";
import isIterator from "./isIterator";

/**
 * DON'T CALL THIS FUNCTION EXPLICITLY. It's inserted by a transform.
 *
 * In environments that does not support workers, we are using this synchronous
 * version.
 *
 * @param {string} method The name on the root jsnx object to execute.
 * @param {Array} args An array of arguments to send to the worker.
 *    Some types, such as graphs, are converted to a different format first.
 * @return {Promise}
 */
export default function delegateSync(method, args) {
  return new Promise((resolve, reject) => {
    try {
      // We have to do the same here as we do in the worker, which is
      // returning an array if we get back an iterator
      let result = WorkerSettings.methodLookupFunction(method).apply(
        null,
        args
      );
      if (isIterator(result)) {
        result = Array.from(result);
      }
      resolve(result);
    } catch (ex) {
      reject(ex);
    }
  });
}

"use strict";

import Worker from "./Worker";
import WorkerSettings from "../WorkerSettings";
import delegateSync from "./delegateSync";
import { serializeAll, deserialize } from "./message";

let delegateImplementation;
if (typeof Worker === "function") {
  // Workers are supported
  delegateImplementation = (method, args) => {
    const { serializable, serializedValues } = serializeAll(args);

    if (!serializable) {
      console.info(
        `At least one argument can't be serialized and sent to the worker. ` +
          `We will run ${method} in the same thread instead.`
      );
      return delegateSync(method, args);
    }

    return new Promise((resolve, reject) => {
      const worker = new Worker(WorkerSettings.workerPath);
      worker.addEventListener(
        "message",
        ({ data }) => resolve(deserialize(data)),
        false
      );
      worker.addEventListener("error", reject, false);
      worker.postMessage({ method, args: serializedValues });
    });
  };
} else {
  delegateImplementation = (method, args) => {
    console.info(
      `Workers are not supported in this environment, so "${method}" will ` +
        `run in the same thread instead. This might block the environment.`
    );
    return delegateSync(method, args);
  };
}

/**
 * DON'T CALL THIS FUNCTION EXPLICITLY. It's inserted by a transform.
 *
 * Tries to create a worker and pass the arguments to it. Copying large graphs
 * is not very fast, but still faster than running most algorithms
 * synchronously.
 *
 * Falls back to synchronous execution if browser doesn't support workers.
 *
 * This returns a promise which gets resolved with the result sent from the
 * worker or the synchronous functions.
 *
 * @param {string} method The name on the root jsnx object to execute.
 * @param {Array} args An array of arguments to send to the worker.
 *    Some types, such as graphs, are converted to a different format first.
 * @return {Promise}
 */
export default function delegateToWorker(method, args) {
  return delegateImplementation(method, args);
}

"use strict";
/**
 * Implements a simple event emitter to be merged into other objects.
 *
 * Usage:
 *
 * var e = require('./emitter');
 * var emit = e(someObject);
 *
 * // somewhere else
 * someObject.on('foo', x => console.log(x));
 *
 * // here
 * emit('foo', 'bar');
 */

export default function (obj) {
  const listeners = Object.create(null);

  function on(type, listener, thisObj) {
    const typeListeners = listeners[type] || (listeners[type] = []);
    typeListeners.push(listener, thisObj);
  }

  function off(type, listener) {
    const typeListeners = listeners[type];
    if (!typeListeners) {
      return;
    }
    if (!listener) {
      typeListeners.length = 0;
      return;
    }
    for (let i = 0; i < typeListeners.length; i += 2) {
      if (typeListeners[i] === listener) {
        typeListeners.splice(i, 2);
        break;
      }
    }
  }

  function emit(type, msg) {
    const typeListeners = listeners[type];
    if (!typeListeners) {
      return;
    }
    let i = 0;
    Promise.resolve(msg).then(function cb(msg) {
      //eslint-disable-line no-shadow
      typeListeners[i].call(typeListeners[i + 1], msg);
      i += 2;
      if (i < typeListeners.length) {
        return Promise.resolve(msg).then(cb);
      }
    });
  }

  if (obj) {
    Object.assign(obj, { on, off });
    return emit;
  }
  return { on, off, emit };
}

"use strict";

/**
 * Creates an array of `n` elements, each being `value`.
 *
 * @param {number} n Number of elements in the array
 * @param {?} value The value to put in each location
 * @return {Array}
 */
export default function fillArray(n, value) {
  const array = new Array(n);
  for (let i = 0; i < n; i++) {
    array[i] = value;
  }
  return array;
}

"use strict";

import isIterable from "./isIterable";
import isIterator from "./isIterator";

/**
 * Helper to iterate over sequence types (arrays, array-like objects,
 * objects, etc)
 *
 * @param {Iterable} seq
 * @param {function(this:T, ...)} callback
 * @param {T=} optThisObj
 * @template T
 */
export default function forEach(seq, callback, optThisObj) {
  if (Array.isArray(seq)) {
    let i = 0;
    let l = seq.length;
    if (optThisObj) {
      for (; i < l; i++) {
        callback.call(optThisObj, seq[i], i);
      }
    } else {
      for (; i < l; i++) {
        callback(seq[i], i);
      }
    }
    return;
  }
  if (isIterable(seq)) {
    seq = seq[Symbol.iterator]();
  }
  if (isIterator(seq)) {
    let v;
    var i;
    // Avoiding call if it is not necessary is faster in some browsers
    if (optThisObj !== undefined) {
      for (v of seq) {
        i += 1;
        callback.call(optThisObj, v, i);
      }
    } else {
      for (v of seq) {
        i += 1;
        callback(v, i);
      }
    }
  } else if (seq && typeof seq === "object") {
    if (optThisObj) {
      for (let prop in seq) {
        callback.call(optThisObj, seq[prop], prop);
      }
    } else {
      for (let prop in seq) {
        callback(seq[prop], prop);
      }
    }
  }
}

"use strict";

/**
 * Computes the greatest common divisor of two numbers using Euclid's algorithm.
 *
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
export default function gcd(a, b) {
  while (b !== 0) {
    const _ = a;
    a = b;
    b = _ % b;
  }
  return a;
}

"use strict";

import range from "./range";

function reversed(array) {
  return array.slice().reverse();
}

/**
 * Implements Python's itertools.combinations
 *
 * Return r length subsequences of elements from the input iterable.
 *
 * @param {Iterable} iterable
 * @param {number} r
 *
 * @return {Iterator}
 */
export default function* genCombinations(iterable, r) {
  // genCombinations('ABCD', 2) --> AB AC AD BC BD CD
  // genCombinations(range(4), 3) --> 012 013 023 123
  const pool = Array.from(iterable);
  const n = pool.length;
  if (r > n) {
    return;
  }
  const indicies = range(r);
  const reversedIndicies = reversed(indicies);
  yield indicies.map((i) => pool[i]);
  while (true) {
    let i;
    let k = 0;
    for (; k < reversedIndicies.length; k++) {
      i = reversedIndicies[k];
      if (indicies[i] !== i + n - r) {
        break;
      }
    }
    if (reversedIndicies.length === k) {
      return;
    }
    indicies[i] += 1;
    for (let j = i + 1; j < r; j++) {
      indicies[j] = indicies[j - 1] + 1;
    }
    yield indicies.map((i) => pool[i]); // eslint-disable-line no-loop-func
  }
}

"use strict";

import range from "./range";

/**
 * Implements Python's itertools.permutations
 *
 * Return successive r length permutations of elements in the iterable.
 * *
 * @param {Iterable} iterable
 * @param {number=} opt_r
 *
 * @return {Iterator}
 */
export default function* genPermutations(iterable, r) {
  // genPermutations('ABCD', 2) --> AB AC AD BA BC BD CA CB CD DA DB DC
  // genPermutations(range(3)) --> 012 021 102 120 201 210
  const pool = Array.from(iterable);
  const n = pool.length;
  r = r == null ? n : r;
  if (r > n) {
    return;
  }
  const indicies = range(n);
  const cycles = range(n, n - r, -1);
  const rangeR = range(r - 1, -1, -1);
  yield indicies.slice(0, r).map((i) => pool[i]);
  while (true) {
    let k = 0;
    for (; k < rangeR.length; k++) {
      let i = rangeR[k];
      cycles[i] -= 1;
      let index = indicies[i];
      if (cycles[i] === 0) {
        indicies.splice(i, 1);
        indicies.push(index);
        cycles[i] = n - i;
      } else {
        let j = cycles[i];
        indicies[i] = indicies[indicies.length - j];
        indicies[indicies.length - j] = index;
        /* eslint-disable no-loop-func */
        yield indicies.slice(0, r).map((i) => pool[i]);
        /* eslint-enable no-loop-func */
        break;
      }
    }
    if (rangeR.length === k) {
      return;
    }
  }
}

"use strict";

/**
 * Implements Python's range function, returns an iterator.
 *
 * If one argument n is passed, iterates over 0...n.
 * If two arguments i,j are passed, iterates over i...j.
 * If three arguments i,j,k are passed, iterates over i, i+k, i+2k, ...j
 *
 * @param {?number=} opt_start Number to start from
 * @param {?number=} opt_end Number to count to
 * @param {?number=} opt_step Step size
 * @return {!Iterator}
 */
export default function* genRange(optStart, optEnd, optStep) {
  if (optStart == null) {
    return;
  } else if (optEnd == null) {
    optEnd = optStart;
    optStart = 0;
    optStep = 1;
  } else if (optStep == null) {
    optStep = 1;
  } else if (optStep === 0) {
    throw new RangeError("opt_step can't be 0");
  }

  const negative = optStep < 0;
  for (
    let i = optStart;
    (negative && i > optEnd) || (!negative && i < optEnd);
    i += optStep
  ) {
    yield i;
  }
}

"use strict";

/**
 * Returns the second argument if the first argument is null or undefined.
 *
 * @param {*} value
 * @param {*} defaultValue
 * @return {?}
 */
export default function get(value, defaultValue) {
  return value == null ? defaultValue : value;
}

"use strict";

import Arrays from "./Arrays";
import Map from "./Map";
import PriorityQueue from "./PriorityQueue";
import Set from "./Set";
import clone from "./clone";
import clear from "./clear";
import deepcopy from "./deepcopy";
import deepmerge from "./deepmerge";
import gcd from "./gcd";
import genCombinations from "./genCombinations";
import genPermutations from "./genPermutations";
import genRange from "./genRange";
import getDefault from "./getDefault";
import fillArray from "./fillArray";
import forEach from "./forEach";
import isArrayLike from "./isArrayLike";
import isBoolean from "./isBoolean";
import isGraph from "./isGraph";
import isIterable from "./isIterable";
import isIterator from "./isIterator";
import isMap from "./isMap";
import isPlainObject from "./isPlainObject";
import mapIterator from "./mapIterator";
import mapSequence from "./mapSequence";
import max from "./max";
import next from "./next";
import nodesAreEqual from "./nodesAreEqual";
import range from "./range";
import someIterator from "./someIterator";
import toIterator from "./toIterator";
import * as tuple from "./tuple";
import size from "./size";
import sprintf from "./sprintf";
import zipIterator from "./zipIterator";
import zipSequence from "./zipSequence";

export {
  Arrays,
  Map,
  PriorityQueue,
  Set,
  clone,
  clear,
  deepcopy,
  deepmerge,
  gcd,
  genCombinations,
  genPermutations,
  genRange,
  getDefault,
  fillArray,
  forEach,
  isArrayLike,
  isBoolean,
  isGraph,
  isIterable,
  isIterator,
  isMap,
  isPlainObject,
  mapIterator,
  mapSequence,
  max,
  next,
  nodesAreEqual,
  range,
  someIterator,
  toIterator,
  tuple,
  size,
  sprintf,
  zipIterator,
  zipSequence,
};

export * from "./tuple";

"use strict";

/**
 * Returns true of the array is an object and has a numerical length property.
 *
 * @param {?} v
 * @return {bool}
 */
export default function isArrayLike(v) {
  return (
    v &&
    typeof v === "object" &&
    typeof v.length === "number" &&
    typeof v !== "function"
  );
}

"use strict";
import isBoolean from "lodash/lang/isBoolean";
export default isBoolean;

"use strict";

/**
 * Returns true if value is a Graph
 *
 * @param {*} value
 * @return {bool}
 */
export default function isGraph(value) {
  // We are not using instanceof to avoid circular dependencies
  return value && typeof value.addNode === "function";
}

"use strict";

/**
 * Returns true if object implement the @@iterator method.
 *
 * @param {*} obj

 * @return {boolean}
 */
export default function isIterable(obj) {
  return typeof obj[Symbol.iterator] === "function";
}

"use strict";

/**
 * Returns true if object is an iterator
 *
 * @param {*} obj
 *
 * @return {boolean}
 */
export default function isIterator(obj) {
  return obj && typeof obj.next === "function";
}

"use strict";

import Map from "./Map";

/**
 * Tests whether the value is a Map.
 *
 * @param {*} v The value to test
 * @return {bool}
 */
export default function isMap(v) {
  return v instanceof Map;
}

"use strict";
import isPlainObject from "lodash/lang/isPlainObject";
export default isPlainObject;

"use strict";

import Set from "./Set";

/**
 * Tests whether the value is a Map.
 *
 * @param {*} v The value to test
 * @return {bool}
 */
export default function isSet(v) {
  return v instanceof Set;
}

"use strict";

/**
 * Returns an array of [key, value] pairs for the given object (just like
 * Python's dict.items()).
 *
 * @param {Object} obj
 * @return {!Array}
 */
import items from "lodash/object/pairs";
export default items;

"use strict";

import items from "./items";
import toIterator from "./toIterator";

/**
 * Returns an iterator of [key, value] pairs for the given object (just like
 * Python's dict.iteritems()).
 *
 * @param {Object} obj
 * @return {!Array}
 */
export default function iteritems(obj) {
  return toIterator(items(obj));
}

"use strict";
/**
 * @fileoverview
 * A shim for ES6 maps and support for custom hash functions via toString()
 * and does not accept arrays as keys (just like Python does not accept lists).
 */

import clear from "./clear";
import isIterable from "./isIterable";
import isFunction from "lodash/lang/isFunction";
import isObject from "lodash/lang/isObject";
import isArrayLike from "./isArrayLike";
import size from "lodash/collection/size";

export default class Map {
  /**
   * @param {Iterable=} opt_data An object, array or iterator to
   *  populate the map with. If 'data' is an array or iterable, each element is
   *  expected to be a 2-tuple. The first element will be the key and second the
   *  value.
   *  If it is an object, the property names will be the keys and the value the
   *  values.
   */
  constructor(optData) {
    // Can't use class syntax because of generator functions
    this._stringValues = Object.create(null); // strings
    this._numberValues = Object.create(null); // numbers
    this._values = Object.create(null); // every other value
    this._keys = Object.create(null);

    if (optData != null) {
      if (isIterable(optData)) {
        for (let [key, value] of optData) {
          this.set(key, value);
        }
      } else if (isArrayLike(optData)) {
        for (let i = 0; i < optData.length; i++) {
          let [key, value] = optData[i];
          this.set(key, value);
        }
      } else if (isObject(optData)) {
        for (let key in optData) {
          this.set(isNaN(+key) ? key : +key, optData[key]);
        }
      }
    }
  }

  /**
   * Returns the appropriate storage object for a given key.
   *
   * @param {*} key
   * @return {Object}
   * @private
   */
  _getStorage(key) {
    switch (typeof key) {
      case "number":
        return this._numberValues;
      case "string":
        return this._stringValues;
      default:
        return this._values;
    }
  }

  /**
   * Returns the value for the given key.
   *
   * Unlike native ES6 maps, this also accepts a default value which is returned
   * if the map does not contain the value.
   *
   * @param {*} key
   * @param {*=} optDefaultValue
   *
   * @return {*}
   * @export
   */
  get(key, optDefaultValue) {
    const storage = this._getStorage(key);
    return key in storage ? storage[key] : optDefaultValue;
  }

  /**
   * Returns true if the key is in the map.
   *
   * @param {*} key
   *
   * @return {boolean}
   * @export
   */
  has(key) {
    return key in this._getStorage(key);
  }

  /**
   * Adds the value and key to the map.
   *
   * @param {*} key
   * @param {*} value
   *
   * @return {Map} the map object itself
   * @export
   */
  set(key, value) {
    const values = this._getStorage(key);
    values[key] = value;

    // save actual key value
    if (values === this._values) {
      this._keys[key] = key;
    }

    return this;
  }

  /**
   * Remove value with given key.
   *
   * @param {*} key
   *
   * @return {boolean}
   * @export
   */
  delete(key) {
    const values = this._getStorage(key);
    if (key in values) {
      delete values[key];
      if (values === this._values) {
        delete this._keys[key];
      }
      return true;
    }
    return false;
  }

  /**
   * Returns an array of (key, value) tuples.
   *
   * @return {!Iterator}
   * @export
   */
  *entries() {
    let key;
    for (key in this._numberValues) {
      yield [+key, this._numberValues[key]];
    }
    for (key in this._stringValues) {
      yield [key, this._stringValues[key]];
    }
    for (key in this._values) {
      yield [this._keys[key], this._values[key]];
    }
  }

  /**
   * Returns an iterator over keys.
   *
   * @return {!Iterator}
   * @export
   */
  *keys() {
    let key;
    for (key in this._numberValues) {
      yield +key;
    }
    for (key in this._stringValues) {
      yield key;
    }
    for (key in this._values) {
      yield this._keys[key];
    }
  }

  /**
   * Returns an array of values.
   *
   * @return {!Array}
   * @export
   */
  *values() {
    let key;
    for (key in this._numberValues) {
      yield this._numberValues[key];
    }
    for (key in this._stringValues) {
      yield this._stringValues[key];
    }
    for (key in this._values) {
      yield this._values[key];
    }
  }

  /**
   * Returns the number of element in the map.
   *
   * @return {number}
   * @export
   */
  get size() {
    return (
      size(this._values) + size(this._numberValues) + size(this._stringValues)
    );
  }

  /**
   * Empties the map.
   *
   * @export
   */
  clear() {
    clear(this._stringValues);
    clear(this._numberValues);
    clear(this._values);
    clear(this._keys);
  }

  /**
   * Executes the provided callback for each item in the map.
   *
   * @param {function(*,*)} callback A function which gets the key as first
   *  argument and value as second argument.
   * @param {*=} opt_this Object/value to set this to inside the callback
   * @export
   */
  forEach(callback, optThis) {
    if (!isFunction(callback)) {
      throw new TypeError("callback must be a function");
    }
    for (const v of this.entries()) {
      callback.call(optThis, v[1], v[0], this);
    }
  }

  /**
   * Returns an iterator for the map object.
   *
   * @return {Iterator}
   */
  [Symbol.iterator]() {
    return this.entries();
  }
}

"use strict";

/**
 * Returns a new iterator which maps every value from the provided iterator via
 * the callback function.
 *
 * @param {Iterator} iterator
 * @param {function} map
 * @param {?=} opt_this_obj
 * @return {Iterator}
 */
export default function* mapIterator(iterator, map, optThisObj) {
  for (const v of iterator) {
    yield map.call(optThisObj, v);
  }
}

"use strict";

import isPlainObject from "lodash/lang/isPlainObject";
import mapValues from "lodash/object/mapValues";

import isArrayLike from "./isArrayLike";
import isIterable from "./isIterable";
import isIterator from "./isIterator";
import mapIterator from "./mapIterator";

const nativeMap = Array.prototype.map;

/**
 * Helper to map sequence types (arrays, array-like objects, objects, etc).
 * Note that if an array-like object is passed, an array is returned:
 *
 * Array -> Array
 * ArrayLike -> Array
 * Iterator -> Iterator
 * Iterable -> Iterator
 * Object -> Object
 *
 * @param {Iterable} sequence
 * @param {function(this:T,...)} callback
 * @param {T=} this_obj
 * @template T
 *
 * @return {(Array|Object|Iterator)}
 */
export default function mapSequence(sequence, callback, thisObj) {
  if (isArrayLike(sequence)) {
    return nativeMap.call(sequence, callback, thisObj);
  } else if (isIterable(sequence)) {
    sequence = sequence[Symbol.iterator]();
  }
  if (isIterator(sequence)) {
    return mapIterator(sequence, callback, thisObj);
  } else if (isPlainObject(sequence)) {
    return mapValues(sequence, callback, thisObj);
  } else {
    throw new TypeError("Can't map value of type %s", typeof sequence);
  }
}

"use strict";

import forEach from "./forEach";

/**
 * Returns the maximum value from an iterable. It uses the optional callback
 * function to determine the value to compare.
 *
 * @param {Iterable} iterable
 * @param {function(?): ?} map
 * @return {?}
 */
export default function max(iterable, map) {
  let maxComparisonValue = -Infinity;
  let maxValue;

  forEach(iterable, (value) => {
    const comparisonValue = map ? map(value) : value;
    if (comparisonValue > maxComparisonValue) {
      maxComparisonValue = comparisonValue;
      maxValue = value;
    }
  });

  return maxValue;
}

'use strict';

import isIterable from './isIterable';
import isPlainObject from './isPlainObject';
import Map from './Map';
import Set from './Set';
import * as classes from '../classes';

const KEY = '__type-jsnx__';

/**
 * @fileoverview
 * Helper methods to serialize and unserialize data for communicating with
 * workers.
 */

function serializeSet(value) {
  // TODO: serialize nested values
  return {
    [KEY]: 'Set',
    data: Array.from(value.values())
  };
}

function deserializeSet(value) {
  return new Set(value.data);
}

function serializeMap(value) {
  return {
    [KEY]: 'Map',
    data: [for ([k,v] of value) [k, serialize(v)]]//eslint-disable-line no-undef
  };
}

function deserializeMap(value) {
  return new Map(value.data.map(kv => (kv[1] = deserialize(kv[1]), kv)));
}

function serializeGraph(value) {
  // TODO: serialize complex edge and node data
  return {
    [KEY]: value.constructor.__name__,
    data: value.graph,
    nodes: Array.from(value.node),
    edges: value.edges(null, true)
  };
}

function deserializeGraph(value) {
  var G = new classes[value[KEY]](value.edges, value.data);
  G.addNodesFrom(value.nodes);
  return G;
}

/**
 * Returns true if the value can be properly serialized, otherwise false.
 *
 * @param {*} value
 * @return {boolean}
 */
export function isSupported(value) {
  var type = typeof value;
  return (
    // Primitives
    value == null ||
    type === 'string' ||
    type === 'number' ||
    type === 'boolean' ||

    // Objects and arrays (we just assume they contain only primitives)
    isPlainObject(value) ||
    Array.isArray(value) ||

    // Our custom collections (shallow)
    value instanceof Map ||
    value instanceof Set ||

    // Graphs
    value.constructor.__name__ === 'Graph' ||
    value.constructor.__name__ === 'DiGraph' ||

    // Generic iterables
    isIterable(value)
  );
}

export function serialize(value) {
  // primitives
  var type = typeof value;
  if (!value || type === 'string' || type === 'number' || type === 'boolean') {
    return value;
  }
  // Collections
  if (value instanceof Set) {
    return serializeSet(value);
  }
  else if (value instanceof Map) {
    return serializeMap(value);
  }
  // Graphs
  else if (value.constructor.__name__ === 'Graph' ||
    value.constructor.__name__ === 'DiGraph') {
    return serializeGraph(value);
  }
  // Iterables
  else if (isIterable(value)) {
    // We keep it simple for now and don't serialize the values of the iterable
    // itself
    return Array.from(value);
  }
  // TODO: Handle arrays and objects better

  // default
  return value;
}

export function deserialize(value) {
  // primitives
  var type = typeof value;
  if (!value || type === 'string' || type === 'number' || type === 'boolean') {
    return value;
  }
  // custom serializtion?
  if (value[KEY]) {
    switch(value[KEY]) {
      case 'Map':
        return deserializeMap(value);
      case 'Set':
        return deserializeSet(value);
      case 'Graph':
      case 'DiGraph':
        return deserializeGraph(value);
    }
  }
  // TODO: Handle arrays and objects better

  // default
  return value;
}

/**
 * Serialize an array of values (e.g. arguments passed to a method).,
 *
 * @param {Array} values
 * @return {{serializable: bool, values: Array}}
 */
export function serializeAll(values=[]) {
  var serializedValues = new Array(values.length);
  var serializable = values.every((value, i) => {
    var supported = isSupported(value);
    if (supported) {
      serializedValues[i] = serialize(value);
    }
    return supported;
  });

  return {serializable, serializedValues};
}

"use strict";

/**
 * Returns the next value of an iterator or throws an error if the iterator was
 * already consumed.
 *
 * @param {Iterator} iterator
 * @return {?}
 */
export default function next(iterator) {
  var result = iterator.next();
  if (result.done) {
    throw new Error("Iterator is already exhausted");
  }
  return result.value;
}

"use strict";

/**
 * Returns true if the two values are equal node values. If the values are
 * primitives, they are compared directly. If they are objects, their string
 * representation is compared.
 *
 * @param {Node} a
 * @param {Node} b
 * @return {boolean}
 */
export default function nodesAreEqual(a, b) {
  return a === b || (typeof a === "object" && a.toString() === b.toString());
}

"use strict";

function sorter(a, b) {
  return b[0] - a[0];
}

/**
 * A simple priority queue implementation.
 */
export default class PriorityQueue {
  /**
   * Accepts an iterable that emits `[priority, value]` pairs. Iterates over the
   * iterable only once.
   *
   * `priority` must be a number.
   *
   * @param {Iterable} iterable
   */
  constructor(iterable) {
    this._values = [];
    if (iterable != null) {
      for (var [priority, value] of iterable) {
        this._values.push([priority, value]);
      }
      this._values.sort(sorter);
    }
  }

  /**
   * Adds a value to the queue. It will be inserted into the queue according to
   * `priority`.
   *
   * @param {number} priority
   * @param {*} value
   */
  enqueue(priority, value) {
    this._values.push([priority, value]);
    this._values.sort(sorter);
  }

  /**
   * Removes and returns the smallest [priority, value] tuple from the queue.
   *
   * @return {?}
   */
  dequeue() {
    return this._values.pop();
  }

  /**
   * Returns the current size of the queue.
   *
   * @return {number}
   */
  get size() {
    return this._values.length;
  }
}

"use strict";

import genRange from "./genRange";

/**
 * Implements Python's range function, returns an array.
 *
 * If one argument n is passed, iterates over 0...n.
 * If two arguments i,j are passed, iterates over i...j.
 * If three arguments i,j,k are passed, iterates over i, i+k, i+2k, ...j
 *
 * @param {?number=} optStart Number to start from
 * @param {?number=} optEnd Number to count to
 * @param {?number=} optStep Step size
 * @return {!Array}
 */
export default function range(optStart, optEnd, optStep) {
  return Array.from(genRange(optStart, optEnd, optStep));
}

"use strict";
/**
 * @fileoverview
 * A shim for ES6 maps and support for custom hash functions via toString().
 */

import Map from "./Map";
import toIterator from "./toIterator";

export default class Set {
  /**
   * @param {Iterable} opt_data An object, array or iterator to populate the set
   * with.
   */
  constructor(optData) {
    this._map = new Map();

    if (optData != null) {
      for (var v of toIterator(optData)) {
        this.add(v);
      }
    }
  }

  /**
   * Returns true if the key is in the map.
   *
   * @param {*} value
   *
   * @return {boolean}
   */
  has(value) {
    return this._map.has(value);
  }

  /**
   * Adds the value and key to the map.
   *
   * @param {*} value
   *
   * @export
   */
  add(value) {
    this._map.set(value, true);
  }

  /**
   * Remove value with given key.
   *
   * @param {*} value
   *
   * @export
   */
  delete(value) {
    return this._map.delete(value);
  }

  /**
   * Returns an array of values.
   *
   * @return {!Iterator}
   * @export
   */
  values() {
    return this._map.keys();
  }

  /**
   * Returns an array of values.
   *
   * @return {!Iterator}
   * @export
   */
  keys() {
    return this.values();
  }

  /**
   * Returns an array of values.
   *
   * @return {!Iterator}
   * @export
   */
  *entries() {
    for (var v of this.values()) {
      yield [v, v];
    }
  }

  /**
   * Returns the number of element in the set.
   *
   * @return {number}
   * @export
   */
  get size() {
    return this._map.size;
  }

  /**
   * Empties the set.
   *
   * @export
   */
  clear() {
    this._map.clear();
  }

  /**
   * Executes the provided callback for each item in the set.
   *
   * @param {function(*)} callback A function which gets the key as first
   *  argument and value as second argument.
   * @param {*=} opt_this Object/value to set this to inside the callback
   * @export
   */
  forEach(callback, optThis) {
    for (var v of this.values()) {
      callback.call(optThis, v, v, this);
    }
  }

  /** EXTENSIONS **/
  /**
   * The following methods are not part of the ES6 Set class but are provided
   * for convenience. Once Sets become more widely available, we could simply
   * extend the native Set class.
   */

  /**
   * Returns a new set with the values of this set, not found in the other
   * sets.
   *
   * @param {...(Set|Array)} others
   */
  difference(...others) {
    var result = new Set(this);
    for (var i = 0, l = others.length; i < l; i++) {
      for (var v of others[i]) {
        result.delete(v);
      }
    }
    return result;
  }

  /**
   * Returns a new set containing only elements found in this and every
   * other set/array.
   *
   * @param {...(Set|Array)} others
   */
  intersection(...others) {
    var result = new Set();
    for (var v of this) {
      /* eslint-disable no-loop-func */
      if (others.every((other) => other.has(v))) {
        result.add(v);
      }
      /* eslint-enable no-loop-func */
    }
    return result;
  }

  /**
   * Removes and returns an element from the set.
   *
   * @return {?}
   */
  pop() {
    try {
      var value = this.values().next().value;
      this.delete(value);
      return value;
    } catch (ex) {} // eslint-disable-line no-empty
  }

  /**
   * Returns an iterator for the set object.
   *
   * @return {Iterator}
   */
  [Symbol.iterator]() {
    return this.values();
  }
}

export function symmetricDifference(a, b) {
  let c = new Set(a);
  for (let v of b) {
    if (a.has(v)) {
      c.delete(v);
    } else {
      c.add(v);
    }
  }

  return c;
}

export function union(a, b) {
  let c = new Set(a);
  for (let v of b) {
    c.add(v);
  }
  return c;
}

"use strict";

import isArrayLike from "./isArrayLike";
import isGraph from "./isGraph";
import isPlainObject from "lodash/lang/isPlainObject";
import objectSize from "lodash/collection/size";

/**
 * Returns the number of elements in the container. That is
 * the number of elements in the array or object or the length
 * of a string.
 *
 * @param {(string|Object|ArrayLike|Graph)} obj
 *    Object to determine the length of
 *
 * @return {number} The number of elements
 * @throws {TypeError} When length cannot be determined
 */
export default function size(obj) {
  if (isGraph(obj)) {
    return obj.numberOfNodes();
  } else if (typeof obj === "string" || isArrayLike(obj)) {
    return obj.length;
  } else if (isPlainObject(obj)) {
    return objectSize(obj);
  } else {
    throw new TypeError(
      "Expected a graph object, array, string or object, but got %s instead",
      typeof obj
    );
  }
}

"use strict";

/**
 * Returns true if the callback function returns true for any of the elements
 * of the iterator.
 *
 * @param {Iterator} iterator
 * @param {function} callback
 * @return {boolean}
 */
export default function someIterator(iterator, callback) {
  for (var value of iterator) {
    if (callback(value)) {
      return true;
    }
  }
  return false;
}

"use strict";

import sprintf from "tiny-sprintf";

var undef;

sprintf.j = function (value) {
  if (value === undef) {
    return undef + "";
  }

  try {
    return JSON.stringify(value);
  } catch (e) {
    return value + "";
  }
};

export default sprintf;

"use strict";

import isArrayLike from "./isArrayLike";
import isIterator from "./isIterator";
import isIterable from "./isIterable";

/**
 * Returns an iterator object for the given array, array-like object
 * or object. Should behave like Python's iter:
 * http://docs.python.org/library/functions.html#iter
 *
 *
 * The iterator object implements the goog.iter.Iterator interface.
 *
 * @param {Iterable} seq
 * @return {!Iterator}
 */
export default function toIterator(seq) {
  /*jshint expr:true*/
  if (isIterator(seq)) {
    return seq;
  } else if (isIterable(seq)) {
    return seq[Symbol.iterator]();
  } else if (Array.isArray(seq) || isArrayLike(seq)) {
    return (function* (seq) {
      // eslint-disable-line no-shadow
      for (var i = 0, l = seq.length; i < l; i++) {
        yield seq[i];
      }
    })(seq);
  } else {
    throw new TypeError("Unable to convert " + seq + " to an iterator");
  }
}

"use strict";

import Map from "./Map";

import forEach from "./forEach";

/**
 * Same as 'toObjectFromKeys' but returns a Map instead of an object.
 *
 * @param {Iterable} keys Container of keys
 * @param {*} opt_value the value, default is null
 *
 * @return {!Map}
 */
export default function toMapFromKeys(keys, optValue) {
  if (optValue == null) {
    // && opt_value == undefined
    optValue = null;
  }
  var result = new Map();
  forEach(keys, function (key) {
    result.set(key, optValue);
  });
  return result;
}

"use strict";

import forEach from "./forEach";

/**
 * Returns an object, given an array of keys and an default value.
 * Like dict.fromkeys in Python.
 *
 * @param {Iterable} keys Container of keys
 * @param {*} optValue the value, default is null
 * @return {!Object}
 */
export default function toObjectFromKeys(keys, optValue = null) {
  var result = {};
  forEach(keys, function (key) {
    result[key] = optValue;
  });
  return result;
}

"use strict";

import forEach from "./forEach";

/**
 * Returns an object, given a container of (key, value) tuples.
 *
 * @param {Iterable} kvs Container of key,value tuples
 *
 * @return {!Object}
 */
export default function toObjectFromKV(kvs) {
  var obj = {};
  forEach(kvs, function (kv) {
    obj[kv[0]] = kv[1];
  });
  return obj;
}

"use strict";

var t2 = new Array(2);
var t3 = new Array(3);
var t4 = new Array(4);

/**
 * This function always returns the same instance of an array for a given number
 * of arguments.
 * It should be used instead of creating temporary arrays, if the arrays are
 * consumed immediately anyways.
 *
 * @param {...*} var_args The elemens of the tuple
 * @return {Array}
 */
export function tuple2(x, y) {
  t2[0] = x;
  t2[1] = y;
  return t2;
}

export function tuple3(x, y, z) {
  t3[0] = x;
  t3[1] = y;
  t3[2] = z;
  return t3;
}

export function tuple4(a, b, c, d) {
  t4[0] = a;
  t4[1] = b;
  t4[2] = c;
  t4[3] = d;
  return t4;
}

/**
 * Same as tuple2, but sets the values on container instead of the allocated
 * array here. Useful to reuse an existing array.
 *
 * @param {...*} var_args The elemens of the tuple
 * @param {Array} opt_container If present, set values there instead
 * @return {Array}
 */
export function tuple2c(x, y, container) {
  container.length = 2;
  container[0] = x;
  container[1] = y;
  return container;
}

export function tuple3c(x, y, z, container) {
  container.length = 3;
  container[0] = x;
  container[1] = y;
  container[2] = z;
  return container;
}

export function tuple4c(a, b, c, d, container) {
  container.length = 4;
  container[0] = a;
  container[1] = b;
  container[2] = c;
  container[3] = d;
  return container;
}

export function createTupleFactory(count) {
  var t = new Array(count);
  switch (count) {
    case 2:
      return function (a, b) {
        t[0] = a;
        t[1] = b;
        return t;
      };
    case 3:
      return function (a, b, c) {
        t[0] = a;
        t[1] = b;
        t[2] = c;
        return t;
      };
    default:
      throw new Error("Typle size not supported.");
  }
}

"use strict";

export default global.Worker;

"use strict";

/**
 * Takes a number of iterators and returns a new iterator which emits an array
 * of each of the iterators next values. Stops when the shortest iterator is
 * exhausted.
 *
 * @param {...Iterator} var_args
 * @return {Iterator}
 */
export default function* zipIterator() {
  // TODO: Use rest parameter once 6to5 is fixed (2.0)
  var varArgs = arguments;
  var length = varArgs.length;

  while (true) {
    var done = false;
    var nextZip = new Array(length);
    for (var i = 0; i < length; i++) {
      var next = varArgs[i].next();
      if (next.done) {
        done = true;
        break;
      }
      nextZip[i] = next.value;
    }
    if (done) {
      break;
    }
    yield nextZip;
  }
}

"use strict";

import isArrayLike from "./isArrayLike";
import isIterator from "./isIterator";
import zipIterator from "./zipIterator";

function zipArray(...varArgs) {
  // Pre-allocation arrays speeds up assignment drastically, so we want to
  // optimize for that case
  var length = varArgs.length;
  var min = Infinity;
  var i;
  var result;
  var nextZip = new Array(length);

  // first pass
  for (i = 0; i < length; i++) {
    var array = varArgs[i];
    var arrayLength = array.length;
    if (arrayLength < min) {
      min = arrayLength;
      if (min === 0) {
        return []; // backout early
      }
    }
    nextZip[i] = array[0];
  }
  result = new Array(min);
  result[0] = nextZip;

  for (i = 1; i < min; i++) {
    nextZip = new Array(length);
    for (var j = 0; j < length; j++) {
      nextZip[j] = varArgs[j][i];
    }
    result[i] = nextZip;
  }
  return result;
}

/**
 * Helper to zip sequence types (arrays, array-like objects, objects, etc).
 * All arguments must be the same type. The first argument is used to determine
 * the type.
 * This behaves the same as Python's zip function, i.e. the result has the
 * length of the shortest input.
 *
 * Array -> Array
 * Array-like -> Array
 * Iterator -> Iterator
 *
 * @param {...(Iterable)} var_args
 *
 * @return {!(Array|Iterator)}
 */
export default function zipSequence(...varArgs) {
  var first = varArgs[0];

  if (isArrayLike(first)) {
    return zipArray.apply(null, varArgs);
  } else if (isIterator(first)) {
    return zipIterator.apply(null, varArgs);
  } else {
    throw new TypeError(
      "Expected an iterator, array-like object or object, but got %s instead",
      first
    );
  }
}

"use strict";

import shuffle from "lodash/collection/shuffle";
import sample from "lodash/collection/sample";

export default { shuffle, sample };

"use strict";

/**
 * Removes every property of the object.
 *
 * @param {Object} obj
 */
export default function clear(obj) {
  for (const prop in obj) {
    delete obj[prop];
  }
}

"use strict";
import clone from "lodash/lang/clone";
export default clone;

/*jshint latedef:false*/
"use strict";

import baseClone from "lodash/internal/baseClone";
import isGraph from "./isGraph";
import isMap from "./isMap";
import isSet from "./isSet";

function deepcopyInstance(obj, stackA, stackB) {
  // temporary constructor, we don't know if the original expects
  // parameter
  /**
   * @constructor
   */
  const T_ = () => {};
  T_.prototype = obj.constructor.prototype;
  let ownProps = {};
  let prop;
  let instance;

  // collect instance properties
  for (prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      ownProps[prop] = obj[prop];
    }
  }

  // deepcopy them
  ownProps = deepcopyImplementation(ownProps, stackA, stackB);

  // create a new instance and assign properties
  instance = new T_();
  for (prop in ownProps) {
    instance[prop] = ownProps[prop];
  }

  return instance;
}

function deepcopyImplementation(value, stackA, stackB) {
  return baseClone(
    value,
    true,
    (v) => {
      if (isMap(v) || isSet(v) || isGraph(v)) {
        const copy = deepcopyInstance(v, stackA, stackB);
        stackA.push(v);
        stackB.push(copy);
        return copy;
      }
    },
    null,
    null,
    stackA,
    stackB
  );
}

/**
 * Creates a deep copy of the value, also of maps and sets.
 *
 * @param {*} value The value to be cloned
 * @return {?}
 */
export default function deepcopy(value) {
  return deepcopyImplementation(value, [], []);
}

"use strict";

import merge from "lodash/object/merge";
export default merge;

/*eslint camelcase:0*/
"use strict";

import path from "path";
import child_process from "child_process";
import { serializeAll, deserialize } from "./message";
import delegateSync from "./delegateSync";

function delegateToChildProcess(method, args) {
  return new Promise((resolve, reject) => {
    let response = "";
    let error = "";
    const child = child_process.spawn(process.execPath, [
      path.join(__dirname, "../worker.js"),
    ]);
    child.stdout.on("data", (data) => (response += data));
    child.stderr.on("data", (data) => (error += data));
    child.on("close", () => {
      if (error) {
        reject(new Error(error));
      } else {
        resolve(JSON.parse(response));
      }
    });

    child.stdin.write(JSON.stringify({ method, args }));
    child.stdin.end();
  });
}

/**
 * DON'T CALL THIS FUNCTION EXPLICITLY. It's inserted by a transform.
 *
 * Eventually this will spawn another thread and run the computation there.
 *
 * @param {string} method The name on the root jsnx object to execute.
 * @param {Array} args An array of arguments to send to the worker.
 *    Some types, such as graphs, are converted to a different format first.
 * @return {Promise}
 */
export default function delegate(method, args) {
  const { serializable, serializedValues } = serializeAll(args);
  if (!serializable) {
    console.info(
      `At least one argument can't be serialized and sent to the worker. ` +
        `We will run ${method} in the same thread instead.`
    );
    return delegateSync(method, args);
  }
  return delegateToChildProcess(method, serializedValues).then(({ result }) =>
    deserialize(result)
  );
}
