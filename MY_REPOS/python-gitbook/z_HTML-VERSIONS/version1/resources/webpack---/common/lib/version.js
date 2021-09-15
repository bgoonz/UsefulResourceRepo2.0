'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = exports.getTimestamp = void 0;
// This is .js for preval
var versionType = 'PROD';
var versionNumber = Math.floor(1631030561285 / 1000);
var shortCommitSha = 'de6545166';

var getTimestamp = function getTimestamp(version) {
  return +version.split('-')[1];
};

exports.getTimestamp = getTimestamp;
var _default = 'PROD-1631030561-de6545166';
exports['default'] = _default;
