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
exports.SkipNav = exports.SkipNavStyles = void 0;
const react_1 = __importDefault(require('react'));
const Reach = __importStar(require('@reach/skip-nav'));
const styled_components_1 = require('styled-components');
const css_1 = __importDefault(require('@styled-system/css'));
exports.SkipNavStyles = styled_components_1.createGlobalStyle(
  css_1.default({
    '[data-reach-skip-nav-link]': {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      width: 1,
      margin: '-1px',
      padding: 0,
      overflow: 'hidden',
      position: 'absolute',
    },
    '[data-reach-skip-nav-link]:focus': {
      position: 'fixed',
      top: 2,
      left: 2,
      padding: 2,
      backgroundColor: 'grays.700',
      border: '1px solid',
      borderColor: 'grays.600',
      zIndex: 1,
      width: 'auto',
      height: 'auto',
      clip: 'auto',
    },
  })
);
const SkipNavLink = () =>
  react_1.default.createElement(Reach.SkipNavLink, null);
const SkipNav = {
  Link: SkipNavLink,
  Content: Reach.SkipNavContent,
};
exports.SkipNav = SkipNav;
