import { globalStyle, style } from '@vanilla-extract/css'
import { breakpoints, vars } from './vars.css'

globalStyle('html', {
  fontSize: vars.fontSize.md,
  '@media': {
    [`screen and (min-width: ${breakpoints.desktop})`]: {
      fontSize: vars.fontSize.lg,
    },
  },
})

globalStyle('html, body', {
  boxSizing: 'border-box',
  border: 'none',
  margin: 0,
  padding: 0,
})

globalStyle('.dark', {
  background: vars.color['gray-900'],
  color: vars.color['gray-100'],
  vars: {
    '--chart-text-color': vars.color['gray-100'],
    '--chart-crosshair-color': vars.color['gray-100'],
    '--chart-axis-color': vars.color['gray-300'],
    '--chart-grid-color': vars.color['gray-700'],
  },
})

globalStyle('body', {
  boxSizing: 'border-box',
  fontFamily: vars.fontFamily.body,
  fontWeight: vars.fontWeight.medium,
  border: 'none',
  margin: 0,
  padding: 0,
  color: vars.color['gray-700'],
  background: vars.color.white,
})

export const linkStyle = style({
  color: vars.color.black,
  textDecoration: 'none',
  fontStyle: 'italic',
  transition: 'all 0.3s ease-in-out',
  ':hover': {
    textDecoration: 'underline',
    color: vars.color.primary,
  },
  selectors: {
    '.dark &': {
      color: vars.color['gray-100'],
    },
  },
})

globalStyle('.dark :is(h1, h2, h3, h4, h5, h6)', {
  color: vars.color.white,
})

globalStyle('h1, h2, h3, h4, h5, h6', {
  color: vars.color.black,
  fontWeight: 800,
})

globalStyle('h1', {
  fontSize: '1.802rem',
})

globalStyle('h2', {
  fontSize: '1.602rem',
})

globalStyle('h3', {
  fontSize: '1.424rem',
})

globalStyle('h4', {
  fontSize: '1.266rem',
})
