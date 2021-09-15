var webdriver = require("selenium-webdriver");
var fs = require("fs");

var driver = new webdriver.Builder()
  .withCapabilities(webdriver.Capabilities.phantomjs())
  .build();

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

webdriver.By.sizzle = function (selector) {
  driver
    .executeScript("return typeof Sizzle==='undefined'")
    .then(function (noSizzle) {
      if (noSizzle)
        driver.executeScript(
          fs.readFileSync("sizzle.min.js", { encoding: "utf8" })
        );
    });
  return new webdriver.By.js(
    "return Sizzle('" + selector.replace(/"/g, '\\"') + "')[0]"
  );
};

driver.get("http://google.com/");
driver.findElement({ sizzle: "input[name=q]" }).sendKeys("cheese\n");
driver.saveScreenshot("cheese.png");
driver.quit();
