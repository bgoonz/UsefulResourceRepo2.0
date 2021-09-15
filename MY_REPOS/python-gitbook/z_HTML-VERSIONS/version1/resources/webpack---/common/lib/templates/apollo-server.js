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
  'apollo',
  'Apollo',
  'https://www.apollographql.com/docs/apollo-server/',
  'apollo-server',
  decorate_selector_1.decorateSelector(() => '#c4198b'),
  {
    staticDeployment: false,
    mainFile: ['/src/index.js'],
    showOnHomePage: true,
  }
);
