
const { expect } = require('chai');
const adjacencyList = require('./small-graph');
const expectedResults = require('./small-results');
const largeAdjacencyList = require('./large-graph');
const largeExpectedResults = require('./large-results');
const assert = require('assert')

let areTheyConnected = () => {
  throw new Error('Could not load areTheyConnected');
};

try {
  ({ areTheyConnected } = require('../01-are-they-connected'));
} catch (e) {}

function randomNamesIndex() {
  return Math.floor(Math.random() * names.length);
}

describe('areTheyConnected()', () => {


  context('completes a valid breadth-first search on a small graph', () => {

    for (let i = 0 ; i < expectedResults.length ; i++) {
      let expectedResult = expectedResults[i];
      let startName = expectedResult.startName;
      let endName = expectedResult.endName;
      let expectedVisitation = expectedResult.visited;


      it(`from ${startName} to ${endName}`, () => {


        const result = areTheyConnected(adjacencyList, startName, endName);
        let outOfPlace = []
        for (let i = 0 ; i < expectedVisitation.length ; i++) {

          if (result.has(expectedVisitation[i])) continue;

          outOfPlace = expectedVisitation[i];
          break;
        }

        expect(result instanceof Set, true, 'Should return a set containing visited names.');
        expect(result.size).to.equal(expectedVisitation.length, `Traversal from ${startName} to ${endName} should visit ${result.size} names`);
        expect(outOfPlace.length).to.equal(0, `Traversal from ${startName} to ${endName} should visit ${outOfPlace}`);

      });

    }


  });

  context('returns null for unreachable paths on a small graph', () => {
    it(`returns null from ophelia to ursula`, () => {

      const result = areTheyConnected(adjacencyList, "ophelia", "ursula");

      expect(result).to.equal(null, `Traversal from ophelia to ursula should return null`);

    });
  });



  context('completes a valid breadth-first search on a large graph', () => {

    for (let i = 0 ; i < largeExpectedResults.length ; i++) {
      let expectedResult = largeExpectedResults[i];
      let startName = expectedResult.startName;
      let endName = expectedResult.endName;
      let expectedVisitation = expectedResult.visited;


      it(`from ${startName} to ${endName}`, () => {


        const result = areTheyConnected(largeAdjacencyList, startName, endName);
        let outOfPlace = []
        for (let i = 0 ; i < expectedVisitation.length ; i++) {

          if (result.has(expectedVisitation[i])) continue;

          outOfPlace = expectedVisitation[i];
          break;
        }

        expect(result instanceof Set, true, 'Should return a set containing visited names.');
        expect(result.size).to.equal(expectedVisitation.length, `Traversal from ${startName} to ${endName} should visit ${result.size} names`);
        expect(outOfPlace.length).to.equal(0, `Traversal from ${startName} to ${endName} should visit ${outOfPlace}`);

      });

    }
  });

  context('returns null for unreachable paths on a large graph', () => {
    const unconnected = [{'startName': 'Phuong', 'endName': 'Joanna'},
                         {'startName': 'Bart', 'endName': 'Napoleon'},
                         {'startName': 'Carolyn', 'endName': 'Fumiko'}];


    for (let i = 0 ; i < unconnected.length ; i++) {
      let expectedResult = unconnected[i];
      let startName = expectedResult.startName;
      let endName = expectedResult.endName;

      it(`from ${startName} to ${endName}`, () => {

        const result = areTheyConnected(largeAdjacencyList, startName, endName);

        expect(result).to.equal(null, `Traversal from ${startName} to ${endName} should return null`);

      });
    }

  });

});
