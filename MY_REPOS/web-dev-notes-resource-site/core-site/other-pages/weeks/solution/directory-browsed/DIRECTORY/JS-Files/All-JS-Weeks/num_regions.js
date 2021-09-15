//         let graph = {
//             'a': ['b'],                       b - a
//             'b': ['a'],
//             'c': ['d'],                       c   e
//             'd': ['e', 'c'],                   \ /
//             'e': ['d'],                         d
//         };\

function numRegions(graph) {
    let visited = new Set(); // Set empty Object to store
    let count = 0;
    for (let node in graph){
        if(helperFunction(node, graph, visited)) count++;
    }
    return count;
}

function helperFunction(node, graph, visited) {    // a, graph, {}  // b, graph, {a} // a, graph, {a, b}
    // if set has node already in store return false
    if (visited.has(node)) return false;

    // everything below is if node is not in set

    visited.add(node); // add node  //visited = [a]  // visited = [a, b]
    // object[key].map(take each element and do this function)
    //graph[a] = [false]
    graph[node].map(x => helperFunction(x, graph, visited)); // b => helperfunction // a => helperfunction
    return true;
}

/*
for (let node in graph) {
    while (visited.has(node) === false) {
        visited.add(node);
        visited.add(...graph[node]);
    }
    regions++;
}

return regions;
*/






// describe('numRegions(graph)', () => {
//     // it should accept an adjacency list representing a graph

//     it('should return the number of connected components that make up the full graph', () => {
//         let graph1 = {
//             'a': ['b'],                       b - a
//             'b': ['a'],
//             'c': ['d'],                       c   e
//             'd': ['e', 'c'],                   \ /
//             'e': ['d'],                         d
//         };
//         expect(numRegions(graph1)).to.equal(2);

//         let graph2 = {
//             'x': [],         x
//             'y': [],              y
//             'z': []      z
//         };
//         expect(numRegions(graph2)).to.equal(3);
//     });

//     context('when the graph has a cycle', () => {
//         it('should not get trapped in an infinite loop', () => {
//             let graph1 = {
//                 'a': ['b'],           a - b
//                 'b': ['a'],
//             };
//             expect(numRegions(graph1)).to.equal(1);

//             let graph2 = {
//                 'q': ['r'],              r - q
//                 'r': ['q'],
//                 's': ['t'],                       s - t - v
//                 't': ['s', 'u', 'v'],                 | /
//                 'u': ['t', 'v'],                      u
//                 'v': ['u', 't'],
//                 'w': []                     w
//             };
//             expect(numRegions(graph2)).to.equal(3);
//         });
//     });
// });

module.exports = {
    numRegions
};
