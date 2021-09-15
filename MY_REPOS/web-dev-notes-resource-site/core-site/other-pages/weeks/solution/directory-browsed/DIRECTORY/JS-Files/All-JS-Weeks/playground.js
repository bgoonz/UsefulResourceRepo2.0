class _Vertex {
    constructor(value) {
        this.value = value;
        this.neighbors = new Array();
    }
}
class Graph {
    constructor() {
        this.graff = new Object();
    }
    addVertex(value) {
        this.graff[value] = new _Vertex(value);
    }
    addEdge(value1, value2) {
        // if they do not exist in graff, we have to add them.
        if (!this.graff[value1]) this.addVertex(value1);
        if (!this.graff[value2]) this.addVertex(value2);
        // just create vars for each vertex
        const value1Vertex = this.graff[value1];
        const value2Vertex = this.graff[value2];
        // make sure the neighbor connection is accomplished
        value2Vertex.neighbors.push(value1Vertex);
        value1Vertex.neighbors.push(value2Vertex);
    }
    getVertices() {
        return Object.keys(this.graff);
    }
    getEdges() {
        const li = new Array();
        for (let srcValue in this.graff) {
            const vertex = this.graff[srcValue];
            // push the connection between two vertices into the list
            vertex.neighbors.forEach((neiVertex) =>
                li.push([srcValue, neiVertex.value])
            );
        }
        return li;
    }
    adjList() {
        const adjList = new Object();
        for (let srcValue in this.graff) {
            // sets up var and grabs vertex
            const vertex = this.graff[srcValue];
            // sets up the "neighbors" array
            adjList[srcValue] = new Array();
            // we want push each neighboring vertex in the "neighbors" array
            vertex.neighbors.forEach((neighbor) =>
                adjList[srcValue].push(neighbor.value)
            );
        }
        return adjList;
    }
    breadthFirstTraversal(startValue) {
        const adjList = this.adjList();
        const queue = [startValue]; // queue = ["b", "c", "d"]
        const resLi = new Array(); // ["a"]
        const visited = new Set();
        // we want use queue to pop off and continually add neighbors to iterate
        while (queue.length > 0) {
            // shift off current value in "front of line"
            const value = queue.shift(); // "b"
            if (visited.has(value)) continue;
            resLi.push(value);
            visited.add(value);
            // use spread operator to spread "neighbor" values into the queue
            queue.push(...adjList[value]); // "b", "c", "d"
        }
        return resLi;
    }
    depthFirstTraversal(value, visited = new Set(), resLi = new Array()) {
        // THIS PSEUDO CODE WILL GRAB EVERY VERTEX
        // const vertices = getVertices();
        // vertices.forEach.....
        //   vertex.neighbors.forEach......
        // THIS CODE HAS A STARTING POINT
        if (visited.has(value)) return;
        const adjList = this.adjList();
        // add to "visited" set to not have to visit nodes that have already been visited
        visited.add(value);
        resLi.push(value);
        // iterating through all neighbors of that current or starting "value"
        adjList[value].forEach((neighbor) =>
            this.depthFirstTraversal(neighbor, visited, resLi)
        );
        return resLi;
    }
}
// unweighted, undirected
const unweightedUndirectedAdjList = {
    a: ["b", "c", "d"],
    b: ["a", "c", "e"],
    c: ["a", "b", "f", "g"],
    d: ["a", "g"],
    e: ["b"],
    f: ["c", "g"],
    g: ["c", "f", "g"],
    h: [],
};
const weightedAdjList = {
    a: { b: 6, d: 1 },
    b: { a: 6, d: 2, e: 2, c: 5 },
    c: { b: 5, e: 5 },
    d: { a: 1, b: 2, e: 1 },
    e: { d: 1, b: 2, c: 5 },
};
// a ======> b
// adjList = {
//   a: [b],
//   b: [],
// }
const graph = new Graph();
graph.addEdge("a", "b");
graph.addEdge("c", "g");
graph.addEdge("f", "g");
graph.addEdge("a", "c");
graph.addEdge("a", "d");
graph.addEdge("c", "f");
graph.addEdge("d", "g");
graph.addEdge("b", "c");
graph.addEdge("b", "e");
graph.addVertex("h");
// console.log(graph.graff);
// console.log(graph.getVertices());
// console.log(graph.getEdges());
// console.log(graph.adjList());
console.log("BFS", graph.breadthFirstTraversal("a"));
console.log("DFS", graph.depthFirstTraversal("a"));
