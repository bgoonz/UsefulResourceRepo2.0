class Graph {
  constructor() {
    this.adjList = {};
  }

  addVertex(vertex) {
    if (!this.adjList[vertex]) {
      this.adjList[vertex] = [];
    }
  }

  addEdges(srcValue, destValue) {
    this.addVertex(srcValue);
    this.addVertex(destValue);
    this.adjList[srcValue].push(destValue);
    this.adjList[destValue].push(srcValue);
  }

  buildGraph(edges) {
    edges.forEach((edge) => {
      const srcValue = edge[0];
      const destValue = edge[1];
      this.addEdges(srcValue, destValue);
    });
    return this.adjList;
  }

  breadthFirstTraversal(startingVertex) {
    // Kevin Bacon

    let foundNodes = [startingVertex];
    let i = 0;

    while (i < foundNodes.length) {
      const thisNode = foundNodes[i];
      i = i + 1;
      let neighbors = this.adjList[thisNode];
      neighbors = neighbors.filter((neighbor) => {
        return !foundNodes.includes(neighbor);
      });
      foundNodes = [...foundNodes, ...neighbors];
    }

    return foundNodes;
  }

  depthFirstTraversalIterative(startingVertex) {
    const visited = new Set();
    const vertices = [];
    const stack = [startingVertex];

    while (stack.length) {
      let currentVertex = stack.pop();
      if (visited.has(currentVertex)) continue;
      visited.add(currentVertex);
      vertices.push(currentVertex);

      stack.push(...this.adjList[currentVertex]);
    }

    return vertices;
  }

  depthFirstTraversalRecursive(
    startingVertex,
    visited = new Set(),
    vertices = []
  ) {
    if (visited.has(startingVertex)) return;
    visited.add(startingVertex);
    vertices.push(startingVertex);
    for (let neighbor of this.adjList[startingVertex]) {
      this.depthFirstTraversalRecursive(neighbor, visited, vertices);
    }
    return vertices;
  }
}

module.exports = {
  Graph,
};
