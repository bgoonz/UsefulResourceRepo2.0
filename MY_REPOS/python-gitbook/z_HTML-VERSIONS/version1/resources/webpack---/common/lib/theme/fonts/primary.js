'use strict';
Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.primary = void 0;
const styled_components_1 = require('styled-components');
const base = styled_components_1.css`
  font-family: 'Open Sans';
`;
exports.primary = {
  base,
  tiny: styled_components_1.css`
    ${base};
    font-size: 10px;
    line-height: 14px;
    letter-spacing: -0.04em;
  `,
  small: styled_components_1.css`
    ${base};
    font-size: 12px;
    line-height: 16px;
    letter-spacing: -0.04em;
  `,
  normal: styled_components_1.css`
    ${base};
    font-size: 14px;
    line-height: 19px;
    letter-spacing: -0.04em;
  `,
  medium: styled_components_1.css`
    ${base};
    font-size: 18px;
    line-height: 25px;
    letter-spacing: -0.02em;
  `,
  large: styled_components_1.css`
    ${base};
    font-weight: 300;
    font-size: 24px;
    line-height: 33px;
    letter-spacing: -0.04em;
  `,
  huge: styled_components_1.css`
    ${base};
    font-weight: 300;
    font-size: 36px;
    line-height: 49px;
    letter-spacing: -0.06em;
  `,
};
