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
exports.Radio = exports.RadioElement = void 0;
const react_1 = __importDefault(require('react'));
const css_1 = __importDefault(require('@styled-system/css'));
const styled_components_1 = __importDefault(require('styled-components'));
const auto_id_1 = require('@reach/auto-id');
const Element_1 = require('../Element');
const Text_1 = require('../Text');
exports.RadioElement = styled_components_1.default.input(
  css_1.default({
    left: 0,
    opacity: 0,
    position: 'absolute',
    top: 0,
    height: 4,
    width: 4,
    '&:checked + label::after': {
      opacity: 1,
    },
    '&:checked + label::before': {
      borderColor: 'button.background',
      backgroundColor: 'button.background',
    },
  })
);
const Label = styled_components_1.default(Text_1.Text)(
  css_1.default({
    display: 'block',
    paddingLeft: 6,
    '&::before': {
      borderRadius: '50%',
      content: "''",
      height: 4,
      left: 0,
      position: 'absolute',
      top: 0,
      width: 4,
      backgroundColor: 'input.background',
      borderColor: 'mutedForeground',
      borderStyle: 'solid',
      borderWidth: '1px',
      transition: 'all ease-in',
      transitionDuration: (theme) => theme.speeds[2],
    },
    '&::after': {
      borderRadius: '50%',
      content: "''",
      borderLeft: 0,
      borderTop: 0,
      height: '6px',
      opacity: 0,
      position: 'absolute',
      top: '6px',
      left: '6px',
      backgroundColor: 'input.foreground',
      width: '6px',
      transition: 'all ease-in',
      transitionDuration: (theme) => theme.speeds[2],
    },
  })
);
exports.Radio = (_a) => {
  var { checked, id, label } = _a,
    props = __rest(_a, ['checked', 'id', 'label']);
  const inputId = auto_id_1.useId(id);
  return react_1.default.createElement(
    Element_1.Element,
    {
      style: {
        position: 'relative',
      },
    },
    react_1.default.createElement(
      exports.RadioElement,
      Object.assign(
        {
          checked: checked,
          id: inputId,
          name: inputId,
          type: 'radio',
        },
        props
      )
    ),
    react_1.default.createElement(
      Label,
      {
        as: 'label',
        htmlFor: inputId,
      },
      label
    )
  );
};
