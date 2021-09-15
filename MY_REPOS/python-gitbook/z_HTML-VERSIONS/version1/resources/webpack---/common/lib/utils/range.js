'use strict';
Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.range = void 0;
exports.range = (size, startAt = 0, skip = 1) =>
  [...Array(size).keys()].map((i) => i * skip + startAt);
