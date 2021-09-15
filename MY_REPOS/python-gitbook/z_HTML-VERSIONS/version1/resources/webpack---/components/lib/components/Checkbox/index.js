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
exports.Checkbox = exports.CheckboxElement = void 0;
const react_1 = __importDefault(require('react'));
const css_1 = __importDefault(require('@styled-system/css'));
const styled_components_1 = __importDefault(require('styled-components'));
const auto_id_1 = require('@reach/auto-id');
const Element_1 = require('../Element');
const Text_1 = require('../Text');
exports.CheckboxElement = styled_components_1.default.input(
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
      backgroundColor: 'button.background',
    },
  })
);
const Label = styled_components_1.default(Text_1.Text)(
  css_1.default({
    display: 'block',
    paddingLeft: 6,
    '&::before': {
      content: "''",
      height: 4,
      left: 0,
      position: 'absolute',
      top: 0,
      width: 4,
      borderRadius: 'small',
      backgroundColor: 'input.background',
      border: '1px solid ',
      borderColor: '#757575',
      transition: 'all ease-in',
      transitionDuration: (theme) => theme.speeds[2],
    },
    '&::after': {
      content: "''",
      borderLeft: 0,
      borderTop: 0,
      height: 3,
      left: '2px',
      opacity: 0,
      position: 'absolute',
      top: 1,
      backgroundImage: (theme) =>
        `url('data:image/svg+xml,%3Csvg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath fill-rule="evenodd" clip-rule="evenodd" d="M5.0442 5.99535L10.2229 0.444443L11.3332 1.70347L5.0442 8.44444L0.666504 3.75212L1.77676 2.49309L5.0442 5.99535Z" fill="${theme.colors.input.foreground.replace(
          '#',
          '%23'
        )}"/%3E%3C/svg%3E%0A')`,
      backgroundRepeat: 'no-repeat',
      width: 3,
      transition: 'all ease-in',
      transitionDuration: (theme) => theme.speeds[2],
    },
  })
);
exports.Checkbox = (_a) => {
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
      exports.CheckboxElement,
      Object.assign(
        {
          checked: checked,
          id: inputId,
          name: inputId,
          type: 'checkbox',
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
