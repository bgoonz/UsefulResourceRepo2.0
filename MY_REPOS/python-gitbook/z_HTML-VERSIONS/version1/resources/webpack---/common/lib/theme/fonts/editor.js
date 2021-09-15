'use strict';
Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.editor = void 0;
const styled_components_1 = require('styled-components');
const base = styled_components_1.css`
  font-family: 'Roboto';
`;
exports.editor = {
  base,
  tiny: styled_components_1.css`
    ${base};
    font-size: 10px;
    line-height: 14px;
  `,
  small: styled_components_1.css`
    ${base};
    font-size: 12px;
    line-height: 14px;
  `,
  normal: styled_components_1.css`
    ${base};
    font-size: 14px;
    line-height: 16px;
  `,
  medium: styled_components_1.css`
    ${base};
    font-size: 18px;
    line-height: 21px;
  `,
  large: styled_components_1.css`
    ${base};
    font-weight: 300;
    font-size: 24px;
    line-height: 28px;
  `,
  huge: styled_components_1.css`
    ${base};
    font-weight: 300;
    font-size: 36px;
    line-height: 42px;
    letter-spacing: -0.02em;
  `,
};
