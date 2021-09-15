import { createAtomicStyles, createAtomsFn } from '@vanilla-extract/sprinkles'
import { breakpoints, vars } from './vars.css'

const staticStyles = createAtomicStyles({
  properties: {
    fontFamily: vars.fontFamily,
    boxShadow: vars.shadow,
    borderRadius: vars.radii,
  },
})

const responsiveStyles = createAtomicStyles({
  conditions: {
    mobile: {},
    tablet: { '@media': `screen and (min-width: ${breakpoints.tablet})` },
    desktop: { '@media': `screen and (min-width: ${breakpoints.desktop})` },
  },
  defaultCondition: 'mobile',
  properties: {
    display: ['none', 'flex', 'grid'],
    flexDirection: ['row', 'column'],
    justifyContent: ['space-between', 'flex-start', 'flex-end'],
    alignItems: ['center', 'flex-start', 'flex-end'],
    paddingTop: vars.space,
    paddingBottom: vars.space,
    paddingLeft: vars.space,
    paddingRight: vars.space,
    marginTop: vars.space,
    marginBottom: vars.space,
    marginLeft: vars.space,
    marginRight: vars.space,
    fontSize: vars.fontSize,
    fontWeight: vars.fontWeight,
  },
  shorthands: {
    padding: ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'],
    paddingX: ['paddingLeft', 'paddingRight'],
    paddingY: ['paddingTop', 'paddingBottom'],
    margin: ['marginTop', 'marginBottom', 'marginLeft', 'marginRight'],
    marginX: ['marginLeft', 'marginRight'],
    marginY: ['marginTop', 'marginBottom'],
  },
})

const colorModeStyles = createAtomicStyles({
  conditions: {
    light: {},
    dark: { selector: '.dark &' },
  },
  defaultCondition: 'light',
  properties: {
    color: vars.color,
    background: vars.color,
    borderTopColor: vars.color,
    borderBottomColor: vars.color,
  },
})

export const atoms = createAtomsFn(responsiveStyles, colorModeStyles, staticStyles)

export type Atoms = Parameters<typeof atoms>[0]
