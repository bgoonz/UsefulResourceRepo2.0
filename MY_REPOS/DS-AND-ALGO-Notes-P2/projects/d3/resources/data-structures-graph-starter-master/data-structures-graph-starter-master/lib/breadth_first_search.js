const { GraphNode } = require("./graph_node");

function breadthFirstSearch(startingNode, targetVal, visited = new Set()) {
    let queue = [startingNode]; // [a]

    while (queue.length) {
        // queue.length === 1   // === 2
        let node = queue.shift(); // node = a, queue []   // node = b, queue = [c]
        if (visited.has(node)) continue; //if in the Set skip
        visited.add(node); // add this to the set (not to be revisited)

        if (node.val === targetVal) return node; // return this one if it's the target
        queue.push(...node.neighbors); // [b, c]
    }
    return null;
}

//   [ GraphNode { val: 'a', neighbors: [ [GraphNode], [GraphNode] ] } ] === [a]
//                                                                            ^
//                                                                            |
let a = new GraphNode("a"); // ----------------------------------------------
let b = new GraphNode("b");
let c = new GraphNode("c");
let d = new GraphNode("d");
a.neighbors = [b, c];
b.neighbors = [d, c];
breadthFirstSearch(b, "b");

module.exports = {
    breadthFirstSearch,
};
