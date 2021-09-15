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
var _a;
Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.getExperimentUserId = exports.AB_TESTING_URL = void 0;
// Grab NODE_ENV and REACT_APP_* environment variables and prepare them to be
// injected into the application via DefinePlugin in Webpack configuration.
const uuid_1 = __importDefault(require('uuid'));
const host_1 = __importDefault(require('../utils/host'));
const REACT_APP = /^REACT_APP_/i;
const NODE_ENV = JSON.stringify(process.env.NODE_ENV || 'development');
const LOCAL_SERVER = Boolean(JSON.stringify(process.env.LOCAL_SERVER));
const STAGING_API = Boolean(JSON.stringify(process.env.STAGING_API));
const AB_TESTING_URL_STAGING = 'https://ab-testing.codesandbox.stream';
const AB_TESTING_URL_PRODUCTION = 'https://ab-testing.codesandbox.io';
exports.AB_TESTING_URL = /codesandbox\.io/.test(
  typeof window !== `undefined`
    ? (_a = window === null || window === void 0 ? void 0 : window.location) ===
        null || _a === void 0
      ? void 0
      : _a.host
    : ''
)
  ? AB_TESTING_URL_PRODUCTION
  : AB_TESTING_URL_STAGING;
exports.getExperimentUserId = () => {
  const KEY_NAME = 'csb-ab-user-id';
  let userId = localStorage.getItem(KEY_NAME);
  if (!userId) {
    userId = uuid_1.default.v4();
    localStorage.setItem(KEY_NAME, userId);
  }
  return userId;
};
exports.default = Object.keys(process.env)
  .filter((key) => REACT_APP.test(key))
  .reduce(
    (env, key) => {
      env['process.env.' + key] = JSON.stringify(process.env[key]);
      return env;
    },
    {
      'process.env.NODE_ENV': NODE_ENV,
      'process.env.STAGING_API': STAGING_API,
      'process.env.CODESANDBOX_HOST': JSON.stringify(host_1.default()),
      'process.env.LOCAL_SERVER': Boolean(LOCAL_SERVER),
      'process.env.STAGING': 'STAGING_BRANCH' in process.env,
      'process.env.VSCODE': Boolean(JSON.stringify(process.env.VSCODE)),
      'process.env.SANDPACK': Boolean(
        JSON.parse(process.env.SANDPACK || 'false')
      ),
      'process.env.DEV_DOMAIN': JSON.stringify(
        process.env.DEV_DOMAIN || 'codesandbox.test'
      ),
    }
  );
