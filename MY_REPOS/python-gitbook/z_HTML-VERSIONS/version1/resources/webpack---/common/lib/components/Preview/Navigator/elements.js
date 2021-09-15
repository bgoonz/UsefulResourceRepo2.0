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
exports.SpinnerWrapper =
  exports.AddressBarContainer =
  exports.IconWithBackground =
  exports.Icon =
  exports.Icons =
  exports.Container =
    void 0;
const styled_components_1 = __importStar(require('styled-components'));
exports.Container = styled_components_1.default.div`
  display: flex;
  background-color: ${(props) =>
    props.theme['editor.background'] || props.theme.background()};
  padding: 0.25rem;
  align-items: center;
  line-height: 1;
  /* box-shadow: 0 1px 3px #ddd; */
  height: 35px;
  min-height: 35px;
  box-sizing: border-box;
  z-index: 2;
`;
exports.Icons = styled_components_1.default.div`
  display: flex;
`;
exports.Icon = styled_components_1.default.button`
  display: inline-block;
  border: none;
  background-color: transparent;
  font-size: 1.5rem;
  line-height: 0.5;
  margin: 0 0.25rem;
  vertical-align: middle;
  text-align: center;
  padding: 0;
  outline: none;
  cursor: pointer;
  transition: 0.2s ease color;

  color: ${({ theme }) =>
    theme === null || theme === void 0
      ? void 0
      : theme['titleBar.inactiveForeground']};

  &:hover {
    color: ${({ theme }) =>
      theme === null || theme === void 0
        ? void 0
        : theme['titleBar.activeForeground']};
  }

  ${({ moduleView, disabled }) =>
    !moduleView &&
    disabled &&
    styled_components_1.css`
cursor: default;
opacity: 0.4;
`};
`;
exports.IconWithBackground = styled_components_1.default(exports.Icon)`
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  background-color: ${({ theme }) =>
    theme['input.background'] || theme.background()};
`;
exports.AddressBarContainer = styled_components_1.default.div`
  width: 100%;
  box-sizing: border-box;
  margin: 0 0.25rem;
`;
const rotate = styled_components_1.keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;
exports.SpinnerWrapper = styled_components_1.default.span`
  display: inline-block;
  animation: ${rotate} 2s linear infinite;
`;
