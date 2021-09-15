'use strict';
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
exports.Row = exports.Column = exports.Grid = void 0;
const styled_components_1 = __importDefault(require('styled-components'));
const css_1 = __importDefault(require('@styled-system/css'));
const Element_1 = require('../Element');
const fontSize = 1; // rem = 16px
const lineHeight = fontSize * 1.5;
exports.Grid = styled_components_1.default(Element_1.Element)(
  ({ columnGap, rowGap }) =>
    css_1.default({
      display: 'grid',
      gridTemplateColumns: 'repeat(12, 1fr)',
      gridColumnGap:
        typeof columnGap !== 'undefined' ? columnGap : lineHeight * 2 + 'rem',
      gridRowGap: typeof rowGap !== 'undefined' ? rowGap : lineHeight + 'rem',
    })
);
// todo: end and span cant be together
// valid combinations are
// start | start + end | start + span | span
// span + end is also possible but not implemented here
exports.Column = styled_components_1.default(Element_1.Element)(
  ({ start, end, span }) => {
    const styles = {};
    if (Array.isArray(start)) styles.gridColumnStart = start.map((s) => s);
    else if (start) styles.gridColumnStart = start;
    if (Array.isArray(end)) styles.gridColumnEnd = end.map((s) => s + 1);
    else if (end) styles.gridColumnEnd = end + 1;
    if (Array.isArray(span))
      styles.gridColumnEnd = span.map((s) => 'span  ' + s);
    else if (span) styles.gridColumnEnd = 'span ' + span;
    // not sure if span=0 is a good idea, we'll find out
    if (Array.isArray(span)) {
      styles.display = span.map((s) => (s === 0 ? 'none' : 'inherit'));
    } else if (span === 0) styles.display = 'none';
    return css_1.default(styles);
  }
);
exports.Row = styled_components_1.default(exports.Grid).attrs({
  span: 12,
})(
  css_1.default({
    gridColumnEnd: 'span 12',
  })
);
