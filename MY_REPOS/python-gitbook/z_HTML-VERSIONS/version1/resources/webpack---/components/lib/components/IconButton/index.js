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
exports.IconButton = void 0;
// @ts-nocheck
const react_1 = __importDefault(require('react'));
const deepmerge_1 = __importDefault(require('deepmerge'));
const Button_1 = require('../Button');
const Icon_1 = require('../Icon');
const Tooltip_1 = require('../Tooltip');
exports.IconButton = (_a) => {
  var { name, title, size, css = {} } = _a,
    props = __rest(_a, ['name', 'title', 'size', 'css']);
  return (
    // @ts-ignore
    react_1.default.createElement(
      Tooltip_1.Tooltip,
      {
        label: title,
      },
      react_1.default.createElement(
        Button_1.Button,
        Object.assign(
          {
            variant: 'link',
            css: deepmerge_1.default(
              {
                width: '26px',
                paddingX: 0,
                borderRadius: '50%',
                ':hover:not(:disabled)': {
                  backgroundColor: 'secondaryButton.background',
                },
                ':focus:not(:disabled)': {
                  outline: 'none',
                  backgroundColor: 'secondaryButton.background',
                },
              },
              css
            ),
          },
          props
        ),
        react_1.default.createElement(Icon_1.Icon, {
          name: name,
          size: size,
        })
      )
    )
  );
};
