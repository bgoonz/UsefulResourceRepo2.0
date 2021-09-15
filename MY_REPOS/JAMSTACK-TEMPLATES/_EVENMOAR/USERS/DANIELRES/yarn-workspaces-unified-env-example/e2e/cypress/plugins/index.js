const injectEnv = require("./injectEnv");

// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

module.exports = (on, config) => {
  return injectEnv(config, [
    "AUTH0_AUDIENCE",
    "AUTH0_CLIENT_SECRET",
    "AUTH0_DOMAIN",
    "AUTH0_ISSUER",
    "AUTH0_PASSWORD",
    "AUTH0_USERNAME",
    "UI_DEV_SERVER_PORT",
    "UI_AUTH0_CLIENT_ID"
  ]);
};
