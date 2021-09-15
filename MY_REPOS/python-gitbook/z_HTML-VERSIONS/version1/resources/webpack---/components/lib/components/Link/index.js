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
exports.Link = void 0;
const react_1 = __importDefault(require('react'));
const styled_components_1 = __importDefault(require('styled-components'));
const css_1 = __importDefault(require('@styled-system/css'));
const Text_1 = require('../Text');
const LinkElement = styled_components_1.default(Text_1.Text).attrs((p) => ({
  as: p.as || 'a',
}))(
  css_1.default({
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'color ease',
    transitionDuration: (theme) => theme.speeds[2],
    ':hover, :focus': {
      color: 'foreground',
    },
  })
);
exports.Link = (props) =>
  react_1.default.createElement(
    LinkElement,
    Object.assign(
      {
        rel: props.target === '_blank' ? 'noopener noreferrer' : null,
        as: 'a',
      },
      props
    )
  );
