/**
 * In this file, you will implement the friendsOf function that will calculate
 * the group of friends that a person has a certain distance from them.
 *
 * @param {Object} adjacencyList - The adjacency list that describes the graph,
 * never null or undefined
 * @param {string} name - The name of the person from where you will start your
 * search, never null or undefined
 * @param {number} distance - The distance away that you will traverse to find
 * the person's friends-of list, always a value greater than or equal to 1
 *
 * You will also need to implement a friendsOfRecursion function that will
 * recurse through your friends graph. friendsOf will call this.
 *
 * @param {string} name - the name of the person from where you will start
 * your search, never null or undefined.
 * @param {Object} adjacencyList - The adjacency list that describes the graph,
 * never null or undefined
 * @param {Set} visited - A list of all the graph nodes we have visited
 * @param {number} maxDistance - the maximum distance you want to recurse into
 * the graph, for example 1 should find immediate friends and 3 should find
 * immediate friends, friends of immediate friends, and friends of those friends
 * @param {number} currentDistance - the current distance we are at during our
 * recursion
 *
 * Hint: You can convert a Set into an Array using the `Array.from()` method.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
 *
 * Hint: refer to the documentation of Set on MDN here:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
 */

function friendsOfRecursion(name, adjacencyList, visited, maxDistance, currentDistance) {
  // iterate until max distance is reached
  if (currentDistance >= maxDistance) return;
  // add name to our visted set
  visited.add(name);
  // loop through the friend list @ adjacent list keyed into the name
  for (let friend of adjacencyList[name]) {
    // increment count to reach max distance for base case
    friendsOfRecursion(friend, adjacencyList, visited, maxDistance,currentDistance + 1);
  }
}

function friendsOf(adjacencyList, name, distance) {
  // keying in the name in adjacent list
  // if name is not or adjacency list is empty>> return undefined
  if (name in adjacencyList) {
    //init new set to store friends of var name
    let visited = new Set();
    // looping through friends of name var and passing to recusive helper func
    for (let currentFriend of adjacencyList[name]) {
      friendsOfRecursion(currentFriend, adjacencyList, visited, distance, 0);
    }
    // delete var name from friend list
    visited.delete(name);
    // return the friend list as an array derived from the visited set object
    return Array.from(visited);
  }
}

/******************************************************************************
* Do not change code beneath this line.
*/
try {
exports.friendsOf = friendsOf;
} catch (e) {
exports.friendsOf = () => { throw new Error('Cannot export friendsOf.') };
}
