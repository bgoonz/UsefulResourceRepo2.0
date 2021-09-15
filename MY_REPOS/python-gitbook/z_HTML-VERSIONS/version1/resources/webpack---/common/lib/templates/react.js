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
const configuration_1 = __importDefault(require('./configuration'));
const react_template_1 = require('./helpers/react-template');
exports.default = new react_template_1.ReactTemplate(
  'create-react-app',
  'React',
  'https://github.com/facebookincubator/create-react-app',
  'new',
  decorate_selector_1.decorateSelector(() => '#61DAFB'),
  {
    showOnHomePage: true,
    popular: true,
    main: true,
    mainFile: ['/src/index.js', '/src/index.tsx', '/src/index.ts'],
    extraConfigurations: {
      '/jsconfig.json': configuration_1.default.jsconfig,
      '/tsconfig.json': configuration_1.default.tsconfig,
    },
  }
);
