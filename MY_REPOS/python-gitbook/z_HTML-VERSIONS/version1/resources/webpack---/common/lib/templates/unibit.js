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
  'unibit',
  'Unibit',
  'https://www.stackbit.com',
  'github/stackbithq/stackbit-theme-universal/tree/master/',
  decorate_selector_1.decorateSelector(() => '#3EB0FD'),
  {
    distDir: 'public',
    popular: true,
    mainFile: ['README.md'],
    showOnHomePage: true,
    main: false,
    showCube: false,
  }
);
