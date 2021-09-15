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
exports.theme = void 0;
const codesandbox_json_1 = __importDefault(
  require('../themes/codesandbox.json')
);
const breakpoints_1 = require('./breakpoints');
const createTheme_1 = require('./createTheme');
const fonts = __importStar(require('./fonts'));
exports.theme = Object.assign(
  Object.assign(
    {},
    createTheme_1.createTheme({
      background: '#24282A',
      background2: '#1C2022',
      background3: '#374140',
      background4: '#141618',
      background5: '#111518',
      primary: '#FFD399',
      primaryText: '#7F694C',
      lightText: '#F2F2F2',
      secondary: '#40A9F3',
      shySecondary: '#66b9f4',
      darkBlue: '#1081D0',
      white: '#E0E0E0',
      gray: '#C0C0C0',
      black: '#74757D',
      green: '#5da700',
      redBackground: '#400000',
      red: '#F27777',
      dangerBackground: '#DC3545',
      sidebar: '#191d1f',
      placeholder: '#B8B9BA',
    })
  ),
  {
    vscodeTheme: codesandbox_json_1.default,
    new: Object.assign(
      {},
      createTheme_1.createTheme({
        title: '#EEEEFF',
        description: '#777788',
        bg: '#2B2E41',
      })
    ),
    fonts,
    media: breakpoints_1.media,
    sizes: breakpoints_1.sizes,
  }
);
