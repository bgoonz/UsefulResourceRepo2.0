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
exports.Element = void 0;
const styled_components_1 = __importDefault(require('styled-components'));
const css_1 = __importDefault(require('@styled-system/css'));
exports.Element = styled_components_1.default.div((props) =>
  css_1.default(
    Object.assign(
      {
        boxSizing: 'border-box',
        margin: nullCheck(props.margin),
        marginX: nullCheck(props.marginX),
        marginY: nullCheck(props.marginY),
        marginBottom: nullCheck(props.marginBottom),
        marginTop: nullCheck(props.marginTop),
        marginLeft: nullCheck(props.marginLeft),
        marginRight: nullCheck(props.marginRight),
        padding: nullCheck(props.padding),
        paddingX: nullCheck(props.paddingX),
        paddingY: nullCheck(props.paddingY),
        paddingBottom: nullCheck(props.paddingBottom),
        paddingTop: nullCheck(props.paddingTop),
        paddingLeft: nullCheck(props.paddingLeft),
        paddingRight: nullCheck(props.paddingRight),
      },
      props.css || {}
    )
  )
);
const nullCheck = (value) => {
  // 0 is an allowed value, even though it's falsy
  if (typeof value !== 'undefined') return value;
  return null;
};
