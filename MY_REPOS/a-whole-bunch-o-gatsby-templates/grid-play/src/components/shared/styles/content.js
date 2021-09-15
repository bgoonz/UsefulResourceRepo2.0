const showHelper = false

export const positionerCss = theme => {
  return {
    border: showHelper && `5px solid red`,
    marginLeft: `auto`,
    marginRight: `auto`,
    // the maxWidth value is not accidental it hast ot be equall to defined part of grid from  Example 4 - hanging images
    // 12 * 4.5rem  = 54rem (combined width of columns)
    // 13 * 1.25rem = 16.25rem (combined width of gaps)
    // 54 + 16.25 = 70.25rem
    maxWidth: `70.25rem`,
    paddingLeft: theme.space[8],
    paddingRight: theme.space[8],
    position: `relative`,
    width: `100%`,
  }
}

export const stackCss = ({ theme, gap = 10 }) => ({
  border: showHelper && `5px solid blue`,
  display: `grid`,
  gap: theme.space[gap],
})

export const wrapperCss = ({ theme, asBox = false }) => ({
  border: showHelper && `5px solid orange`,
  background: theme.colors.grey,
  paddingTop: theme.space[8],
  paddingBottom: theme.space[8],
})

export const spacerCss = ({ theme, size = 0 }) => {
  return {
    height: theme.space[size],
  }
}
