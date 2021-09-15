'use strict';
Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.theme = exports.decorateSelector = void 0;
const theme_1 = require('./theme');
var decorateSelector_1 = require('./decorateSelector');
Object.defineProperty(exports, 'decorateSelector', {
  enumerable: true,
  get: function () {
    return decorateSelector_1.decorateSelector;
  },
});
var theme_2 = require('./theme');
Object.defineProperty(exports, 'theme', {
  enumerable: true,
  get: function () {
    return theme_2.theme;
  },
});
exports.default = theme_1.theme;
