'use strict';
Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.memoize = exports.cache = void 0;
const defaultStore = new Map();
exports.cache = (key, value, store = defaultStore) =>
  store.get(key) ||
  store.set(key, typeof value === `function` ? value() : value).get(key);
exports.memoize =
  (fn, store = new Map()) =>
  (...args) =>
    exports.cache(JSON.stringify(args), () => fn(...args), store);
