const { expect } = require('chai');
const { saveItems } = require('../save-items');
describe("The saveItems function", () => {
  it('adds the new item to the list', () => {
    const items = [
      {title: 'Title1', category: 'Cat 1'},
      {title: 'Title2', category: 'Cat 2'},
    ];
    const newItem = {title: 'Title3', category: 'Cat 3'};
    const result = saveItems(items, newItem);
    expect(result).to.contain(newItem);
  });

  it('makes sure the result and the original are different', () => {
    const items = [
      {title: 'Title1', category: 'Cat 1'},
      {title: 'Title2', category: 'Cat 2'},
    ];
    const newItem = {title: 'Title3', category: 'Cat 3'};
    const result = saveItems(items, newItem);
    expect(items === result).to.be.false;
  });
});
