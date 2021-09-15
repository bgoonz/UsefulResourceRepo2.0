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
exports.ForwardIcon = void 0;
const react_1 = __importDefault(require('react'));
const IconBase_1 = __importDefault(require('react-icons/IconBase'));
exports.ForwardIcon = (props) =>
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
      d: 'M13.855 12.5L8 18.164l.864.836 6.719-6.5L8.863 6 8 6.886z',
    })
  );
