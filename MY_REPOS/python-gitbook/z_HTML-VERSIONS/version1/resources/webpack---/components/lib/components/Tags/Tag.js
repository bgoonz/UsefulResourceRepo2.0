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
exports.Tag = void 0;
const react_1 = __importDefault(require('react'));
const styled_components_1 = __importDefault(require('styled-components'));
const css_1 = __importDefault(require('@styled-system/css'));
const Stack_1 = require('../Stack');
const Button_1 = require('../Button');
const Text_1 = require('../Text');
const Icon_1 = require('../Icon');
const TagElement = styled_components_1.default(Stack_1.Stack).attrs({
  inline: true,
  align: 'center',
  justify: 'space-between',
})(
  css_1.default({
    height: '18px',
    lineHeight: 1,
    backgroundColor: 'sideBar.border',
    paddingX: 1,
    borderRadius: 'small',
  })
);

function Tag({ tag, onRemove }) {
  return react_1.default.createElement(
    TagElement,
    {
      'data-component': 'Tag',
    },
    react_1.default.createElement(
      Text_1.Text,
      {
        size: 2,
      },
      tag
    ),
    onRemove &&
      react_1.default.createElement(
        Button_1.Button,
        {
          variant: 'link',
          autoWidth: true,
          onClick: () => onRemove(tag),
          marginLeft: 1,
        },
        react_1.default.createElement(Icon_1.Icon, {
          size: 7,
          name: 'cross',
        })
      )
  );
}
exports.Tag = Tag;
