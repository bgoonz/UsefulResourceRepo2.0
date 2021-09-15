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
exports.Switch = void 0;
const react_1 = __importDefault(require('react'));
const styled_components_1 = __importDefault(require('styled-components'));
const css_1 = __importDefault(require('@styled-system/css'));
const Element_1 = require('../Element');
const SwitchBackground = styled_components_1.default.div(
  css_1.default({
    width: 7,
    height: 4,
    backgroundColor: 'switch.backgroundOff',
    border: '1px solid',
    borderColor: 'sideBar.background',
    borderRadius: 'large',
    position: 'relative',
    transition: 'background-color ease',
    transitionDuration: (theme) => theme.speeds[3],
  })
);
const SwitchToggle = styled_components_1.default.span(
  css_1.default({
    width: 3,
    height: 3,
    backgroundColor: 'switch.toggle',
    borderRadius: '50%',
    position: 'absolute',
    margin: '1px',
    left: 0,
    transition: 'left ease',
    transitionDuration: (theme) => theme.speeds[3],
    boxSizing: 'border-box',
  })
);
const SwitchInput = styled_components_1.default.input(
  css_1.default({
    width: 0,
    opacity: 0,
    position: 'absolute',
    left: -100,
  })
);
const SwitchContainer = styled_components_1.default(Element_1.Element)(
  css_1.default({
    'input:checked + [data-component=SwitchBackground]': {
      backgroundColor: 'switch.backgroundOn',
    },
    'input:checked + [data-component=SwitchBackground] [data-component=SwitchToggle]':
      {
        left: (theme) => theme.space[4] - 4 + 'px',
      },
    '*': {
      boxSizing: 'border-box',
    },
    '&[data-disabled] > [data-component=SwitchBackground]': {
      opacity: 0.4,
      cursor: 'not-allowed',
    },
  })
);
exports.Switch = (_a) => {
  var { on, defaultOn, disabled } = _a,
    props = __rest(_a, ['on', 'defaultOn', 'disabled']);
  return react_1.default.createElement(
    SwitchContainer,
    {
      as: 'label',
      'data-disabled': disabled ? true : null,
    },
    react_1.default.createElement(
      SwitchInput,
      Object.assign(
        {
          type: 'checkbox',
          checked: on,
          defaultChecked: defaultOn,
          disabled: disabled,
        },
        props
      )
    ),
    react_1.default.createElement(
      SwitchBackground,
      {
        'data-component': 'SwitchBackground',
      },
      react_1.default.createElement(SwitchToggle, {
        'data-component': 'SwitchToggle',
      })
    )
  );
};
