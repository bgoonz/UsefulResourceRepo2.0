const { expect } = require('chai');
const { bubbleSort, swap } = require('../lib/bubble_sort.js');

describe('bubbleSort()', () => {
  it('should sort the elements of the array in increasing order, in-place', () => {
    let array = [2, -1, 4, 3, 7, 3];
    bubbleSort(array);
    expect(array).to.eql([-1, 2, 3, 3, 4, 7]);
  });
});
