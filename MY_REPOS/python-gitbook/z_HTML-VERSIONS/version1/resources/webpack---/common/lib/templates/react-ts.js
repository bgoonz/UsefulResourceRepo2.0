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
const decorate_selector_1 = require('../utils/decorate-selector');
const react_template_1 = require('./helpers/react-template');
const configuration_1 = __importDefault(require('./configuration'));
exports.default = new react_template_1.ReactTemplate(
  'create-react-app-typescript',
  'React + TS',
  'https://github.com/wmonk/create-react-app-typescript',
  'react-ts',
  decorate_selector_1.decorateSelector(() => '#009fff'),
  {
    isTypescript: true,
    showOnHomePage: false,
    extraConfigurations: {
      '/tsconfig.json': configuration_1.default.tsconfig,
    },
  }
);
