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
Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.TextArea = exports.styles = void 0;
const styled_components_1 = __importStar(require('styled-components'));
exports.styles = styled_components_1.css`
  transition: 0.3s ease border-color;
  background-color: ${(props) =>
    props.theme['input.background'] || 'rgba(0, 0, 0, 0.3)'};
  color: ${(props) =>
    props.theme['input.foreground'] ||
    (props.theme.light ? '#636363' : 'white')};
  border: none;
  outline: none;
  border-radius: 4px;
  padding: 0.25em;
  width: ${({ block, fullWidth }) => (block || fullWidth ? '100%' : 'inherit')};
  box-sizing: border-box;

  border: 1px solid
    ${(props) =>
      props.error ? props.theme.red.clearer(0.5) : 'rgba(0, 0, 0, 0.1)'};

  &:focus {
    border-color: ${(props) => props.theme.secondary.clearer(0.6)};
  }
`;
const Input = styled_components_1.default.input`
  ${exports.styles};
`;
exports.TextArea = styled_components_1.default.textarea`
  ${exports.styles};
`;
exports.default = Input;
