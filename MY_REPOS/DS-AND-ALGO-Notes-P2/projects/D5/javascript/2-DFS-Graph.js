/*
  Problem 2: Depth First Search on a Graph
Given the adjacency list below,
which friends would Joe visit if he were,
trying to get to Jesse using Depth-First Traversal?
NOTE: your function should return a list of friends visited, not including Joe himself.
*/
const adjacencyList = {
    derek: ["selam", "dean"],
    joe: ["selam"],
    selam: ["derek", "joe", "dean", "evan"],
    dean: ["derek", "evan", "selam"],
    sam: ["jen"],
    evan: ["selam", "jesse", "dean"],
    jen: ["sam", "javier"],
    javier: ["jen"],
    chris: [],
    jesse: ["evan"],
};

//start vertex is "joe"
// starts at  the root (selecting some arbitrary node as the root in the case of a graph)
//and explores as far as possible  along each branch before backtracking.
function depthFirstTraversalIterative(startingVertex, endVertex, adjList) {
    let visited = new Set();
    let stack = [startingVertex]; //friends of curNode
    while (stack.length) {
        let curNode = stack.pop(); //cur node we are transversing

        if (visited.has(curNode)) continue;

        if (curNode === endVertex) {
            visited.add(curNode);
            break;
        }
        visited.add(curNode);
        stack.push(...adjList[curNode]);
    }
    if (visited.has(endVertex)) {
        visited.delete(startingVertex);
        return visited;
    } else {
        return null;
    }
}

console.log(
    'depthFirstTraversalIterative("joe", "jessie", adjacencyList): ',
    depthFirstTraversalIterative("joe", "jesse", adjacencyList)
);
//depthFirstTraversalIterative("joe", "jessie", adjacencyList):  Set { 'selam', 'evan', 'dean', 'derek', 'jesse' }
