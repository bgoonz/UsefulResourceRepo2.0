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
exports.SearchInput = exports.SearchIcon = void 0;
const react_1 = __importDefault(require('react'));
const styled_components_1 = __importDefault(require('styled-components'));
const css_1 = __importDefault(require('@styled-system/css'));
const Input_1 = require('../Input');
const Element_1 = require('../Element');
const SearchInputComponent = styled_components_1.default(Input_1.Input)(
  css_1.default({
    paddingLeft: 7,
    '::-ms-clear, ::-ms-reveal': {
      display: 'none',
      width: 0,
      height: 0,
    },
    '::-webkit-search-cancel-button': {
      display: 'none',
    },
  })
);
const SearchIconBase = (props) =>
  react_1.default.createElement(
    'svg',
    Object.assign(
      {
        fill: 'none',
        width: '12',
        height: '12',
      },
      props
    ),
    react_1.default.createElement('path', {
      fillRule: 'evenodd',
      clipRule: 'evenodd',
      d: 'M6.966 7.932a4.15 4.15 0 01-2.69.993C1.916 8.925 0 6.927 0 4.463 0 1.998 1.915 0 4.277 0s4.276 1.998 4.276 4.463c0 1.063-.356 2.04-.951 2.806L12 11.86l-.635.663-4.399-4.59zm.689-3.47c0 1.947-1.513 3.525-3.378 3.525C2.41 7.987.899 6.41.899 4.463.899 2.516 2.41.938 4.277.938c1.865 0 3.378 1.578 3.378 3.525z',
    })
  );
exports.SearchIcon = styled_components_1.default(SearchIconBase)(
  css_1.default({
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    left: 2,
    path: {
      fill: 'input.placeholderForeground',
    },
  })
);
exports.SearchInput = react_1.default.forwardRef((props, ref) =>
  react_1.default.createElement(
    Element_1.Element,
    {
      css: {
        position: 'relative',
      },
    },
    react_1.default.createElement(exports.SearchIcon, null),
    react_1.default.createElement(
      SearchInputComponent,
      Object.assign(
        {
          type: 'search',
          ref: ref,
        },
        props
      )
    )
  )
);
