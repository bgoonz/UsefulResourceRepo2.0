'use strict';
Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.title = void 0;
const styled_components_1 = require('styled-components');
const base = styled_components_1.css`
  font-family: 'Poppins';
`;
exports.title = {
  base,
  tiny: styled_components_1.css`
    ${base};
    font-weight: 600;
    font-size: 10px;
    line-height: 15px;
  `,
  small: styled_components_1.css`
    ${base};
    font-weight: 600;
    font-size: 12px;
    line-height: 18px;
  `,
  normal: styled_components_1.css`
    ${base};
    font-weight: 600;
    font-size: 14px;
    line-height: 21px;
  `,
  medium: styled_components_1.css`
    ${base};
    font-weight: 600;
    font-size: 18px;
    line-height: 27px;
  `,
  large: styled_components_1.css`
    ${base};
    font-weight: 600;
    font-size: 24px;
    line-height: 36px;
    letter-spacing: -0.02em;
  `,
  huge: styled_components_1.css`
    ${base};
    font-weight: 600;
    font-size: 36px;
    line-height: 54px;
    letter-spacing: -0.03em;
  `,
};
