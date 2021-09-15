var login = function (browser) {
  browser
    .url("http://127.0.0.1:8080/#/")
    .click("input[type=submit]")
    .waitForElementVisible(".navbar", 1000);
};

module.exports = login;
