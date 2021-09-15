const assert = require("assert");

const calculator = require("../problems/06-calculator.js");

describe("calculator", function () {
  it("should add numbers", function () {
    assert.equal(calculator.add(50), 50);
  });
  it("should subtract numbers", function () {
    assert.equal(calculator.subtract(35), 15);
  });
  it("should multiply numbers", function () {
    assert.equal(calculator.multiply(10), 150);
  });
  it("should divide numbers", function () {
    assert.equal(calculator.divide(5), 30);
  });
});
