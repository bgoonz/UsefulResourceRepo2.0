import theme from "./theme";

const globals = {
  "@global": {
    html: {
      boxSizing: "border-box",
      "-webkit-text-size-adjust": "100%",
      "-moz-text-size-adjust": "none",
      "-ms-text-size-adjust": "100%",
      fontFamily: `"-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "sans-serif"`,
      background: "#D0E0D8"
    },
    "html.wf-active": {
      fontFamily: "Open Sans"
    },
    "*, *:before, *:after": {
      boxSizing: "inherit"
    },
    body: {},
    a: {
      borderBottom: "1px solid #990000",
      color: "#990000",
      fontWeight: "bold",
      textShadow: `2px 2px ${theme.main.background},
        -2px 2px ${theme.main.background},
        -2px -2px ${theme.main.background},
        -2px 2px ${theme.main.background},
        -2px 0 ${theme.main.background},
        2px 0 ${theme.main.background}`,
      display: "inline-block",
      lineHeight: "1.1",
      textDecoration: "none",
      transition: "0.3s",
      "&:hover": {
        color: "#60000",
        borderColor: "#660000"
      }
    },
    "@media (min-device-width: 1024px)": {
      "*::-webkit-scrollbar": {
        width: "6px"
      },
      "*::-webkit-scrollbar-track": {
        background: theme.palette.background.third
      },
      "*::-webkit-scrollbar-thumb": {
        backgroundColor: theme.palette.background.first
      }
    }
  }
};

export default globals;
