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
exports.isBabel7 = void 0;
const semver_1 = __importDefault(require('semver'));

function isCRAVersion2(dependencies, devDependencies) {
  const reactScriptsVersion =
    dependencies['react-scripts'] || devDependencies['react-scripts'];
  if (reactScriptsVersion) {
    return (
      /^[a-z]/.test(reactScriptsVersion) ||
      semver_1.default.intersects(reactScriptsVersion, '^2.0.0') ||
      semver_1.default.intersects(reactScriptsVersion, '^3.0.0') ||
      semver_1.default.intersects(reactScriptsVersion, '^4.0.0')
    );
  }
  return false;
}

function isBabel7(dependencies = {}, devDependencies = {}) {
  if (
    dependencies['@vue/cli-plugin-babel'] ||
    devDependencies['@vue/cli-plugin-babel']
  ) {
    return true;
  }
  if (devDependencies['@babel/core'] || dependencies['@babel/core']) {
    return true;
  }
  if (dependencies.svelte || devDependencies.svelte) {
    const ver = dependencies.svelte || devDependencies.svelte;
    return semver_1.default.gte(semver_1.default.minVersion(ver), '3.0.0');
  }
  if ('typescript' in devDependencies && !dependencies['@angular/core']) {
    return true;
  }
  if (isCRAVersion2(dependencies, devDependencies)) {
    return true;
  }
  return false;
}
exports.isBabel7 = isBabel7;
