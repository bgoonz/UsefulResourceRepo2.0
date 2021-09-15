// This plugin returns a new Cypress config object
// with the addition of these these env vars:

module.exports = (config, envVars) => ({
  ...config,
  env: envVars.reduce((acc, val) => ({ ...acc, [val]: process.env[val] }), {})
});
