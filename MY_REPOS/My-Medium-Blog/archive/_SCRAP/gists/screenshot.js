var webdriver = require("selenium-webdriver");
var fs = require("fs");

var driver = new webdriver.Builder().build();

webdriver.WebDriver.prototype.saveScreenshot = function (filename) {
  return driver.takeScreenshot().then(function (data) {
    fs.writeFile(
      filename,
      data.replace(/^data:image\/png;base64,/, ""),
      "base64",
      function (err) {
        if (err) throw err;
      }
    );
  });
};

// example usage
driver.saveScreenshot("mypage.png");
