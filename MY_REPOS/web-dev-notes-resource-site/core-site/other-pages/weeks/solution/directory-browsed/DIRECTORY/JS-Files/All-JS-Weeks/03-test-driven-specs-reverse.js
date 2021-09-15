/********Week 6 Practice Test - Problem 3 - Unit Tests ***************/
//  Complete the unit test code so that `myReverse` function will pass all the 
//  mocha tests.  Remove the expect.fail in each test and replace it with your
//  code.  

const myReverse = arr => {
  if (arr.length === 0) {
    throw new TypeError("This function only accepts non-empty arrays");
  }
  let newArray = [];
  arr.forEach(el => newArray.unshift(el));
  return newArray;
};

//----------------- DO NOT EDIT CODE ABOVE THIS LINE -------------------------

const chai = require("chai");
const expect = chai.expect;

describe("myReverse()", function() {
  context("with a valid argument", () => {
    it("should return the array reversed", function() {
    // Remember to remove the expect.fail line below and replace it with your
    // tests.  A good test would check the output for both an array of numbers
    // and an array of letters.   Use the Arrange, Act, and Assert steps if that
    // helps you to organize your tests.
      // Arrange
      const input1 = [1,2,3];
      const input2 = ['a', 'b', 'c'];
      const expected1 = [3,2,1];
      const expected2 = ['c', 'b', 'a'];

      // Act
      const result1 = myReverse(input1);
      const result2 = myReverse(input2);

      // Assert
      expect(result1).to.eql(expected1);
      expect(result2).to.eql(expected2);

    });

    it("should not mutate the passed in array", function() {
    // Remember to remove the expect.fail line below and replace it with your
    // tests.  
      // Arrange
      const input = [1,2,3];
      // const expected = [3,2,1];
      // const inputNotPassedIn = input.slice();

      // Act
      // myReverse(input);
      const output = myReverse(input);

      // Assert
      // expect(input).to.eql(inputNotPassedIn);
      expect(input).to.eql([1,2,3]);
      // expect(input).to.deep.equal([1,2,3]);
      // expect(input).to.not.equal(output);

    });
  });

  context("with an invalid argument", () => {
    it("should throw a TypeError when given an empty array", function() {
    // Remember to remove the expect.fail line below and replace it with your
    // tests.  
    // Solution 1:
      // Arrange
      const input = []
      const error = TypeError
      // Act
      const func = () => myReverse(input)
      // Assert
      expect(func).to.throw(error);

    // Solution 2:
      // expect(() => myReverse([])).to.throw(TypeError);

    });
  });
});
