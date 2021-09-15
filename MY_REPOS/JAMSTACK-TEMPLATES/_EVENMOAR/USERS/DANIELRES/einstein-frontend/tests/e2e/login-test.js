var login = require("./support/login-helper.js");

module.exports = {
  before: login,

  Login: function (browser) {
    browser.assert.containsText(".container", "Dashboard").end();
  },
};
