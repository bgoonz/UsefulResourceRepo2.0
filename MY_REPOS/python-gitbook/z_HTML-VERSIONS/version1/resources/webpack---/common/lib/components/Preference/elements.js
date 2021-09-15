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
exports.Container = void 0;
const styled_components_1 = __importDefault(require('styled-components'));
exports.Container = styled_components_1.default.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
`;
