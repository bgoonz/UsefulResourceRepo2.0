'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule
      ? mod
      : {
          default: mod,
        };
  };
Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.isPreact10 = void 0;
const semver_1 = __importDefault(require('semver'));

function isPreact10(dependencies, devDependencies) {
  const preactVersion =
    (dependencies || {}).preact || (devDependencies || {}).preact;
  if (preactVersion) {
    return (
      /^[a-z]/.test(preactVersion) ||
      semver_1.default.intersects(preactVersion, '>=10.0.0')
    );
  }
  return false;
}
exports.isPreact10 = isPreact10;
