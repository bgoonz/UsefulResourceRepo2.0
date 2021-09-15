const { expect } = require("chai");
const { saveCategories } = require("../save-categories");
describe("The saveCategories function", () => {
  it("adds the new category to the list", () => {
    const categories = [1, 2];
    const result = saveCategories(categories, 10);
    expect(result).to.contain(10);
  });

  it("sorts the list", () => {
    const categories = ["Cat 3", "Cat 2"];
    const result = saveCategories(categories, "Cat 1");
    expect(result).to.eql(["Cat 1", "Cat 2", "Cat 3"]);
  });

  it("makes sure the result and the original are different", () => {
    const categories = ["Cat 3", "Cat 2"];
    const result = saveCategories(categories, "Cat 1");
    expect(result).to.not.equal(categories);
  });
});
