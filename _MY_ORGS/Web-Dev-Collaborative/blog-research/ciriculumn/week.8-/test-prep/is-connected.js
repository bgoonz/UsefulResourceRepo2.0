
//Before starting to code answer these questions:
// how is the graph represented? graph node or adjaceny list
    // Graph Node - node.val and node.neighbors
    // Adjaceny List - key into graph
//what is the expected output/return?
    // boolean, array, set



//if given a graph represented using an adjaceny list
function isConnectedBFSAdjacenyList(source, destination, graph) {
    let queue = [ source ]; //init queue with starting node
    let visited = new Set(); 

    while (queue.length) {
        let current = queue.shift()

        //check if you have visited this node before
        if (visited.has(current)) continue;
        visited.add(current);

        //processing step, if my current node is the destination
        // return true if i'm asked to return a boolean
        if (current === destination) return true;

        //populate queue with current nodes neighbors so I can visit them
        //key into graph because it's an adjacency list representation
        queue.push(...graph[current])
    }

    //source and destination are not connected so return false
    return false;
}

//if given a graph represented using a Graph Node
function isConnectedBFSGraphNode(source, destination) {
    let queue = [source];
    let visited = new Set();

    while (queue.length) {
        let current = queue.shift()

        if (visited.has(current)) continue;
        visited.add(current);

        //need to do a current.val because graph is represented as graph nodes
        if (current.val === destination) return true;

        //graph node representation so we can do a ".neighbors" to grab neighbors
        queue.push(...current.neighbors)
    }

    return false;
}


//identical to BFS replace(queue with a stack i.e pop() instead of shift())
function isConnectedDFSIterative(source, destination, graph) {
    let stack = [ source ];
    let visited = new Set();

    while (stack.length){
        let current = stack.pop();

        if (visited.has(current)) continue;
        visited.add(current);

        if (current === destination) return true;

        stack.push(...graph[current])
    }

    return false;
}


function isConnectedDFSRecursive(source, destination, graph, visited = new Set()) {
   //base case
    if (visited.has(source)) return 
    visited.add(source)

    if (source === destination) return true; 
    
    //iterative step
    for(let neighbor of graph[source]){
        if(isConnectedDFSRecursive(neighbor, destination, graph, visited)){
            return true;
        }
    }

    return false;

}

const graph1 = {
    a: ['b', 'c', 'd'],
    b: ['a', 'c', 'e'],
    c: ['a', 'b', 'f', 'g'],
    d: ['a', 'g'],
    g: ['d', 'c', 'f'],
    e: ['b'],
    f: ['c', 'g'],
    h: []
}

//            a 
//          / |  \
//        /   |   d
//      /     |     \
//      b --- c ---- g
//      |      \   /
//      |       \ /
//      e        f 
//          h
//               

// console.log(isConnectedBFSAdjacenyList('a', 'h', graph1))
// console.log(isConnectedBFSGraphNode('a', 'h', graph1))
// console.log(isConnectedDFSIterative('a', 'h', graph1))
// console.log(isConnectedDFSRecursive('a', 'h', graph1))


