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
exports.DocusaurusTemplate = void 0;
const template_1 = __importDefault(require('./template'));
const decorate_selector_1 = require('../utils/decorate-selector');
class DocusaurusTemplate extends template_1.default {
  // The file to open by the editor
  getDefaultOpenedFiles() {
    return ['/src/pages/index.js'];
  }
}
exports.DocusaurusTemplate = DocusaurusTemplate;
exports.default = new DocusaurusTemplate(
  'docusaurus',
  'Docusaurus',
  'https://docusaurus.io/',
  'github/facebook/docusaurus/tree/master/examples/classic',
  decorate_selector_1.decorateSelector(() => '#3ECC5F'),
  {
    mainFile: [],
    distDir: 'build',
    showOnHomePage: true,
  }
);
