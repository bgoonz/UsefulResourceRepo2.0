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
exports.SingletonTooltip = void 0;
const react_1 = __importDefault(require('react'));
const styled_components_1 = __importDefault(require('styled-components'));
const react_2 = __importStar(require('@tippy.js/react'));
const tippy_js_1 = require('tippy.js');
const theme_1 = __importDefault(require('../../theme'));
require('tippy.js/dist/tippy.css');
require('tippy.js/dist/backdrop.css');
require('tippy.js/animations/shift-away.css');
const defaultProps = {
  delay: [500, 100],
  boundary: 'window',
  animateFill: true,
  plugins: [tippy_js_1.animateFill],
};
const mainStyles = `
  background-color: #242424;
  box-shadow: 0 16px 32px rgba(0,0,0,.24), 0 4px 4px rgba(0,0,0,.12); 
  
  .tippy-backdrop {
    background-color: #242424;
    box-shadow: 0 16px 32px rgba(0,0,0,.24), 0 4px 4px rgba(0,0,0,.12); 
  }
`;
const MainTippy = styled_components_1.default(react_2.default)`
  ${mainStyles}
`;
const UpdateTippy = styled_components_1.default(react_2.default)`
  background-color: ${theme_1.default.green()};
  border-radius: 2px;
  padding: 0;

  .tippy-arrow {
    border-bottom-color: ${theme_1.default.green()};
  }
`;
exports.SingletonTooltip = styled_components_1.default((_a) => {
  var { children, style = {}, content } = _a,
    props = __rest(_a, ['children', 'style', 'content']);
  const singleton = react_2.useSingleton(
    Object.assign(
      Object.assign(Object.assign({}, defaultProps), {
        updateDuration: 250,
      }),
      props
    )
  );
  return children(singleton);
})`
  ${mainStyles}
`;
const Tooltip = (_a) => {
  var { children, style = {}, content } = _a,
    props = __rest(_a, ['children', 'style', 'content']);
  const TippyComponent = props.theme === 'update' ? UpdateTippy : MainTippy;
  return react_1.default.createElement(
    TippyComponent,
    Object.assign(
      {
        content: content,
      },
      defaultProps,
      props
    ),
    react_1.default.createElement(
      'span',
      {
        style: Object.assign(
          {
            outlineColor: 'transparent',
          },
          style
        ),
      },
      children
    )
  );
};
exports.default = Tooltip;
