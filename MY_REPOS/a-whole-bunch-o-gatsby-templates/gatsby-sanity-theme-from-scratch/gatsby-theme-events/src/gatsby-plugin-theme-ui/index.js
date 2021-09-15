export default {
  space: [0, 4, 8, 16, 32],
  fonts: {
    body: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
  },
  fontSizes: [16, 18, 20, 22, 27, 36],
  lineHeights: {
    body: 1.45,
    heading: 1.1,
  },
  colors: {
    gray: ['#efefef', '#ddd', '#333', '#111'],
    background: '#fff',
    primary: 'rebeccapurple',
  },
  sizes: {
    default: '90vw',
    max: '650px',
  },
  styles: {
    h1: {
      color: 'gray.3',
      fontSize: 5,
      fontWeight: 'bold',
      lineHeight: 'heading',
      margin: '1rem 0 0',
    },
    ul: {
      borderTop: '1px solid',
      borderColor: 'gray.0',
      listStyle: 'none',
      padding: 0,
    },
    li: {
      borderBottom: '1px solid',
      borderColor: 'gray.1',
      padding: 2,
      '&:focus-within,&:hover': {
        backgroundColor: 'gray.0',
      },
    },
    code: {
      display: 'inline-block',
      backgroundColor: 'gray.0',
      border: '1px solid',
      borderColor: 'gray.1',
      borderRadius: 4,
      fontSize: 0,
      lineHeight: 'heading',
      padding: 1,
    },
  },
}
