'use strict';
Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.secondary = void 0;
const styled_components_1 = require('styled-components');
const base = styled_components_1.css`
  font-family: 'Poppins';
`;
exports.secondary = {
  base,
  tiny: styled_components_1.css`
    ${base};
    font-weight: 500;
    font-size: 10px;
    line-height: 15px;
    letter-spacing: -0.02em;
  `,
  small: styled_components_1.css`
    ${base};
    font-weight: 500;
    font-size: 12px;
    line-height: 18px;
    letter-spacing: -0.02em;
  `,
  normal: styled_components_1.css`
    ${base};
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    letter-spacing: -0.02em;
  `,
  medium: styled_components_1.css`
    ${base};
    font-weight: 500;
    font-size: 18px;
    line-height: 27px;
  `,
  large: styled_components_1.css`
    ${base};
    font-size: 24px;
    line-height: 36px;
    letter-spacing: -0.02em;
  `,
  huge: styled_components_1.css`
    ${base};
    font-size: 36px;
    line-height: 54px;
    letter-spacing: -0.04em;
  `,
};
