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
  'next',
  'Next.js',
  'https://nextjs.org/',
  'github/zeit/next.js/tree/master/examples/hello-world',
  decorate_selector_1.decorateSelector(() => '#ffffff'),
  {
    extraConfigurations: {
      '/.babelrc': configuration_1.default.babelrc,
    },
    distDir: 'out',
    staticDeployment: false,
    mainFile: ['/pages/index.js'],
    backgroundColor: decorate_selector_1.decorateSelector(() => '#000000'),
    showOnHomePage: true,
    main: true,
    popular: true,
    showCube: false,
  }
);
