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
  'node',
  'Node',
  'https://codesandbox.io/docs/environment#container-environment',
  'node',
  decorate_selector_1.decorateSelector(() => '#66cc33'),
  {
    showOnHomePage: true,
    main: true,
    staticDeployment: false,
    popular: true,
    mainFile: ['/pages/index.vue', '/pages/index.js', '/src/pages/index.js'],
  }
);
