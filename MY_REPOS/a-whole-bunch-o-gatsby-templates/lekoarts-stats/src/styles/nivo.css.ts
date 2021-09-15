import { style, composeStyles } from '@vanilla-extract/css'
import { atoms } from './sprinkles.css'

export const header = composeStyles(
  atoms({
    fontWeight: 'semibold',
    color: {
      light: 'black',
      dark: 'white',
    },
    borderBottomColor: {
      light: 'gray-100',
      dark: 'gray-600',
    },
    padding: '0x',
  }),
  style({
    borderBottomWidth: `1px`,
    borderBottomStyle: `solid`,
  })
)
