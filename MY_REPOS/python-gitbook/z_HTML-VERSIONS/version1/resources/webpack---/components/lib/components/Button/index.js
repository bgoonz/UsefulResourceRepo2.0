'use strict';
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        Object.defineProperty(o, k2, {
          enumerable: true,
          get: function () {
            return m[k];
          },
        });
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', {
          enumerable: true,
          value: v,
        });
      }
    : function (o, v) {
        o['default'] = v;
      });
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null)
      for (var k in mod)
        if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
  };
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
exports.Button = void 0;
const react_1 = __importDefault(require('react'));
const deepmerge_1 = __importDefault(require('deepmerge'));
const styled_components_1 = __importStar(require('styled-components'));
const react_router_dom_1 = require('react-router-dom');
const visually_hidden_1 = __importDefault(require('@reach/visually-hidden'));
const Element_1 = require('../Element');
const variantStyles = {
  primary: {
    backgroundColor: 'button.background',
    color: 'button.foreground',
    ':hover:not(:disabled)': {
      // hoverBackground is polyfilled and uses a gradient
      // so we use background and not backgroundColor
      // background is not hooked to the system like backgroundColor
      // so we need to write the long syntax
      // TODO @sid: extend our system to make background work as well
      background: (theme) => theme.colors.button.hoverBackground,
    },
    ':focus:not(:disabled)': {
      // we use the same colors for hover and focus
      // but we add an active state to give
      background: (theme) => theme.colors.button.hoverBackground,
    },
  },
  secondary: {
    backgroundColor: 'secondaryButton.background',
    color: 'secondaryButton.foreground',
    // same technique as primary
    ':hover:not(:disabled)': {
      background: (theme) => theme.colors.secondaryButton.hoverBackground,
    },
    ':focus:not(:disabled)': {
      background: (theme) => theme.colors.secondaryButton.hoverBackground,
    },
  },
  link: {
    backgroundColor: 'transparent',
    color: 'mutedForeground',
    // same technique as primary
    ':hover:not(:disabled)': {
      color: 'foreground',
    },
    ':focus:not(:disabled)': {
      color: 'foreground',
    },
  },
  danger: {
    backgroundColor: 'dangerButton.background',
    color: 'dangerButton.foreground',
    // same technique as primary
    ':hover:not(:disabled)': {
      background: (theme) => theme.colors.dangerButton.hoverBackground,
    },
    ':focus:not(:disabled)': {
      background: (theme) => theme.colors.dangerButton.hoverBackground,
    },
  },
};
const commonStyles = {
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  flex: 'none',
  cursor: 'pointer',
  fontFamily: 'Inter, sans-serif',
  paddingY: 0,
  width: '100%',
  paddingX: 2,
  height: '26px',
  fontSize: 2,
  fontWeight: 'medium',
  lineHeight: 1,
  border: 'none',
  borderRadius: 'small',
  transition: 'all ease-in',
  textDecoration: 'none',
  transitionDuration: (theme) => theme.speeds[2],
  ':focus': {
    outline: 'none',
  },
  ':active:not(:disabled)': {
    transform: 'scale(0.98)',
  },
  ':disabled': {
    opacity: '0.4',
    cursor: 'not-allowed',
  },
  '&[data-loading="true"]': {
    opacity: 1,
    cursor: 'default',
  },
  '&[data-auto-width="true"]': {
    width: 'fit-content',
  },
};
exports.Button = react_1.default.forwardRef(function Button(_a, ref) {
  var { variant = 'primary', loading, css = {}, autoWidth, as: pAs } = _a,
    props = __rest(_a, ['variant', 'loading', 'css', 'autoWidth', 'as']);
  const styles = deepmerge_1.default.all([
    variantStyles[variant],
    commonStyles,
    css,
  ]);
  const usedAs = pAs || (props.to ? react_router_dom_1.Link : 'button');
  // default type is button unless props.as was changed
  const type = usedAs === 'button' && 'button';
  return react_1.default.createElement(
    Element_1.Element,
    Object.assign(
      {
        as: usedAs,
        type: type,
        css: styles,
        ref: ref,
        disabled: props.disabled || loading,
        'data-loading': loading,
        'data-auto-width': autoWidth,
      },
      props
    ),
    loading
      ? react_1.default.createElement(AnimatingDots, null)
      : props.children
  );
});
/** Animation dots, we use the styled.span syntax
 *  because keyframes aren't supported in the object syntax
 */
const transition = styled_components_1.keyframes({
  '0%': {
    opacity: 0.6,
  },
  '50%': {
    opacity: 1,
  },
  '100%': {
    opacity: 0.6,
  },
});
const Dot = styled_components_1.default.span`
  font-size: 18px;
  animation: ${transition} 1.5s ease-out infinite;
`;
const AnimatingDots = () =>
  react_1.default.createElement(
    react_1.default.Fragment,
    null,
    react_1.default.createElement(visually_hidden_1.default, null, 'Loading'),
    react_1.default.createElement(
      'span',
      {
        role: 'presentation',
      },
      react_1.default.createElement(Dot, null, '\u00B7'),
      react_1.default.createElement(
        Dot,
        {
          style: {
            animationDelay: '200ms',
          },
        },
        '\u00B7'
      ),
      react_1.default.createElement(
        Dot,
        {
          style: {
            animationDelay: '400ms',
          },
        },
        '\u00B7'
      )
    )
  );
