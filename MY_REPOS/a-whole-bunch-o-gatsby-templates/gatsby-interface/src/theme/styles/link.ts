import colors from "../colors"

export type LinkVariant = `DEFAULT` | `SIMPLE`

const baseStyles = {
  alignItems: `center`,
  color: colors.purple[60],
  display: `inline-flex`,
}
const styles = {
  SIMPLE: {
    textDecoration: `none`,
    ":focus, :hover": {
      color: colors.purple[40],
      textDecoration: `underline`,
    },
  },
  DEFAULT: {
    textDecoration: `underline`,
    ":focus, :hover": {
      color: colors.purple[60],
      textDecoration: `underline`,
    },
  },
}

export function getLinkStyles(variant: LinkVariant = `DEFAULT`) {
  return {
    ...baseStyles,
    ...styles[variant],
  }
}
