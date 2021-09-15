class Graph {
    constructor() {
        this.adjList = {};
    }
    addVertex(vertex) {
        if (!this.adjList[vertex]) this.adjList[vertex] = [];
    }
    addEdges(srcValue, destValue) {
        this.addVertex(srcValue);
        this.addVertex(destValue);
        this.adjList[srcValue].push(destValue);
        this.adjList[destValue].push(srcValue);
    }
    buildGraph(edges) {
        edges.forEach((ele) => {
            this.addEdges(ele[0], ele[1]);
        });
        return this.adjList;
    }
    breadthFirstTraversal(startingVertex) {
        const queue = [startingVertex];
        const visited = new Set();
        const result = new Array();
        while (queue.length) {
            const value = queue.shift();
            if (visited.has(value)) continue;
            result.push(value);
            visited.add(value);
            queue.push(...this.adjList[value]);
        }
        return result;
    }
    depthFirstTraversalIterative(startingVertex) {
        const stack = [startingVertex];
        const visited = new Set();
        const result = new Array();
        while (stack.length) {
            const value = stack.pop();
            if (visited.has(value)) continue;
            result.push(value);
            visited.add(value);
            stack.push(...this.adjList[value]);
        }
        return result;
    }
    depthFirstTraversalRecursive(
        startingVertex,
        visited = new Set(),
        vertices = []
    ) {
        if (visited.has(startingVertex)) return [];
        vertices.push(startingVertex);
        visited.add(startingVertex);
        this.adjList[startingVertex].forEach((vertex) => {
            this.depthFirstTraversalRecursive(vertex, visited, vertices);
        });
        return [...vertices];
    }
}
