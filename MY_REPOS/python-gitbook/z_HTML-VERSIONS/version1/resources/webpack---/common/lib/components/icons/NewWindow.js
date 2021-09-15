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
exports.NewWindowIcon = void 0;
const react_1 = __importDefault(require('react'));
const IconBase_1 = __importDefault(require('react-icons/IconBase'));
exports.NewWindowIcon = (props) =>
  react_1.default.createElement(
    IconBase_1.default,
    Object.assign(
      {
        fill: 'none',
        viewBox: '0 0 24 24',
      },
      props
    ),
    react_1.default.createElement('path', {
      fill: 'currentColor',
      fillRule: 'evenodd',
      d: 'M8 6a1 1 0 00-1 1v7a1 1 0 001 1h10a1 1 0 001-1V7a1 1 0 00-1-1H8zM5 9h1v5a2 2 0 002 2h7v1a1 1 0 01-1 1H5a1 1 0 01-1-1v-7a1 1 0 011-1z',
      clipRule: 'evenodd',
    })
  );
