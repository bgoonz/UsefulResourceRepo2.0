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
exports.TagInput = void 0;
const react_1 = __importDefault(require('react'));
const react_tagsinput_1 = __importDefault(require('react-tagsinput'));
const visually_hidden_1 = __importDefault(require('@reach/visually-hidden'));
const styled_components_1 = __importDefault(require('styled-components'));
const css_1 = __importDefault(require('@styled-system/css'));
const Input_1 = require('../Input');
const Text_1 = require('../Text');
const Tag_1 = require('../Tags/Tag');
/**
 * Looks like an Input, has the element label
 * Borrows styles from Stack and Tags
 */
const Layout = styled_components_1.default(Input_1.Input).attrs({
  as: 'label',
  htmlFor: 'tags-input',
})(
  css_1.default({
    display: 'inline-flex',
    alignItems: 'center',
    paddingX: 1,
    flexWrap: 'wrap',
    minHeight: 8,
    height: 'auto',
    input: {
      height: 4,
      paddingX: 0,
      fontSize: 2,
      width: 64,
      minWidth: 64,
      maxWidth: '100%',
      border: 'none',
      marginY: 1,
    },
    ':focus-within': {
      borderColor: 'inputOption.activeBorder',
    },
    '[data-component="Tag"]': {
      backgroundColor: 'sideBar.background',
      marginY: 1,
      marginRight: 1,
    },
  })
);
// Input takes the size of the content inside it by using
// a decoy span to calculate width
const AutosizeInput = (props) => {
  const spanRef = react_1.default.useRef(null);
  const [inputValue, setInputValue] = react_1.default.useState('');
  const onInput = (event) => {
    const inputElement = event.target;
    setInputValue(inputElement.value);
    if (spanRef.current) {
      inputElement.style.width = spanRef.current.offsetWidth + 16 + 'px';
    }
  };
  return react_1.default.createElement(
    react_1.default.Fragment,
    null,
    react_1.default.createElement(
      Input_1.Input,
      Object.assign(
        {
          onInput: onInput,
        },
        props
      )
    ),
    react_1.default.createElement(
      visually_hidden_1.default,
      null,
      react_1.default.createElement(
        Text_1.Text,
        {
          size: 2,
          id: 'tags-input-span',
          ref: spanRef,
        },
        inputValue
      )
    )
  );
};
exports.TagInput = ({ value, onChange }) =>
  react_1.default.createElement(react_tagsinput_1.default, {
    value: value,
    onChange: onChange,
    onlyUnique: true,
    renderTag: ({ key, tag, onRemove }) =>
      react_1.default.createElement(Tag_1.Tag, {
        tag: tag,
        key: key,
        onRemove: () => onRemove(key),
      }),
    renderInput: (props) =>
      react_1.default.createElement(
        AutosizeInput,
        Object.assign(
          {
            id: 'tags-input',
          },
          props
        )
      ),
    renderLayout: (tagsComponent, inputComponent) =>
      react_1.default.createElement(
        Layout,
        null,
        tagsComponent,
        inputComponent
      ),
  });
