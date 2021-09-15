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
exports.Input = void 0;
const styled_components_1 = __importDefault(require('styled-components'));
const css_1 = __importDefault(require('@styled-system/css'));
const Element_1 = require('../Element');
const placeholderStyles = {
  color: 'input.placeholderForeground',
  fontSize: 3,
};
exports.Input = styled_components_1.default(Element_1.Element).attrs((p) => ({
  as: p.as || 'input',
}))(
  css_1.default({
    height: '26px',
    width: '100%',
    paddingX: 2,
    fontSize: 3,
    lineHeight: 'auto',
    fontFamily: 'Inter, sans-serif',
    borderRadius: 'small',
    backgroundColor: 'input.background',
    border: '1px solid',
    borderColor: 'input.border',
    color: 'input.foreground',
    '::-webkit-input-placeholder': placeholderStyles,
    '::-ms-input-placeholder': placeholderStyles,
    '::placeholder': placeholderStyles,
    transition: 'all ease',
    transitionDuration: (theme) => theme.speeds[2],
    appearance: 'none',
    ':hover, :focus': {
      borderColor: 'inputOption.activeBorder',
      // need to use !important to override styles from
      // workbench-theme.css, not proud :/
      outline: 'none !important',
    },
    ':disabled': {
      opacity: 0.4,
      borderColor: 'input.border',
    },
  })
);
