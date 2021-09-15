/*
  Problem 2: Depth First Search on a Graph
  
Given the adjacency list below,

which friends would Joe visit if he were,


trying to get to Jesse using Depth-First Traversal?

NOTE: your function should return a list of friends visited, not including Joe himself.

const adjacencyList = {
  'derek':['selam', 'dean'],
  'joe':['selam'],
  'selam': ['derek', 'joe', 'dean', 'evan'],
  'dean': ['derek', 'evan', 'selam'],
  'sam': ['jen'],
  'evan': ['selam', 'jesse', 'dean'],
  'jen':['sam', 'javier'],
  'javier':['jen'],
  'chris':[],
  'jesse': ['evan'],
};
*/
//start vertex is "joe"
// starts at  the root (selecting some arbitrary node as the root in the case of a graph)
//and explores as far as possible  along each branch before backtracking.
function depthFirstTraversalIterative(startingVertex) {
    let visited = new Set();
    let stack = [startingVertex];
    let results = [];

    while (stack.length) {
        let currentNode = stack.pop();
        console.log(
            "currentNode:----------------------1-----------------------> ",
            currentNode
        );

        if (visited.has(currentNode)) continue;
        console.log(
            "visited: ---------------------2---------------------->",
            visited
        );

        results.push(currentNode);
        console.log(
            "results: -------------------------3----------------------------->",
            results
        );
        visited.add(currentNode);

        stack.push(...this.adjList[currentNode]);
    }
    return visited;
}

console.log(
    'depthFirstTraversalIterative("joe"): ',
    depthFirstTraversalIterative("joe")
);
