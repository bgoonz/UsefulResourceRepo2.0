import baseTheme from "@lekoarts/gatsby-theme-emma/src/gatsby-plugin-theme-ui"

export default {
  ...baseTheme,
  colors: {
    ...baseTheme.colors,
    primary: `green`
  },
  fonts: {
    ...baseTheme.fonts,
    body: `Georgia, "Times New Roman"`
  }
}