import { style, composeStyles } from '@vanilla-extract/css'
import { atoms } from './sprinkles.css'
import { breakpoints, vars } from './vars.css'

export const header = composeStyles(
  atoms({
    paddingY: {
      mobile: '3x',
      desktop: '5x',
    },
    paddingX: {
      mobile: '4x',
      desktop: '6x',
    },
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: {
      light: 'gray-100',
      dark: 'gray-700',
    },
  }),
  style({
    borderBottomStyle: 'solid',
    borderBottomWidth: '1px',
  })
)

export const button = composeStyles(
  atoms({
    paddingY: '2x',
    paddingX: '4x',
    background: {
      light: 'gray-100',
      dark: 'gray-800',
    },
    color: {
      light: 'black',
      dark: 'white',
    },
    borderRadius: 'md',
    marginRight: '4x',
  }),
  style({
    border: 'none',
    appearance: 'none',
    cursor: 'pointer',
  })
)

export const content = composeStyles(
  atoms({
    display: 'grid',
  }),
  style({
    gridTemplateColumns: '100%',
    gridGap: '2%',
    '@media': {
      [`screen and (min-width: ${breakpoints.desktop})`]: {
        gridTemplateColumns: '49% 49%',
      },
    },
  })
)

export const lineContainer = style({
  height: `calc(${vars.chartHeight.sm} * 1px)`,
  '@media': {
    [`screen and (min-width: ${breakpoints.desktop})`]: {
      height: `calc(${vars.chartHeight.md} * 1px)`,
    },
  },
})

export const footer = composeStyles(
  atoms({
    paddingY: {
      mobile: '3x',
      desktop: '5x',
    },
    paddingX: {
      mobile: '4x',
      desktop: '6x',
    },
    color: {
      light: 'gray-600',
      dark: 'gray-200',
    },
    borderTopColor: {
      light: 'gray-100',
      dark: 'gray-700',
    },
  }),
  style({
    fontSize: '0.9rem',
    borderTopStyle: 'solid',
    borderTopWidth: '1px',
  })
)
