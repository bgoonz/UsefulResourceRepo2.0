import { css } from 'styled-components';

//TODO
const breakpoints = {
  desktop: 1170,
  laptop: 992,
  tablet: 768,
  phone: 376,
};

const colors = {
  white: '#fff',
  text: '#000',
  blue: '#07c',
  gray: ['#333', '#666', '#999', '#ccc', '#eee', '#f6f6f6'],
};

const components = {
  header:{ background: colors.gray[4], scrolledBackground:"rgba(238,238,238,0.41)" },
  footer:{ background: colors.gray[4] }
}

const buttons = {
  neutral: { background: colors.white, text: colors.white },
  primary: { background: colors.blue, text: colors.white },
};

const space = [0, 4, 8, 16, 32, 64, 128, 256, 512];

const fontSizes = [12, 14, 16, 20, 24, 32, 48, 64, 96, 128];

const lineHeights = [1, 1.125, 1.25, 1.5];

const fontWeights = {
  normal: 500,
  bold: 700,
};

const letterSpacings = {
  normal: 'normal',
  caps: '0.25em',
};

// border-radius
const radii = [0, 2, 4, 8];

const borderWidths = [0, 1, 2];

const shadows = [`0 1px 2px 0 ${colors.text}`, `0 1px 4px 0 ${colors.text}`];

// iterate through the sizes and create a media template
export const media = Object.keys(breakpoints).reduce((accumulator, label) => {
  // use em in breakpoints to work properly cross-browser and support users
  // changing their browsers font-size: https://zellwk.com/blog/media-query-units/
  const emSize = breakpoints[label] / 16;
  accumulator[label] = (...args) => css`
    @media (max-width: ${emSize}em) {
      ${css(...args)};
    }
  `;
  return accumulator;
}, {});

const theme = {
  breakpoints,
  media,
  colors,
  buttons,
  components,
  space,
  fontSizes,
  lineHeights,
  fontWeights,
  letterSpacings,
  radii,
  borderWidths,
  shadows,
};

export default theme;
