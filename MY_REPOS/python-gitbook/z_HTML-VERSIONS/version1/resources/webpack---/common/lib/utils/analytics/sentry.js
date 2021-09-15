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
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }

      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }

      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
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
exports.resetUserId =
  exports.setUserId =
  exports.configureScope =
  exports.captureException =
  exports.logBreadcrumb =
  exports.initialize =
    void 0;
const version_1 = __importDefault(require('../../version'));
const utils_1 = require('./utils');
let _Sentry;

function getSentry() {
  return Promise.resolve().then(() =>
    __importStar(require(/* webpackChunkName: 'sentry' */ '@sentry/browser'))
  );
}
let latestVersionPromise;
const versionTimeout = 1 * 60 * 1000;

function getLatestVersion() {
  if (!latestVersionPromise) {
    latestVersionPromise = fetch('/version.txt')
      .then((x) => x.text())
      .catch((x) => '');
    setTimeout(() => {
      latestVersionPromise = undefined;
    }, versionTimeout);
  }
  return latestVersionPromise;
}

function initialize(dsn) {
  return __awaiter(this, void 0, void 0, function* () {
    if (!utils_1.DO_NOT_TRACK_ENABLED) {
      _Sentry = yield getSentry();
      const latestVersion = yield getLatestVersion();
      if (version_1.default !== latestVersion) {
        // If we're not running the latest version we don't want to see the errors appear
        return Promise.resolve();
      }
      return _Sentry.init({
        dsn,
        release: version_1.default,
        ignoreErrors: [
          'Custom Object',
          'TypeScript Server Error',
          /^Canceled$/,
          // react devtools Outside of our scope for now, but we definitely want to check this out.
          // TODO: check what's happening here: https://sentry.io/organizations/codesandbox/issues/1239466583/?project=155188&query=is%3Aunresolved+release%3APROD-1573653062-4134efc0a
          /because a node with that id is already in the Store/,
          /Node \d* was removed before its children\./,
          /Cannot remove node \d* because no matching node was found in the Store\./,
          /Cannot add child \d* to parent \d* because parent node was not found in the Store\./,
          /Children cannot be added or removed during a reorder operation\./,
          /Cannot reorder children for node/,
          "undefined is not an object (evaluating 'window.__pad.performLoop')",
        ],
        integrations: [
          new _Sentry.Integrations.TryCatch({
            setTimeout: false,
            setInterval: false,
            requestAnimationFrame: false,
          }),
        ],
        allowUrls: [/https?:\/\/((uploads|www)\.)?codesandbox\.io/],
        maxBreadcrumbs: 100,
        /**
         * Don't send messages from the sandbox, so don't send from eg.
         * new.codesandbox.io or new.csb.app
         */
        denyUrls: ['codesandbox.editor.main.js', /.*\.csb\.app/],
        beforeSend: (event, hint) => {
          var _a, _b, _c, _d, _e;
          const exception =
            (_b =
              (_a =
                event === null || event === void 0
                  ? void 0
                  : event.exception) === null || _a === void 0
                ? void 0
                : _a.values) === null || _b === void 0
              ? void 0
              : _b[0];
          const exceptionFrame =
            (_d =
              (_c =
                exception === null || exception === void 0
                  ? void 0
                  : exception.stacktrace) === null || _c === void 0
                ? void 0
                : _c.frames) === null || _d === void 0
              ? void 0
              : _d[0];
          const filename =
            exceptionFrame === null || exceptionFrame === void 0
              ? void 0
              : exceptionFrame.filename;
          let errorMessage =
            typeof hint.originalException === 'string'
              ? hint.originalException
              : ((_e = hint.originalException) === null || _e === void 0
                  ? void 0
                  : _e.message) || exception.value;
          if (typeof errorMessage !== 'string') {
            errorMessage = '';
          }
          if (filename) {
            if (
              filename.includes('typescript-worker') &&
              errorMessage.includes('too much recursion')
            ) {
              // https://sentry.io/organizations/codesandbox/issues/1293123855/events/b01ee0feb7e3415a8bb81b6a9df19152/?project=155188&query=is%3Aunresolved&statsPeriod=14d
              return null;
            }
            if (
              filename.endsWith('codesandbox.editor.main.js') ||
              filename.startsWith('/extensions/')
            ) {
              // This is the spammy event that doesn't do anything: https://sentry.io/organizations/codesandbox/issues/1054971728/?project=155188&query=is%3Aunresolved
              // Don't do anything with it right now, I can't seem to reproduce it for some reason.
              // We need to add sourcemaps
              return null;
            }
            if (filename.includes('tsserver.js')) {
              // We don't have control over this
              return null;
            }
          }
          const customError = ((hint && hint.originalException) || {}).error;
          if (
            customError &&
            errorMessage.startsWith('Non-Error exception captured') &&
            exception.mechanism.handled
          ) {
            // This is an error coming from the sandbox, return with no error.
            return null;
          }
          if (errorMessage.includes('Unexpected frame by generating stack.')) {
            // A firefox error with error-polyfill, not critical. Referenced here: https://sentry.io/organizations/codesandbox/issues/1293236389/?project=155188&query=is%3Aunresolved
            return null;
          }
          return event;
        },
      });
    }
    return Promise.resolve();
  });
}
exports.initialize = initialize;
exports.logBreadcrumb = (breadcrumb) => {
  if (_Sentry) {
    _Sentry.addBreadcrumb(breadcrumb);
  }
};
exports.captureException = (err) => {
  if (_Sentry) {
    return _Sentry.captureException(err);
  }
  return null;
};
exports.configureScope = (cb) => {
  if (_Sentry) {
    _Sentry.configureScope(cb);
  }
};
exports.setUserId = (userId) => {
  if (_Sentry) {
    _Sentry.configureScope((scope) => {
      scope.setUser({
        id: userId,
      });
    });
  }
};
exports.resetUserId = () => {
  if (_Sentry) {
    _Sentry.configureScope((scope) => {
      scope.setUser({
        id: undefined,
      });
    });
  }
};
