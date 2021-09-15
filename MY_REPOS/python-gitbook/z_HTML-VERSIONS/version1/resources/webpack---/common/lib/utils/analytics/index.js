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
exports.trackWithCooldown =
  exports.setGroup =
  exports.trackPageview =
  exports.resetUserId =
  exports.setUserId =
  exports.setAnonymousId =
  exports.identifyOnce =
  exports.identify =
  exports.logError =
  exports.DNT =
  exports.initializeSentry =
  exports.getHashedUserId =
    void 0;
const version_1 = __importDefault(require('../../version'));
const amplitude = __importStar(require('./amplitude'));
const google = __importStar(require('./google'));
const sentry = __importStar(require('./sentry'));
const utils_1 = require('./utils');
Object.defineProperty(exports, 'getHashedUserId', {
  enumerable: true,
  get: function () {
    return utils_1.getHashedUserId;
  },
});
const vero = __importStar(require('./vero'));
if (process.env.NODE_ENV === 'production') {
  setTimeout(() => {
    identify('[Amplitude] Version', version_1.default);
  }, 5000);
}
exports.initializeSentry = sentry.initialize;
exports.DNT = utils_1.DO_NOT_TRACK_ENABLED;

function logError(err) {
  return __awaiter(this, void 0, void 0, function* () {
    sentry.captureException(err);
    if (window.console && console.error) console.error(err);
  });
}
exports.logError = logError;
// Used to configure stuff?
function identify(key, value) {
  return __awaiter(this, void 0, void 0, function* () {
    if (!utils_1.DO_NOT_TRACK_ENABLED) {
      amplitude.identify(key, value);
      sentry.configureScope((scope) => {
        scope.setExtra(key, value);
      });
    }
  });
}
exports.identify = identify;
/**
 * An identify that only sets the value if it hasn't been set before
 */
function identifyOnce(key, value) {
  return __awaiter(this, void 0, void 0, function* () {
    if (!utils_1.DO_NOT_TRACK_ENABLED) {
      amplitude.identifyOnce(key, value);
    }
  });
}
exports.identifyOnce = identifyOnce;

function setAnonymousId() {
  return __awaiter(this, void 0, void 0, function* () {
    if (!utils_1.DO_NOT_TRACK_ENABLED && typeof localStorage !== 'undefined') {
      let anonymousUid = localStorage.getItem(utils_1.ANONYMOUS_UID_KEY);
      if (!anonymousUid) {
        anonymousUid = String(Math.random().toString(36).substring(2));
        localStorage.setItem(utils_1.ANONYMOUS_UID_KEY, anonymousUid);
      }
      vero.setAnonymousUserId(anonymousUid);
    }
  });
}
exports.setAnonymousId = setAnonymousId;

function setUserId(userId, email) {
  return __awaiter(this, void 0, void 0, function* () {
    if (!utils_1.DO_NOT_TRACK_ENABLED) {
      const hashedId = utils_1.getHashedUserId(userId);
      amplitude.setUserId(hashedId);
      sentry.setUserId(hashedId);
      vero.setUserId(hashedId, email);
    }
  });
}
exports.setUserId = setUserId;

function resetUserId() {
  return __awaiter(this, void 0, void 0, function* () {
    if (!utils_1.DO_NOT_TRACK_ENABLED) {
      amplitude.resetUserId();
      sentry.resetUserId();
    }
  });
}
exports.resetUserId = resetUserId;

function trackPageview() {
  if (!utils_1.DO_NOT_TRACK_ENABLED) {
    const data = {
      version: version_1.default,
      path: location.pathname + location.search,
    };
    amplitude.track('pageview', data);
    vero.trackPageview();
    google.trackPageView();
  }
}
exports.trackPageview = trackPageview;
/**
 * Assign the user to a group. Can be multiple under one key.
 */
function setGroup(name, value) {
  if (!utils_1.DO_NOT_TRACK_ENABLED) {
    amplitude.setGroup(name, value);
  }
}
exports.setGroup = setGroup;
const trackedEventsByTime = {};

function trackWithCooldown(event, cooldown, data = {}) {
  const now = Date.now();
  if (trackedEventsByTime[event]) {
    if (now - trackedEventsByTime[event] <= cooldown) {
      return;
    }
  }
  trackedEventsByTime[event] = now;
  track(event, data);
}
exports.trackWithCooldown = trackWithCooldown;

function track(eventName, secondArg = {}) {
  if (
    !utils_1.DO_NOT_TRACK_ENABLED &&
    utils_1.isAllowedEvent(eventName, secondArg)
  ) {
    const data = Object.assign(Object.assign({}, secondArg), {
      version: version_1.default,
      path: location.pathname + location.search,
    });
    amplitude.track(eventName, data);
    google.track(eventName, data);
    vero.track(eventName, data);
    sentry.logBreadcrumb({
      type: 'analytics',
      message: eventName,
    });
  }
}
exports.default = track;
