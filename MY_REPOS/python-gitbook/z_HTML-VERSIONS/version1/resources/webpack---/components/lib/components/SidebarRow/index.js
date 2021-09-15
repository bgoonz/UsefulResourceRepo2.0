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
exports.SidebarRow = void 0;
const styled_components_1 = __importDefault(require('styled-components'));
const css_1 = __importDefault(require('@styled-system/css'));
const Stack_1 = require('../Stack');
/**
 * Honestly, I'm not sure if this component should
 * exist as a resuable component.
 *
 * I've found this exact combination of styles
 * handy multiple times in the sidebar based on
 * how we lay out elements inside a minimum "row"
 * of 32px even if the element is smaller.
 *
 */
exports.SidebarRow = styled_components_1.default(Stack_1.Stack).attrs({
  align: 'center',
})(
  css_1.default({
    minHeight: 8,
  })
);
