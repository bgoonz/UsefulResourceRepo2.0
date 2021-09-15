const space = [
  `0rem`,
  `0.125rem`,
  `0.25rem`,
  `0.5rem`,
  `0.75rem`,
  `1rem`,
  `1.25rem`,
  `1.5rem`,
  `2rem`,
  `2.5rem`,
  `3rem`,
  `3.5rem`,
  `4rem`,
  `4.5rem`,
  `5.25rem`,
  `6rem`,
]

const breakpoints = {
  tablet: 750,
  desktop: 1050,
}

const mediaQueries = Object.entries(breakpoints).reduce(
  (memo, [key, value]) => {
    return {
      ...memo,
      [key]: `@media (min-width: ${value}px)`,
    }
  },
  {}
)

const colors = {
  darkGrey: `#888`,
  grey: `#aaa`,
  lightGrey: `#ccc`,
  superLightGrey: `#eee`,
}

export const theme = {
  colors,
  breakpoints,
  mediaQueries,
  space,
}
