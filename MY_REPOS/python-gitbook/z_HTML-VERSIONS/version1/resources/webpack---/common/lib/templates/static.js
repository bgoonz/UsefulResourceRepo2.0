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
exports.default = new template_1.default(
  'static',
  'Static',
  'https://developer.mozilla.org/en-US/docs/Learn/HTML',
  'github/codesandbox-app/static-template',
  decorate_selector_1.decorateSelector(() => '#3AA855'),
  {
    showOnHomePage: true,
    distDir: './',
    main: false,
    mainFile: ['/index.html'],
  }
);
