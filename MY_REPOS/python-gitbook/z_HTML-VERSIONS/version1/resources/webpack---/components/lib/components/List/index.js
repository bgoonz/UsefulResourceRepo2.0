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
exports.ListAction = exports.ListItem = exports.List = void 0;
const styled_components_1 = __importDefault(require('styled-components'));
const css_1 = __importDefault(require('@styled-system/css'));
const Element_1 = require('../Element');
const Stack_1 = require('../Stack');
exports.List = styled_components_1.default(Element_1.Element).attrs((p) => ({
  as: p.as || 'ul',
}))(
  css_1.default({
    listStyle: 'none',
    paddingLeft: 0,
    margin: 0,
  })
);
exports.ListItem = styled_components_1.default(Stack_1.Stack).attrs({
  as: 'li',
  align: 'center',
})(
  css_1.default({
    minHeight: 8,
    paddingX: 2,
    color: 'list.foreground',
  })
);
exports.ListAction = styled_components_1.default(exports.ListItem)(
  ({ disabled }) =>
    css_1.default({
      ':hover, &[aria-selected="true"]': {
        cursor: !disabled ? 'pointer' : 'not-allowed',
        color: !disabled ? 'list.hoverForeground' : 'inherit',
        backgroundColor: !disabled ? 'list.hoverBackground' : 'inherit',
      },
      ':focus-within': {
        color: !disabled ? 'list.hoverForeground' : 'inherit',
        backgroundColor: !disabled ? 'list.hoverBackground' : 'inherit',
      },
    })
);
