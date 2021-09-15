const assert = require("assert");
const chai = require("chai");
const expect = chai.expect;

const smoothieMachine = require("../problems/23-smoothie-machine.js");
describe("smoothieMachine()", function () {
  it("should return an object with an 'ingredients' property set as an array of smoothieMachine's passed in arguments", function () {
    let smoothie1 = smoothieMachine();
    let smoothie2 = smoothieMachine("apples", "bananas", "berries");

    expect(smoothie1.ingredients).to.eql([]);
    expect(smoothie2.ingredients).to.eql(["apples", "bananas", "berries"]);
  });

  it("should have an `addIngredients` method that accepts multiple params to add to the ingredients property", function () {
    let smoothie1 = smoothieMachine();
    let smoothie2 = smoothieMachine("apples", "bananas", "berries");

    let test1 = smoothie1.addIngredients("milk");
    let result1 = "I'm having a smoothie with milk";
    let test2 = smoothie1.addIngredients("kale", "spinach");
    let result2 = "I'm having a smoothie with milk and kale and spinach";
    let test3 = smoothie1.addIngredients("honey", "pears", "berries");
    let result3 =
      "I'm having a smoothie with milk and kale and spinach and honey and pears and berries";
    let test4 = smoothie2.addIngredients("pineapple");
    let result4 =
      "I'm having a smoothie with apples and bananas and berries and pineapple";

    assert.equal(test1, result1);
    assert.equal(test2, result2);
    assert.equal(test3, result3);
    expect(smoothie1.ingredients).to.eql([
      "milk",
      "kale",
      "spinach",
      "honey",
      "pears",
      "berries",
    ]);
    assert.equal(test4, result4);

    expect(smoothie2.ingredients).to.eql([
      "apples",
      "bananas",
      "berries",
      "pineapple",
    ]);
  });
});
