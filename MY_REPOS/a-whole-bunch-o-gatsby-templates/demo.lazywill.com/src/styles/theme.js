import { createMuiTheme } from "material-ui/styles";

var primary = {
  50: "#f3f9e7",
  100: "#e0f0c2",
  200: "#cce699",
  300: "#b8db70",
  400: "#a8d452",
  500: "#99cc33",
  600: "#91c72e",
  700: "#86c027",
  800: "#7cb920",
  900: "#6bad14",
  A100: "#f0ffe0",
  A200: "#d8ffad",
  A400: "#c0ff7a",
  A700: "#b4ff60",
  contrastDefaultColor: "light"
};

const theme = createMuiTheme({
  palette: {
    primary: primary,
    type: "dark",
    background: {
      green: "#709425",
      blue: "#2D949F",
      first: "#383a30",
      second: "#3e4035",
      third: "#4d4f44",
      fourth: "#545649"
    }
  },
  typography: {
    fontFamily: `"Helvetica", "Arial", sans-serif`
  }
});

export default theme;
