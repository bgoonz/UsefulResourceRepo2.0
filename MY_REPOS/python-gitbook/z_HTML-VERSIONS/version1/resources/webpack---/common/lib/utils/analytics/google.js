'use strict';
Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.trackPageView = exports.track = void 0;
const utils_1 = require('./utils');
exports.track = (_, data) => {
  if (typeof utils_1.global.ga !== 'undefined') {
    utils_1.global.ga('send', data);
  }
};
exports.trackPageView = () => {
  if (typeof utils_1.global.ga !== 'undefined') {
    utils_1.global.ga('set', 'page', location.pathname + location.search);
  }
};
