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
exports.Text = void 0;
const styled_components_1 = __importDefault(require('styled-components'));
const css_1 = __importDefault(require('@styled-system/css'));
const Element_1 = require('../Element');
const variants = {
  body: 'inherit',
  muted: 'mutedForeground',
  danger: 'errorForeground',
  active: 'button.background',
};
const overflowStyles = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
};
exports.Text = styled_components_1.default(Element_1.Element).attrs((p) => ({
  as: p.as || 'span',
}))((_a) => {
  var {
      size,
      fontStyle,
      align,
      weight,
      block,
      variant = 'body',
      maxWidth,
    } = _a,
    props = __rest(_a, [
      'size',
      'fontStyle',
      'align',
      'weight',
      'block',
      'variant',
      'maxWidth',
    ]);
  return css_1.default(
    Object.assign(
      {
        fontSize: size || 'inherit',
        textAlign: align || 'left',
        fontWeight: weight || null,
        lineHeight: 'normal',
        fontStyle: fontStyle || null,
        display: block || maxWidth ? 'block' : 'inline',
        color: variants[variant],
        maxWidth,
      },
      maxWidth ? overflowStyles : {}
    )
  );
});
