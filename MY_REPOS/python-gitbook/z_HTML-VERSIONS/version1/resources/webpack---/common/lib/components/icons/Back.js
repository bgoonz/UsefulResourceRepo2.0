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
exports.BackIcon = void 0;
const react_1 = __importDefault(require('react'));
const IconBase_1 = __importDefault(require('react-icons/IconBase'));
exports.BackIcon = (props) =>
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
      d: 'M9.728 12.5l5.855-5.664L14.72 6 8 12.5l6.72 6.5.863-.886z',
    })
  );
