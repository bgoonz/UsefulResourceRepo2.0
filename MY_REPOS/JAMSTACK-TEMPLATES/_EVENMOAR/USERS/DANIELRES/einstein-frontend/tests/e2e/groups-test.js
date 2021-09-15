var login = require("./support/login-helper.js");

var random_group_name = "Group " + Math.random();
var random_group_description = "Description " + Math.random();
var random_discussion_title = "Title " + Math.random();
var random_discussion_entry_body = "Body " + Math.random();

module.exports = {
  before: login,

  "Adding a group": function (browser) {
    browser
      .url("http://127.0.0.1:8080/#/groups")
      .click("[data-ref=adding-a-group-button]")
      .sendKeys("[data-ref=adding-a-group-input-name]", random_group_name)
      .sendKeys(
        "[data-ref=adding-a-group-input-description]",
        random_group_description
      )
      .click("button[type=submit]");
  },

  "Viewing groups: viewing the added group in groups list": function (browser) {
    browser
      .useXpath()
      .waitForElementPresent("//*[text()='" + random_group_name + "']", 1000)
      .useCss();

    browser.expect
      .element("[data-ref=groups-list]")
      .text.to.contain(random_group_name);

    browser.expect
      .element("[data-ref=groups-list]")
      .text.to.contain(random_group_description);
  },

  "Selecting first group in groups list": function (browser) {
    browser.click("[data-ref=groups-list] a:first-child");
  },

  "Adding a discussion to the selected group": function (browser) {
    browser
      .click("[data-ref=adding-a-discussion-button]")
      .sendKeys(
        "[data-ref=adding-a-discussion-input-title]",
        random_discussion_title
      )
      .click("button[type=submit]");
  },

  "Viewing group discussions: viewing the added discussion in the group discussions list":
    function (browser) {
      browser
        .useXpath()
        .waitForElementPresent(
          "//*[text()='" + random_discussion_title + "']",
          1000
        )
        .useCss()
        .expect.element("[data-ref=discussions-list]")
        .text.to.contain(random_discussion_title);
    },

  "Selecting the discussion in the discussions list": function (browser) {
    browser.click("xpath", "//*[text()='" + random_discussion_title + "']");
  },

  "Adding a discussion entry to the selected discussion": function (browser) {
    browser
      .sendKeys(
        "[data-ref=adding-a-discussion-entry-input-body]",
        random_discussion_entry_body
      )
      .click("button[type=submit]");
  },

  "Viewing group discussion entries: viewing the added discussion entry":
    function (browser) {
      browser
        .useXpath()
        .waitForElementPresent(
          "//*[text()='" + random_discussion_entry_body + "']",
          1000
        )
        .useCss()
        .expect.element("[data-ref=discussions-entries-list]")
        .text.to.contain(random_discussion_entry_body);
      browser.end();
    },
};
