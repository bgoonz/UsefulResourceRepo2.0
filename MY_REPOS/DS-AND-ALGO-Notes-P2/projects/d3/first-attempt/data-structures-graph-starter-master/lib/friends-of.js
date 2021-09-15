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

// 1. Identify what do we want this function to accomplish
// Finds the total list of friends a specified distance away from a person
// Traverse a graph and return node values

// 2. Identify parameters
// 1. The adjacency list
// 2. The name of the person whose friends you need to return
// 3. The distance away from the person

// 3. Identify return values
// An array of all friends a specified distance away from a person

// 4. Discuss possible methods of attacking the problem.
// Options: DFS, BFS, post-order, pre-order, in-order
// DFS for graphs

// 5. If further clarification is needed, consider psuedo-code
// Utilize iteration and recursion
// Iterate through each key
// Invoke recursive helper function on each key
// Recursive helper function will recrusively called on all children of a node
// Keep track of distance
function friendsOfRecursion(
    target,
    adjacencyList,
    visited,
    maxDistance,
    currentDistance
) {
    if (currentDistance >= maxDistance) return;

    visited.add(target);

    for (let nextFriend of adjacencyList[target]) {
        friendsOfRecursion(
            nextFriend,
            adjacencyList,
            visited,
            maxDistance,
            currentDistance + 1
        );
    }
}

function friendsOf(adjacencyList, target, distance) {
    if (target in adjacencyList) {
        let visited = new Set();

        for (let name of adjacencyList[target]) {
            friendsOfRecursion(name, adjacencyList, visited, distance, 0);
        }

        visited.delete(target);
        return Array.from(visited);
    }
}
/******************************************************************************
 * Do not change code beneath this line.
 */
try {
    exports.friendsOf = friendsOf;
} catch (e) {
    exports.friendsOf = () => {
        throw new Error("Cannot export friendsOf.");
    };
}
