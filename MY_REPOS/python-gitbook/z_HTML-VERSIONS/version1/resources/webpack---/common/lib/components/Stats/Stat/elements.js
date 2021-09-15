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
exports.CenteredText = void 0;
const styled_components_1 = __importStar(require('styled-components'));
exports.CenteredText = styled_components_1.default.div`
  ${(props) =>
    !props.disableCenter &&
    styled_components_1.css`
      justify-content: center;
    `};
  align-items: center;
  display: inline-flex;
  flex-direction: row;
  margin-bottom: 0.5rem;

  width: ${(props) => (props.text ? '10em' : '5em')};

  svg {
    opacity: 0.75;
    font-size: 1.125em;
  }
`;
