import React from "react"
import { ThemeProvider } from "emotion-theming"
import { Global } from "@emotion/core"

import { theme } from "./theme"

export function Layout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <Global
        styles={{
          html: {
            boxSizing: `border-box`,
          },
          "*, *:before, *:after": {
            boxSizing: `inherit`,
            margin: 0,
          },
        }}
      />
      <div>{children}</div>
    </ThemeProvider>
  )
}
