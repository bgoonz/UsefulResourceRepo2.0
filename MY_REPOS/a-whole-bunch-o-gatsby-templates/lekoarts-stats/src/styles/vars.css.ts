import { createGlobalTheme } from '@vanilla-extract/css'
import { modularScale } from 'polished'

const createScale = (ratio: number, base: number) => (steps: number) => `${modularScale(steps, base, ratio)}px`

const spaceScale = createScale(1.4, 4)

const color = {
  primary: '#3643a3',
  white: 'white',
  black: 'black',
  'gray-50': '#ffffff',
  'gray-100': '#e0e5eb',
  'gray-200': '#b9c1ca',
  'gray-300': '#99a1b0',
  'gray-400': '#7d8796',
  'gray-500': '#60687c',
  'gray-600': '#454c60',
  'gray-700': '#35384d',
  'gray-800': '#25293e',
  'gray-900': '#191b2c',
  'blue-50': '#9f9f9f',
  'blue-100': '#cfeaff',
  'blue-200': '#9cc6ff',
  'blue-300': '#70a0f5',
  'blue-400': '#6182ed',
  'blue-500': '#4c5eca',
  'blue-600': '#3643a3',
  'blue-700': '#29357f',
  'blue-800': '#1d275a',
  'blue-900': '#121d3b',
}

export const breakpoints = {
  tablet: '900px',
  desktop: '1024px',
}

export const vars = createGlobalTheme(':root', {
  color,
  fontFamily: {
    body: "'IBM Plex Mono', monospace",
  },
  fontSize: {
    sm: '14px',
    md: '16px',
    lg: '18px',
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  shadow: {
    default: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  },
  radii: {
    sm: '2px',
    md: '5px',
  },
  space: {
    none: '0',
    '0x': spaceScale(0),
    '1x': spaceScale(1),
    '2x': spaceScale(2),
    '3x': spaceScale(3),
    '4x': spaceScale(4),
    '5x': spaceScale(5),
    '6x': spaceScale(6),
    '7x': spaceScale(7),
    '8x': spaceScale(8),
    point: '0.1rem',
  },
  chartHeight: {
    sm: '400',
    md: '500',
  },
})
