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
exports.Stack = void 0;
const styled_components_1 = __importDefault(require('styled-components'));
const css_1 = __importDefault(require('@styled-system/css'));
const Element_1 = require('../Element');
exports.Stack = styled_components_1.default(Element_1.Element)(
  ({ gap = 0, direction = 'horizontal', justify, align, inline }) =>
    css_1.default({
      display: inline ? 'inline-flex' : 'flex',
      flexDirection: direction === 'horizontal' ? 'row' : 'column',
      justifyContent: justify,
      alignItems: align,
      '> *:not(:last-child)': {
        [direction === 'horizontal' ? 'marginRight' : 'marginBottom']: gap,
      },
    })
);
