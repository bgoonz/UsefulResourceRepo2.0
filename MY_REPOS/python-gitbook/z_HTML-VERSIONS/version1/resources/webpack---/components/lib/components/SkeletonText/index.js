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
exports.SkeletonText = void 0;
const styled_components_1 = __importStar(require('styled-components'));
const color_1 = __importDefault(require('color'));
const Element_1 = require('../Element');
// export interface ITextProps extends React.HTMLAttributes<HTMLSpanElement> {}
const pulse = styled_components_1.keyframes`
  0% { background-position: 100% 50%; }
  100% { background-position: -100% 50%; }
`;
exports.SkeletonText = styled_components_1.default(Element_1.Element)(
  (props) => {
    const color = props.theme.colors.sideBar.border;
    const themeType = props.theme.type || props.theme.vscodeTheme.type;
    /**
     * This is fun,
     * We animate the background gradient to create a pulse animation
     *
     * To support all themes nicely, we can't really pick a value from the theme
     * So, we take the sidebar.border and then change it's luminosity
     * 14% for background and 16% for the pulse highlight on top
     * We need to set the value to 100 - value for light themes
     */
    const backgroundLuminosity = themeType === 'light' ? 86 : 14;
    const highlightLuminosity = themeType === 'light' ? 88 : 16;
    // @ts-ignore - we have multiple versions of color in the app
    // which leads to confusing type checks
    const [h, s] = color_1.default(color).hsl().color;
    const background = color_1
      .default({
        h,
        s,
        l: backgroundLuminosity,
      })
      .string();
    const highlight = color_1
      .default({
        h,
        s,
        l: highlightLuminosity,
      })
      .string();
    return styled_components_1.css`
      height: 16px;
      width: 200px;
      border-radius: 2px;
      opacity: 0.7;
      animation: ${pulse} 4s linear infinite;
      background: linear-gradient(
        90deg,
        ${background} 0%,
        ${background} 20%,
        ${highlight} 50%,
        ${background} 80%,
        ${background} 100%
      );
      background-size: 200% 200%;
    `;
  }
);
