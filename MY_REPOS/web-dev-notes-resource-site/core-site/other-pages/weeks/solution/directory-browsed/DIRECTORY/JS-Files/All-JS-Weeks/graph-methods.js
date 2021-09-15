/* Graph Node Class and Graph Class */
class GraphNode {
    constructor(val) {
        this.val = val;
        this.neighbors = [];
    }
}
class Graph {
    constructor() {
      this.adjacentList = new Object();
    }
/* ---------------------------------------------------------------------------------*/

/* How to add a vertext to a graph */
/* Version 1 */

addNode(node) {
    if(!this.adjacentList[node]) this.adjacenList[node] = [];
  }

/* Version 2 */
addVertex(node) {
    if(this.adjacentList[node]) {
      return;
    } else {
    this.adjacenList[node] = [];
    }
  }

/* ---------------------------------------------------------------------------------*/

/* How to add edges or connect nodes on a graph */
/* Version 1, also adds the nodes if they do not exist yet */
addEdges(startNode, destinationNode) {
    if (!this.adjacentList[startNode]) this.addVertex(startNode);
    if (!this.adjacentList[destinationNode]) this.addVertex(destinationNode);

    this.adjacentList[startNode].push(destinationNode);
    this.adjacentList[destinationNode].push(startNode);
  }
/* Version 2 only add edges(connects the nodes) */
addEdges(startNode, destinationNode) {
    this.adjList[startNode].push(destinationNode);
    this.adjList[destinationNode].push(startNode);
}

/* ---------------------------------------------------------------------------------*/

/* How to build the total graph with the given add vertex and edges methods */
buildGraph(edges) {
    for (let i = 0; i < edges.length; i++) {
      let edge = edges[i];
      this.addEdges(edge[0], edge[1]);
    }
    return this.adjList;
  }
/* ---------------------------------------------------------------------------------*/

/* Breadth First Search on a graph to find a target value by checking all the nodes */
/* Breadth First Search always uses a queue */
breadthFirstSearch(startingNode, targetVal) {

    let queue = [startingNode];
    let seenNodes = new Set();
    let currentNode;
    while(queue.length) {
        currentNode = queue.shift();

        if(!seenNodes.has(currentNode)) {
            seenNodes.add(currentNode)

            if(currentNode.val === targetVal) {
                return currentNode;
            }
                queue.push(...currentNode.neighbors)
        }
    }
    return null;
}
/* ---------------------------------------------------------------------------------*/

/* Breadth First Traversal always uses a queue */
breadthFirstTraversal(startingVertex) {
    let queue = [startingVertex];
    let visited = new Set();

    let curr;
    while (queue.length) {
      curr = queue.shift();
      if (!visited.has(curr)) {
        visited.add(curr);
        queue.push(...this.adjList[curr]);
      }
    }
    return Array.from(visited);
  }
/* ---------------------------------------------------------------------------------*/

/* Depth first always uses a stack */
/* Version 1 */
depthFirstTraversalIterative(startingVertex) {
    let stack = [startingVertex];
    let visited = new Set();
    let curr;

    while (stack.length) {
      curr = stack.pop();

      if (!visited.has(curr)) {
        visited.add(curr);
        stack.push(...this.adjList[curr]);
      }
    }
    return Array.from(visited);
  }
  /* Version 2 */
  depthFirstTraversalIterative(startingVertex) {
    let stack = [startingVertex];
    let visited = new Set();
    let curr;

    while (stack.length) {
      curr = stack.pop();

      visited.add(curr);
      this.adjList[curr].forEach(neighbor => {
        if(!visited.has(neighbor)) {
          stack.push(neighbor);
       }
      });
    }
    return Array.from(visited);
  }
/* ---------------------------------------------------------------------------------*/

/* Depth First Recursive */
depthFirstTraversalRecursive(startingVertex, visited = new Set()) {

    if(visited.has(startingVertex)) return;
    visited.add(startingVertex);

    this.adjacentList[startingVertex].forEach((neighbor)=> {
      this.depthFirstTraversalRecursive(neighbor, visited);
    })
    return Array.from(visited);
  }

/* ---------------------------------------------------------------------------------*/

/* How to find the max value from a graph */
maxValue(node, visited = new Set()) {
    let max = -Infinity;
    let queue = [node];
    let currentNode;

    while(queue.length) {
        currentNode = queue.shift();

        if(!visited.has(currentNode)) {
            visited.add(currentNode);
            if(currentNode.val > max) {
                max = currentNode.val;
            }
            queue.push(...currentNode.neighbors);
        }
    }
    return max;
}
/* ---------------------------------------------------------------------------------*/

/* How to find the number of regions in a graph */
numRegions(graph) {
    let regions = 0;
    let seen = new Set();
    for(let key in graph) {
        if(!seen.has(key)) regions++;
        seen.add(key);
        graph[key].forEach(neighbor => seen.add(neighbor))
    }
    return regions;
}
/* ---------------------------------------------------------------------------------*/

/* Friends of problem, finding regions a certain distance away from target */
friendsOfRecursion(target, adjacencyList, visited, maxDistance, currentDistance) {
  if (currentDistance >= maxDistance) return;

  visited.add(target);

  for (let nextFriend of adjacencyList[target]) {
    friendsOfRecursion(nextFriend, adjacencyList, visited, maxDistance, currentDistance + 1);
  }

}

friendsOf(adjacencyList, target, distance) {
  if (target in adjacencyList) {
    let visited = new Set();

    for (let name of adjacencyList[target]) {
      friendsOfRecursion(name, adjacencyList, visited, distance, 0);
    }

    visited.delete(target);
    return Array.from(visited);
  }

  }
}
/* ---------------------------------------------------------------------------------*/
