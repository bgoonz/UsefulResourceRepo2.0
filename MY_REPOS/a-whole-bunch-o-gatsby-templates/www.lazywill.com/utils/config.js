const colors = require("../src/styles/colors");

module.exports = {
  pathPrefix: "/",
  appName: "Lazywill",
  siteTitle: "Lazywill - a vocabulary training app for language learners",
  siteUrl: "https://www.lazywill.com",
  siteLanguage: "en",
  siteLogo: "/logos/logo-1024.png",
  siteImage: "/logos/logo-1024.png",
  siteDescription:
    "An early version of a foreign vocabulary training web app for declared visual learners.",
  // manifest.json
  manifestName: "Lazywill - vocabulary training",
  manifestShortName: "Lazywill",
  manifestStartUrl: "/",
  manifestBackgroundColor: colors.bg,
  manifestThemeColor: colors.bg,
  manifestDisplay: "standalone",
  // analytics
  analyticsTrackingId: "UA-82862651-1"
};
