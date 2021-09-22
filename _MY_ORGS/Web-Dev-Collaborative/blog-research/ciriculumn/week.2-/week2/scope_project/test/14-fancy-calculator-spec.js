const assert = require("assert");

const fancyCalculator = require("../problems/14-fancy-calculator.js");

describe("fancyCalculator", function () {
  // set our total to 5
  fancyCalculator.setTotal(5);

  it("square the total", function () {
    assert.equal(fancyCalculator.squared(), 25);
  });
  it("should modulo the total by the arg number", function () {
    assert.equal(fancyCalculator.modulo(4), 1);
  });
});
