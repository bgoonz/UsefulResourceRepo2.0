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
exports.buttonStyles = exports.Button = void 0;
const react_1 = __importDefault(require('react'));
const elements_1 = require('./elements');
Object.defineProperty(exports, 'buttonStyles', {
  enumerable: true,
  get: function () {
    return elements_1.styles;
  },
});
const Button = (_a) => {
  var { style = {} } = _a,
    props = __rest(_a, ['style']);
  // Link
  if (typeof props.to === 'string') {
    // @ts-ignore
    return react_1.default.createElement(
      elements_1.LinkButton,
      Object.assign({}, props, {
        style: style,
        to: props.to,
      })
    );
  }
  if (props.href) {
    // @ts-ignore
    return react_1.default.createElement(
      elements_1.AButton,
      Object.assign({}, props, {
        style: style,
      })
    );
  }
  // @ts-ignore
  return react_1.default.createElement(
    elements_1.ReakitButton,
    Object.assign({}, props, {
      style: style,
    })
  );
};
exports.Button = Button;
