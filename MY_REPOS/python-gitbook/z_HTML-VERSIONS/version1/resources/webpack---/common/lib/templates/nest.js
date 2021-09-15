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
  'nest',
  'Nest',
  'https://nestjs.com/',
  'github/nestjs/typescript-starter',
  decorate_selector_1.decorateSelector(() => '#ed2945'),
  {
    extraConfigurations: {
      '/tsconfig.json': configuration_1.default.tsconfig,
    },
    mainFile: ['/src/main.ts'],
    showOnHomePage: true,
    staticDeployment: false,
  }
);
