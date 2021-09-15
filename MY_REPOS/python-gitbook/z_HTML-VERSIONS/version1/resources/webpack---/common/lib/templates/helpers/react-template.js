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
exports.ReactTemplate = void 0;
const template_1 = __importDefault(require('../template'));
class ReactTemplate extends template_1.default {
  getViews() {
    const REACT_VIEWS = [
      {
        views: [
          {
            id: 'codesandbox.browser',
          },
          {
            id: 'codesandbox.tests',
          },
        ],
      },
      {
        views: [
          {
            id: 'codesandbox.console',
          },
          {
            id: 'codesandbox.problems',
          },
          {
            id: 'codesandbox.react-devtools',
          },
        ],
      },
    ];
    return REACT_VIEWS;
  }
  getDefaultOpenedFiles(configurationFiles) {
    let entries = [];
    entries.push('/src/App.js');
    entries.push('/src/App.tsx');
    entries = entries.concat(this.getEntries(configurationFiles));
    return entries;
  }
}
exports.ReactTemplate = ReactTemplate;
