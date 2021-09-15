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
const template_1 = __importDefault(require('./template'));
const decorate_selector_1 = require('../utils/decorate-selector');
const configuration_1 = __importDefault(require('./configuration'));
exports.default = new template_1.default(
  'styleguidist',
  'Styleguidist',
  'https://react-styleguidist.js.org/',
  'github/styleguidist/example',
  decorate_selector_1.decorateSelector(() => '#25d8fc'),
  {
    extraConfigurations: {
      '/.babelrc': configuration_1.default.babelrc,
    },
    distDir: 'styleguide',
    mainFile: [],
    showOnHomePage: true,
    githubPagesDeploy: false,
  }
);
