//Search Tree
/*
 Instructions to candidate.
  1) Run this code in the REPL to observe its behaviour. The
   execution entry point is main().
  2) Implement the "put" and "contains" methods.
  3) Fix the "inOrderTraversal" method.
  4) Add additional relevant tests
  5) If time permits, try to improve your implementation.
*/
dln;

let _ = require("underscore");

class Node {}

function put(node, value) {
    // TODO implement me
}

function contains(node, value) {
    // TODO implement me
}

function inOrderTraversal(node) {
    return inOrderTraversalAcc(node, []);
}

function inOrderTraversalAcc(node, acc) {
    if (!node.value) {
        return acc;
    }

    inOrderTraversalAcc(node.left, acc);
    acc.push(node.value);
    inOrderTraversalAcc(node.right, acc);
    return acc;
}

function assert(condition) {
    if (!condition) throw new Error();
}

function testTree() {
    let tree = new Node();
    put(tree, 3);
    put(tree, 1);
    put(tree, 2);
    put(tree, 5);
    assert(!contains(tree, 0));
    assert(contains(tree, 1));
    assert(contains(tree, 2));
    assert(contains(tree, 3));
    assert(!contains(tree, 4));
    assert(contains(tree, 5));
    assert(!contains(tree, 6));
    assert(_.isEqual(inOrderTraversal(tree), [1, 2, 3, 5]));
}

function doTestsPass() {
    testTree();
    // TODO add more tests
}

/**
 * Main execution entry.
 */
doTestsPass();
console.log("Success!");

let _ = require("underscore");

class Node {}

function put(node, value) {
    if (!value) {
        return;
    }

    if (!node.value) {
        node.value = value;
        node.left = new Node();
        node.right = new Node();
    } else {
        if (value < node.value) {
            put(node.left, value);
        } else {
            put(node.right, value);
        }
    }
}

function contains(node, value) {
    if (!node || !value) {
        return false;
    } else if (node.value === value) {
        return true;
    } else if (node.value && value < node.value) {
        return contains(node.left, value);
    } else {
        return contains(node.right, value);
    }
}

function inOrderTraversal(node) {
    return inOrderTraversalAcc(node, []);
}

function inOrderTraversalAcc(node, acc) {
    if (!node.value) {
        return acc;
    }

    inOrderTraversalAcc(node.left, acc);
    acc.push(node.value);
    inOrderTraversalAcc(node.right, acc);
    return acc;
}

function assert(condition) {
    if (!condition) {
        throw new Error();
    }
}

function testTree() {
    let tree = new Node();
    put(tree, 3);
    put(tree, 1);
    put(tree, 2);
    put(tree, 5);
    assert(!contains(tree, 0));
    assert(contains(tree, 1));
    assert(contains(tree, 2));
    assert(contains(tree, 3));
    assert(!contains(tree, 4));
    assert(contains(tree, 5));
    assert(!contains(tree, 6));
    assert(_.isEqual(inOrderTraversal(tree), [1, 2, 3, 5]));
}

function testEmptyTree() {
    let emptyTree = new Node();
    assert(_.isEqual(inOrderTraversal(emptyTree), []));
}

function testNegative() {
    let negativeTree = new Node();
    put(negativeTree, -1);
    put(negativeTree, 11);
    put(negativeTree, -10);
    put(negativeTree, 50);
    assert(contains(negativeTree, -10));
    assert(contains(negativeTree, -1));
    assert(contains(negativeTree, 11));
    assert(contains(negativeTree, 50));
    assert(_.isEqual(inOrderTraversal(negativeTree), [-10, -1, 11, 50]));
}

function testDupes() {
    let dupeTree = new Node();
    put(dupeTree, 1);
    put(dupeTree, 2);
    put(dupeTree, 1);
    put(dupeTree, 2);
    assert(contains(dupeTree, 1));
    assert(contains(dupeTree, 2));
    assert(_.isEqual(inOrderTraversal(dupeTree), [1, 1, 2, 2]));
}

function testUndefined() {
    let undefinedTree = new Node();
    put(undefinedTree, undefined);
    assert(!contains(undefinedTree, undefined));
    assert(_.isEqual(inOrderTraversal(undefinedTree), []));
}

function testNull() {
    let nullTree = new Node();
    put(nullTree, null);
    assert(!contains(nullTree, null));
    assert(_.isEqual(inOrderTraversal(nullTree), []));
}

function doTestsPass() {
    testTree();
    testEmptyTree();
    testNegative();
    testDupes();
    testUndefined();
    testNull();
}

/**
 * Main execution entry.
 */
doTestsPass();
console.log("Success!");
//Second Smallest
/**
 * Returns the second smallest element in the array x.
 * Returns 0 if the array has fewer than 2 elements.
 */
function secondSmallest(x) {
    // todo: implement this function
    return 0;
}

/**
 * Returns true if all tests pass; otherwise, returns false.
 */
function doTestsPass() {
    // todo: add more test cases
    let testArrays = [[0], [0, 1]];
    let testResults = [0, 1];

    // Run through the tests and make assertions
    for (let i = 0; i < testArrays.length; i++) {
        if (secondSmallest(testArrays[i]) != testResults[i]) {
            return false;
        }
    }
    return true;
}

/**
 * Main execution entry.
 */
if (doTestsPass()) {
    console.log("All tests pass!");
} else {
    console.log("There are test failures.");
}

function secondSmallest(x) {
    // First check if the array is large enough
    if (x.length < 2) {
        return 0;
    }

    // Start these at infinity so that they're always bigger
    // than the input
    let smallest = Number.POSITIVE_INFINITY;
    let secondSmallest = Number.POSITIVE_INFINITY;
    let current;

    // Loop through the input and keep updating our
    // smallest and second smallest
    for (let i = 0; i < x.length; i++) {
        current = x[i];
        if (current < smallest) {
            secondSmallest = smallest;
            smallest = current;
        } else if (current < secondSmallest) {
            secondSmallest = current;
        }
    }
    return secondSmallest;
}
dln;
/**
 * Returns true if all tests pass; otherwise, returns false.
 */
function doTestsPass() {
    // todo: add more test cases
    let testArrays = [[], [0], [0, 1], [-1, 0, 1, -2, 2], [1, 1, 2]];
    let testResults = [0, 0, 1, -1, 1];

    // Run through the tests and make assertions
    for (let i = 0; i < testArrays.length; i++) {
        if (secondSmallest(testArrays[i]) != testResults[i]) {
            return false;
        }
    }
    return true;
}

/**
 * Main execution entry.
 */
if (doTestsPass()) {
    console.log("All tests pass!");
} else {
    console.log("There are test failures.");
}
