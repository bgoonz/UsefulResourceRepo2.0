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
exports.Loading = exports.StyledFrame = exports.Container = void 0;
const styled_components_1 = __importStar(require('styled-components'));
const fadeInAnimation = styled_components_1.keyframes`
  0%   { opacity: 0 }
  100% { opacity: 1 }
`;
exports.Container = styled_components_1.default.div`
  height: 100%;
  width: 100%;
  background-color: white;

  display: flex;
  flex-direction: column;
`;
exports.StyledFrame = styled_components_1.default.iframe`
  border-width: 0px;
  width: 100%;
  height: 100%;
  min-height: 0;
  overflow: auto;
`;
exports.Loading = styled_components_1.default.div`
  animation: ${fadeInAnimation} 0.2s;
  animation-fill-mode: forwards;
  position: absolute;
  top: 35px;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.75);
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 1.5rem;
  font-weight: 300;
  color: white;
  line-height: 1.3;
  text-align: center;

  z-index: 10;
`;
