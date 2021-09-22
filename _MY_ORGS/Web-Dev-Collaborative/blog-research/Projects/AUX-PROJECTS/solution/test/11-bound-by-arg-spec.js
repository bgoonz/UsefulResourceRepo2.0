const assert = require("assert");

const boundByAnArg = require("../problems/11-bound-by-arg.js");

describe("boundByAnArg()", function () {
  it("should return a function that when invoked will use the argument that was passed in to boundByAnArg", function () {
    function iSpy(thing) {
      return "I spy a " + thing;
    }

    let spyTree = boundByAnArg(iSpy, "tree");
    let spyCar = boundByAnArg(iSpy, "car");

    assert.equal(iSpy("potato"), "I spy a potato");
    assert.equal(spyTree(), "I spy a tree");
    assert.equal(spyTree("potato"), "I spy a tree");
    assert.equal(spyTree(), "I spy a tree");
    assert.equal(spyCar(), "I spy a car");
    assert.equal(spyCar("potato"), "I spy a car");
  });
});
