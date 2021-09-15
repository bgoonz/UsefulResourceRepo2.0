export default {
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  sizes: {
    container: `1024px`,
  },
  fonts: {
    body: 'Roboto, system-ui, sans-serif',
    heading: 'Roboto, system-ui, sans-serif',
    monospace: '"Roboto Mono", monospace',
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
  fontWeights: {
    body: 400,
    heading: 600,
    bold: 600,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  colors: {
    text: '#202124',
    background: '#fff',
    primary: '#1a73e8',
    primaryMuted: '#ddebfb',
    secondary: '#9c27b0',
    muted: '#626a71',
  },
  containers: {
    default: {
      maxWidth: `container`,
      padding: 4,
      margin: `0 auto`,
    },
  },
  list: {
    default: {
      h2: {
        mt: 5,
        color: `secondary`,
      },
    },
  },
  listItem: {
    subline: {
      color: `muted`,
      'div:last-of-type': {
        ml: 3,
      },
    },
  },
  styles: {
    root: {
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body',
      margin: 0,
      padding: 0,
      boxSizing: `border-box`,
      textRendering: `optimizeLegibility`,
    },
    h1: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 5,
    },
    h2: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 4,
    },
    h3: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 3,
    },
    p: {
      color: 'text',
      fontFamily: 'body',
      fontWeight: 'body',
      lineHeight: 'body',
    },
    a: {
      color: 'primary',
    },
    img: {
      maxWidth: '100%',
    },
  },
}
