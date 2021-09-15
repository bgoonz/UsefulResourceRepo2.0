import { createMuiTheme } from "material-ui/styles";

const colors = require("./colors");

const theme = createMuiTheme({
  main: {
    background: colors.bg,
    green: colors.green,
    blue: colors.blue
  },
  footer: {
    colors: {
      text: "#777777",
      link: "#999999",
      linkHover: "#777777"
    }
  },

  mediaQueryTresholds: {
    M: 1024
  }
});

export default theme;
