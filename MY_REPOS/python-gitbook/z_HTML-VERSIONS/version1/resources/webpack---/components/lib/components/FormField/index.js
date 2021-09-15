'use strict';
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
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
exports.FormField = void 0;
const react_1 = __importDefault(require('react'));
const visually_hidden_1 = __importDefault(require('@reach/visually-hidden'));
const auto_id_1 = require('@reach/auto-id');
const index_1 = require('../../index');
exports.FormField = (_a) => {
  var { label, id, hideLabel = false, direction = 'horizontal' } = _a,
    props = __rest(_a, ['label', 'id', 'hideLabel', 'direction']);
  const inputId = auto_id_1.useId(id);
  const LabelWrapper = hideLabel
    ? visually_hidden_1.default
    : react_1.default.Fragment;
  const InputElement = react_1.default.Children.map(props.children, (child) =>
    react_1.default.cloneElement(child, {
      id: inputId,
    })
  );
  if (direction === 'horizontal') {
    return react_1.default.createElement(
      index_1.Stack,
      Object.assign(
        {
          direction: 'horizontal',
          justify: 'space-between',
          align: 'center',
          css: {
            minHeight: 8,
            paddingX: 2,
          },
        },
        props
      ),
      react_1.default.createElement(
        LabelWrapper,
        null,
        react_1.default.createElement(
          index_1.Label,
          {
            htmlFor: inputId,
            size: 3,
          },
          label
        )
      ),
      InputElement
    );
  }
  return react_1.default.createElement(
    index_1.Element,
    Object.assign(
      {
        css: {
          paddingX: 2,
        },
      },
      props
    ),
    react_1.default.createElement(
      LabelWrapper,
      null,
      react_1.default.createElement(
        index_1.Label,
        {
          htmlFor: inputId,
          size: 3,
          block: true,
        },
        label
      )
    ),
    react_1.default.createElement(
      index_1.Stack,
      {
        direction: 'horizontal',
        align: 'center',
        css: {
          minHeight: 8,
        },
      },
      props.children
    )
  );
};
