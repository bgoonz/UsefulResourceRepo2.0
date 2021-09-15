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
exports.Integration = void 0;
const react_1 = __importDefault(require('react'));
const styled_components_1 = __importDefault(require('styled-components'));
const css_1 = __importDefault(require('@styled-system/css'));
const Element_1 = require('../Element');
const Text_1 = require('../Text');
const Stack_1 = require('../Stack');
const Header = styled_components_1.default(Stack_1.Stack)(
  css_1.default({
    height: 6,
    paddingX: 4,
    border: '1px solid',
    borderColor: 'sideBar.border',
    borderBottom: 0,
    borderTopLeftRadius: 'small',
    borderTopRightRadius: 'small',
    fontSize: 3,
  })
);
const Content = styled_components_1.default(Element_1.Element)(
  css_1.default({
    paddingY: 4,
    border: '1px solid',
    borderColor: 'sideBar.border',
    borderBottomLeftRadius: 'small',
    borderBottomRightRadius: 'small',
    fontSize: 2,
  })
);
exports.Integration = ({ icon, title, children }) =>
  react_1.default.createElement(
    'div',
    null,
    react_1.default.createElement(
      Header,
      {
        gap: 1,
        align: 'center',
      },
      icon(),
      react_1.default.createElement(
        Text_1.Text,
        {
          weight: 'medium',
        },
        title
      )
    ),
    react_1.default.createElement(Content, null, children)
  );
