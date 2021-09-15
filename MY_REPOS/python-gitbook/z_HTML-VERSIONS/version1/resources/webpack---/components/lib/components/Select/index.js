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
exports.Select = void 0;
const react_1 = __importDefault(require('react'));
const deepmerge_1 = __importDefault(require('deepmerge'));
const styled_components_1 = __importDefault(require('styled-components'));
const css_1 = __importDefault(require('@styled-system/css'));
const Input_1 = require('../Input');
const Element_1 = require('../Element');
const variantStyles = {
  default: {
    // inherits from input
  },
  link: {
    border: 'none',
    backgroundColor: 'transparent',
  },
};
const variantCarets = {
  default: (fill) => `
    <svg width="8" height="24" viewBox="0 0 8 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 7L7 11H1L4 7Z" fill="${fill}" />
      <path d="M4 17L1 13L7 13L4 17Z" fill="${fill}" />
    </svg>
  `,
  link: (fill) => `
    <svg width="8" height="24" viewBox="0 0 8 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 15L1 11L7 11L4 15Z" fill="${fill}" />
    </svg>
  `,
};
// <path d="M4 14L1 10H7L4 14Z" fill="${fill}" />
const getSVG = (variant, color) => {
  const fill = '#' + (color || '').split('#')[1];
  // caret icon
  const svgString = variantCarets[variant](fill);
  const header = 'data:image/svg+xml,';
  const encoded = encodeURIComponent(svgString)
    .replace(/'/g, '%27')
    .replace(/"/g, '%22');
  return header + encoded;
};
const SelectComponent = styled_components_1
  .default(Input_1.Input)
  .attrs(() => ({
    as: 'select',
  }))(({ variant = 'default' }) =>
  css_1.default(
    deepmerge_1.default(variantStyles[variant], {
      appearance: 'none',
      color: 'input.placeholderForeground',
      transition: 'all ease',
      transitionDuration: (theme) => theme.speeds[2],
      paddingRight: 5,
      backgroundImage: (theme) =>
        theme &&
        `url(${getSVG(variant, theme.colors.input.placeholderForeground)})`,
      backgroundPosition: 'calc(100% - 8px) center',
      backgroundRepeat: 'no-repeat',
      ':hover, :focus': {
        color: 'input.foreground',
        backgroundImage: (theme) =>
          theme && `url(${getSVG(variant, theme.colors.input.foreground)})`,
      },
    })
  )
);
const SelectWithIcon = styled_components_1.default(Element_1.Element)(
  ({ variant = 'default' }) =>
    css_1.default({
      position: 'relative',
      color: 'input.placeholderForeground',
      transition: 'all ease',
      transitionDuration: (theme) => theme.speeds[2],
      select: {
        paddingLeft: 7,
      },
      svg: {
        position: 'absolute',
        left: 2,
        top: '50%',
        transform: 'translateY(-50%)',
      },
      // hover anywhere on the component should make all elements change
      ':hover, :focus-within': {
        // the svg takes currentcolor
        color: 'input.foreground',
        select: {
          color: 'input.foreground',
          backgroundImage: (theme) =>
            `url(${getSVG(variant, theme.colors.input.foreground)})`,
        },
      },
    })
);
exports.Select = (_a) => {
  var { icon = null, placeholder = null } = _a,
    props = __rest(_a, ['icon', 'placeholder']);
  const PrefixIcon = icon;
  if (icon)
    return react_1.default.createElement(
      SelectWithIcon,
      {
        variant: props.variant,
      },
      react_1.default.createElement(PrefixIcon, null),
      react_1.default.createElement(
        SelectComponent,
        Object.assign({}, props),
        placeholder
          ? react_1.default.createElement(
              'option',
              {
                value: '',
              },
              placeholder
            )
          : null,
        props.children
      )
    );
  return react_1.default.createElement(
    SelectComponent,
    Object.assign({}, props),
    placeholder
      ? react_1.default.createElement(
          'option',
          {
            value: '',
          },
          placeholder
        )
      : null,
    props.children
  );
};
