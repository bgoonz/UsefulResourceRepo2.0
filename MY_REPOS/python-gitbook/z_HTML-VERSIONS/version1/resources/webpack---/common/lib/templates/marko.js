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
  'marko',
  'Marko',
  'https://markojs.com/',
  'github/nm123github/marko-codesandbox',
  decorate_selector_1.decorateSelector(() => '#f5ac00'),
  {
    showOnHomePage: true,
    main: false,
    staticDeployment: false,
  }
);
