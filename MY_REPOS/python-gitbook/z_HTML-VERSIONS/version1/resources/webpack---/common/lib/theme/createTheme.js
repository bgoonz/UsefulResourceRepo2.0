'use strict';
Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.createTheme = void 0;
const decorateSelector_1 = require('./decorateSelector');
exports.createTheme = (colors) =>
  Object.keys(colors)
    .map((c) => ({
      key: c,
      value: colors[c],
    }))
    .map(({ key, value }) => ({
      key,
      value: decorateSelector_1.decorateSelector(() => value),
    }))
    .reduce(
      (prev, { key, value }) =>
        Object.assign(Object.assign({}, prev), {
          [key]: value,
        }),
      {}
    );
