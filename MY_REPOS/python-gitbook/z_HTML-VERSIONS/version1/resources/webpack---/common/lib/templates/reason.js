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
  'reason',
  'Reason',
  'https://reasonml.github.io/reason-react/en/',
  'reason',
  decorate_selector_1.decorateSelector(() => '#CB5747'),
  {
    showOnHomePage: true,
    main: false,
    staticDeployment: false,
    mainFile: ['/src/Main.re', 'App.re', 'Index.re'],
  }
);
