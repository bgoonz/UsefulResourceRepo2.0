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
exports.ResponsivePreview = void 0;
const react_1 = __importDefault(require('react'));
const IconBase_1 = __importDefault(require('react-icons/IconBase'));
exports.ResponsivePreview = (_a) => {
  var { active } = _a,
    props = __rest(_a, ['active']);
  return react_1.default.createElement(
    IconBase_1.default,
    Object.assign(
      {
        fill: 'none',
        viewBox: '0 0 24 24',
      },
      props
    ),
    react_1.default.createElement('path', {
      fill: active ? '#E6E6E6' : 'currentColor',
      fillRule: 'evenodd',
      d: 'M10.25 6a1 1 0 011-1h8a1 1 0 011 1v11.333a1 1 0 01-1 1h-5.754a.996.996 0 00.004-.083v-8.5a1 1 0 00-1-1h-2.25V6zM6.5 9.5a.5.5 0 00-.5.5v9.5a.5.5 0 00.5.5h5.75a.5.5 0 00.5-.5V10a.5.5 0 00-.5-.5H6.5z',
      clipRule: 'evenodd',
    })
  );
};
