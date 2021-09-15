const { expect } = require('chai');
const { searchItems } = require('../search-items');
describe("The searchItems function", () => {
  it('Returns an empty array when it is given an empty array', () => {
    const items = [];
    const term = "shop";
    const result = searchItems(items, term);
    expect(result).to.have.length(0);
  });

  it('Returns all of the items when an empty search term is given', () => {
    const items = [
      {title: 'It is 1', category: 'Category 1'},
      {title: 'THIS IS 2', category: 'Category 2'},
      {title: 'I am 1', category: 'Category 3'},
    ];
    const term = "";
    const result = searchItems(items, term);
    expect(result).to.have.length(items.length);
  });

  it('Returns items whose title contains the term, case insensitive', () => {
    const items = [
      {title: 'It is 1', category: 'Category 1'},
      {title: 'THIS IS 2', category: 'Category 2'},
      {title: 'I am 1', category: 'Category 3'},
    ];
    const term = "Is";
    const result = searchItems(items, term);
    expect(result).to.have.length(2);
  });
});
