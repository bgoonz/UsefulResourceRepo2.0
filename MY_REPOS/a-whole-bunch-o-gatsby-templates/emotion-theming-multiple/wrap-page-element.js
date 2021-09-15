import * as React from "react"
import { ThemeProvider } from "emotion-theming"

const themeVariants = {
  default: {
    header: {
      lightLogo: true,
      colour: "#000",
    },
  },
  homepage: {
    header: {
      lightLogo: true,
      colour: "#905AA5",
    },
  },
  business: {
    header: {
      lightLogo: false,
      colour: "#54C0A2",
    },
  },
}

const wrapPageElement = ({ element, props }) => {
  const name = props.pageContext.slug ? props.pageContext.slug : "default"
  return <ThemeProvider theme={themeVariants[name]}>{element}</ThemeProvider>
}

export { wrapPageElement }
