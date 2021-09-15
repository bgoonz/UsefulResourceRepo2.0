'use strict';
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        Object.defineProperty(o, k2, {
          enumerable: true,
          get: function () {
            return m[k];
          },
        });
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', {
          enumerable: true,
          value: v,
        });
      }
    : function (o, v) {
        o['default'] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
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
exports.ReakitButton =
  exports.AButton =
  exports.LinkButton =
  exports.styles =
    void 0;
const react_1 = __importDefault(require('react'));
const react_router_dom_1 = require('react-router-dom');
const Button_1 = require('reakit/Button');
const styled_components_1 = __importStar(require('styled-components'));
const theme_1 = __importDefault(require('../../theme'));
const utils_1 = require('../../utils');
const getBackgroundColor = ({
  theme: internalTheme,
  disabled,
  red,
  secondary,
  danger,
}) => {
  if (disabled)
    return `background-color: ${
      internalTheme.light
        ? 'rgba(0, 0, 0, 0.4)'
        : theme_1.default.background2.darken(0.3)()
    }`;
  if (danger) return `background-color: ${theme_1.default.dangerBackground()}`;
  if (secondary) return `background-color: transparent`;
  if (red) return `background-color: ${theme_1.default.red.darken(0.2)()}`;
  if (internalTheme && internalTheme['button.background']) {
    return `background-color: ${internalTheme['button.background']}`;
  }
  return `background-color: #40A9F3;`;
};
const getBackgroundHoverColor = ({
  theme: internalTheme,
  disabled,
  red,
  secondary,
  danger,
}) => {
  if (disabled)
    return `background-color: ${
      internalTheme.light
        ? 'rgba(0, 0, 0, 0.4)'
        : theme_1.default.background2.darken(0.3)()
    }`;
  if (danger) return `background-color: #E25D6A`;
  if (red) return `background-color: #F27777`;
  if (internalTheme && internalTheme['button.hoverBackground']) {
    return `background-color: ${internalTheme['button.hoverBackground']}`;
  }
  if (secondary) return `background-color: #66b9f4`;
  return `background-color: #66b9f4;`;
};
const getColor = ({ disabled, secondary, theme: internalTheme }) => {
  if (disabled) return theme_1.default.background2.lighten(1.5)();
  if (secondary)
    return internalTheme.light
      ? 'rgba(0, 0, 0, 0.75)'
      : 'rgba(255, 255, 255, 0.75)';
  return 'white';
};
const getHoverColor = ({ secondary, disabled }) => {
  if (disabled) return '';
  if (secondary) return 'color: white';
  return '';
};
const getBorder = ({
  theme: internalTheme,
  secondary,
  danger,
  red,
  disabled,
}) => {
  if (disabled)
    return internalTheme.light
      ? '2px solid rgba(0, 0, 0, 0.3)'
      : '2px solid #161A1C';
  if (red) return '2px solid #F27777';
  if (danger) return '2px solid #E25D6A';
  if (internalTheme && internalTheme['button.hoverBackground']) {
    return `2px solid ${internalTheme['button.hoverBackground']}`;
  }
  if (secondary) return `2px solid #66B9F4`;
  return '2px solid #66B9F4';
};
exports.styles = styled_components_1.css`
  transition: 0.3s ease all;
  font-family: Poppins, Roboto, sans-serif;

  border: none;
  outline: none;
  ${(props) => getBackgroundColor(props)};
  background-size: 720%;

  border: ${(props) => getBorder(props)};
  border-radius: 4px;

  box-sizing: border-box;
  font-size: 1.125em;
  text-align: center;
  color: ${(props) => getColor(props)};
  font-weight: 600;
  width: ${(props) => (props.block ? '100%' : 'inherit')};

  user-select: none;
  text-decoration: none;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  ${(props) =>
    props.small
      ? styled_components_1.css`
          padding: 0.5em 0.7em;
          font-size: 0.875em;
        `
      : styled_components_1.css`
          padding: 0.65em 2.25em;
        `};

  ${(props) =>
    !props.disabled &&
    styled_components_1.css`
      cursor: pointer;
    `};

  &:hover,
  &:focus {
    ${(props) => getBackgroundHoverColor(props)};
    ${(props) => getHoverColor(props)};

    outline: 0 !important;
  }
`;
// @ts-ignore
exports.LinkButton = styled_components_1.default(
  utils_1.withoutProps(`small`)(react_router_dom_1.Link)
)`
  ${exports.styles};
`;
// eslint-disable-next-line
exports.AButton = styled_components_1.default(
  utils_1.withoutProps(`small`)((props) =>
    react_1.default.createElement('a', Object.assign({}, props))
  )
)`
  ${exports.styles};
`;
exports.ReakitButton = styled_components_1.default(
  utils_1.withoutProps(`small`)(Button_1.Button)
)`
  ${exports.styles}
`;
