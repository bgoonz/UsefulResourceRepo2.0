'use strict';
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
exports.setGroup =
  exports.track =
  exports.resetUserId =
  exports.setUserId =
  exports.identifyOnce =
  exports.identify =
    void 0;
const utils_1 = require('./utils');
const delay_1 = __importDefault(require('../delay'));
// After 30min no event we mark a session
const NEW_SESSION_TIME = 1000 * 60 * 30;
const getLastTimeEventSent = () => {
  try {
    const lastTime = localStorage.getItem('csb-last-event-sent');
    if (lastTime === null) {
      return 0;
    }
    return +lastTime;
  } catch (e) {
    return 0;
  }
};
const markLastTimeEventSent = () => {
  try {
    localStorage.setItem('csb-last-event-sent', Date.now().toString());
  } catch (e) {
    console.warn(e);
  }
};
const getAmplitude = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    if (process.env.NODE_ENV !== 'production') {
      return false;
    }
    for (let i = 0; i < 10; i++) {
      if (
        typeof utils_1.global.amplitude !== 'undefined' &&
        utils_1.global.amplitude.getInstance()._storageSuffix
      ) {
        return utils_1.global.amplitude;
      }
      // eslint-disable-next-line no-await-in-loop
      yield delay_1.default(1000);
    }
    return false;
  });
exports.identify = (key, value) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const amplitude = yield getAmplitude();
    if (amplitude) {
      const identity = new amplitude.Identify();
      identity.set(key, value);
      amplitude.identify(identity);
      utils_1.debug('[Amplitude] Identifying', key, value);
    } else {
      utils_1.debug(
        '[Amplitude] NOT identifying because Amplitude is not loaded'
      );
    }
  });
exports.identifyOnce = (key, value) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const amplitude = yield getAmplitude();
    if (amplitude) {
      const identity = new amplitude.Identify();
      identity.setOnce(key, value);
      amplitude.identify(identity);
      utils_1.debug('[Amplitude] Identifying', key, value);
    } else {
      utils_1.debug(
        '[Amplitude] NOT identifying because Amplitude is not loaded'
      );
    }
  });
exports.setUserId = (userId) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const amplitude = yield getAmplitude();
    if (amplitude) {
      utils_1.debug('[Amplitude] Setting User ID', userId);
      exports.identify('userId', userId);
      amplitude.getInstance().setUserId(userId);
    } else {
      utils_1.debug(
        '[Amplitude] NOT setting userid because Amplitude is not loaded'
      );
    }
  });
exports.resetUserId = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const amplitude = yield getAmplitude();
    if (amplitude) {
      utils_1.debug('[Amplitude] Resetting User ID');
      exports.identify('userId', null);
      if (
        amplitude.getInstance().options &&
        amplitude.getInstance().options.userId
      ) {
        amplitude.getInstance().setUserId(null);
        amplitude.getInstance().regenerateDeviceId();
      }
    } else {
      utils_1.debug(
        '[Amplitude] NOT resetting user id because Amplitude is not loaded'
      );
    }
  });
exports.track = (eventName, data) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const amplitude = yield getAmplitude();
    if (amplitude) {
      const currentTime = Date.now();
      if (currentTime - getLastTimeEventSent() > NEW_SESSION_TIME) {
        // We send a separate New Session event if people have been inactive for a while
        amplitude.logEvent('New Session');
      }
      markLastTimeEventSent();
      utils_1.debug('[Amplitude] Tracking', eventName, data);
      amplitude.logEvent(eventName, data);
    } else {
      utils_1.debug(
        '[Amplitude] NOT tracking because Amplitude is not loaded',
        eventName
      );
    }
  });
exports.setGroup = (group, value) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const amplitude = yield getAmplitude();
    if (amplitude) {
      utils_1.debug('[Amplitude] Grouping', group, value);
      amplitude.setGroup(group, value);
    }
  });
