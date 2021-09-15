'use strict';
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        Object.defineProperty(o, k2, {
          enumerable: true,
          get: function () {
            return m[k];
          },
        });
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', {
          enumerable: true,
          value: v,
        });
      }
    : function (o, v) {
        o['default'] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
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
const detect_old_browser_1 = __importDefault(require('./detect-old-browser'));

function requirePolyfills() {
  const promises = [];
  if (detect_old_browser_1.default() || typeof Object.entries === 'undefined') {
    promises.push(
      Promise.resolve().then(() =>
        __importStar(
          require(/* webpackChunkName: 'polyfills' */ '@babel/polyfill')
        )
      )
    );
  }
  if (typeof Error.captureStackTrace === 'undefined') {
    promises.push(
      Promise.resolve().then(() =>
        __importStar(
          require(/* webpackChunkName: 'error-polyfill' */ 'error-polyfill')
        )
      )
    );
  }
  return Promise.all(promises);
}
exports.default = requirePolyfills;
