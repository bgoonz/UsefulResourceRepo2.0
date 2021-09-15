// prefer default export if available
const preferDefault = (m) => (m && m.default) || m;

exports.components = {
  "component---cache-caches-gatsby-plugin-offline-app-shell-js": () =>
    import(
      "./../../caches/gatsby-plugin-offline/app-shell.js" /* webpackChunkName: "component---cache-caches-gatsby-plugin-offline-app-shell-js" */
    ),
  "component---src-lekoarts-gatsby-theme-cara-templates-cara-tsx": () =>
    import(
      "./../../../src/@lekoarts/gatsby-theme-cara/templates/cara.tsx" /* webpackChunkName: "component---src-lekoarts-gatsby-theme-cara-templates-cara-tsx" */
    ),
};
