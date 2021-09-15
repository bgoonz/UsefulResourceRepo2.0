class GraphNode {
    constructor(val) {
        this.val = val;
        this.neighbors = [];
    }
}

let a = new GraphNode("a");
console.log('let a = new GraphNode("a"): ', a);
let b = new GraphNode("b");
let c = new GraphNode("c");
console.log('let c = new GraphNode("c"): ', c);
let d = new GraphNode("d");
let e = new GraphNode("e");
console.log('let e = new GraphNode("e"): ', e);
let f = new GraphNode("f");
console.log(
    "--------------------------------------------------------------------"
);
console.log("a.neighbors = [e, c, b]: ", (a.neighbors = [e, c, b]));

console.log("c.neighbors = [b, d]: ", (c.neighbors = [b, d]));

console.log("e.neighbors = [a]: ", (e.neighbors = [a]));

console.log("f.neighbors = [e]: ", (f.neighbors = [e]));
/*
let a = new GraphNode("a"):  GraphNode { val: 'a', neighbors: [] }
let c = new GraphNode("c"):  GraphNode { val: 'c', neighbors: [] }        
let e = new GraphNode("e"):  GraphNode { val: 'e', neighbors: [] }        
--------------------------------------------------------------------      
a.neighbors = [e, c, b]:  [ GraphNode { val: 'e', neighbors: [] },        
  GraphNode { val: 'c', neighbors: [] },
  GraphNode { val: 'b', neighbors: [] } ]
c.neighbors = [b, d]:  [ GraphNode { val: 'b', neighbors: [] },
  GraphNode { val: 'd', neighbors: [] } ]
e.neighbors = [a]:  [ GraphNode {
    val: 'a',
    neighbors: [ [GraphNode], [GraphNode], [GraphNode] ] } ]
f.neighbors = [e]:  [ GraphNode { val: 'e', neighbors: [ [GraphNode] ] } ]
*/
function depthFirstRecur(node, visited = new Set()) {
    if (visited.has(node.val)) return;

    console.log(node.val); //output
    visited.add(node.val);

    node.neighbors.forEach((neighbor) => {
        depthFirstRecur(neighbor, visited);
    });
}

depthFirstRecur(f); //! starting with f as it is a node that can reach all other nodes
/*
f
e
a
c
b
d
*/
//we pass in f
console.log(
    "---------------------------⬆️ Recur ⬆️-----------------------------------------"
);
/*
      The Set constructor lets you create Set objects that store unique values of any type, whether primitive values or object references.
    new Set([iterable])
Parameters
iterable Optional
If an iterable object is passed, all of its elements will be added to the new Set.

If you don't specify this parameter, or its value is null, the new Set is empty.

Return value
A new Set object.
Instance properties
Set.prototype.size
Returns the number of values in the Set object.
Instance methods
Set.prototype.add(value)
Appends value to the Set object. Returns the Set object.
Set.prototype.clear()
Removes all elements from the Set object.
Set.prototype.delete(value)
Removes the element associated to the value and returns a boolean asserting whether an element was successfully removed or not. Set.prototype.has(value) will return false afterwards.
Set.prototype.has(value)
Returns a boolean asserting whether an element is present with the given value in the Set object or not.
Iteration methods
Set.prototype[@@iterator]()
Returns a new Iterator object that yields the values for each element in the Set object in insertion order.
Set.prototype.keys()
Returns a new Iterator object that yields the values for each element in the Set object in insertion order. (For Sets, this is the same as the values() method.)
Set.prototype.values()
Returns a new Iterator object that yields the values for each element in the Set object in insertion order. (For Sets, this is the same as the keys() method.)
Set.prototype.entries()
Returns a new Iterator object that contains an array of [value, value] for each element in the Set object, in insertion order.

This is similar to the Map object, so that each entry's key is the same as its value for a Set.

Set.prototype.forEach(callbackFn[, thisArg])
Calls callbackFn once for each value present in the Set object, in insertion order. If a thisArg parameter is provided, it will be used as the this value for each invocation of callbackFn.
      */
function depthFirstIter(node) {
    let visited = new Set(); // a set doesn't have duplicates (only unique) and it is immutable... can have as many values
    let stack = [node];

    while (stack.length) {
        let node = stack.pop();

        if (visited.has(node.val)) continue; //checking if already in set

        console.log(node.val);
        visited.add(node.val);

        stack.push(...node.neighbors);
    }
}

depthFirstIter(f);
console.log(
    "---------------------------⬆️ Iter ⬆️-----------------------------------------"
);
/*
   ~ past-soln : (master) node scratch.js 
let a = new GraphNode("a"):  GraphNode { val: 'a', neighbors: [] }
let c = new GraphNode("c"):  GraphNode { val: 'c', neighbors: [] }
let e = new GraphNode("e"):  GraphNode { val: 'e', neighbors: [] }
--------------------------------------------------------------------
a.neighbors = [e, c, b]:  [ GraphNode { val: 'e', neighbors: [] },
  GraphNode { val: 'c', neighbors: [] },
  GraphNode { val: 'b', neighbors: [] } ]
c.neighbors = [b, d]:  [ GraphNode { val: 'b', neighbors: [] },
  GraphNode { val: 'd', neighbors: [] } ]
e.neighbors = [a]:  [ GraphNode {
    val: 'a',
    neighbors: [ [GraphNode], [GraphNode], [GraphNode] ] } ]
f.neighbors = [e]:  [ GraphNode { val: 'e', neighbors: [ [GraphNode] ] } ]
f
e
a
c
b
d
---------------------------⬆️ Recur ⬆️-----------------------------------------
f
e
a
b
c
d
---------------------------⬆️ Iter ⬆️-----------------------------------------
*/

let graph = {
    a: ["b", "c", "e"],
    b: [],
    c: ["b", "d"],
    d: [],
    e: ["a"],
    f: ["e"],
};

function depthFirstRecur(node, graph, visited = new Set()) {
    if (visited.has(node)) return;

    console.log(node);
    visited.add(node);

    graph[node].forEach((neighbor) => {
        depthFirstRecur(neighbor, graph, visited);
    });
}

depthFirstRecur("f", graph);
