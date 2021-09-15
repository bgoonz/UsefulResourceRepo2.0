class GraphNode {
    constructor(val) {
        this.val = val;
        this.neighbors = [];
    }
}
let a = new GraphNode("a");
let b = new GraphNode("b");
let c = new GraphNode("c");
let d = new GraphNode("d");
let e = new GraphNode("e");
let f = new GraphNode("f");
a.neighbors = [e, c, b];
c.neighbors = [b, d];
e.neighbors = [a];
f.neighbors = [e];
console.log(
    "a:-----> ",
    a,
    "\n",
    "a.val----->",
    a.val,
    "\n",
    "a.neighbours----->",
    a.neighbors,
    "\n"
);
console.log(
    "---------------------------⇑a⇑-----------------------------------------------"
);
console.log(
    "b:-----> ",
    b,
    "\n",
    "b.val----->",
    b.val,
    "\n",
    "b.neighbours----->",
    b.neighbors,
    "\n"
);
console.log(
    "----------------------------⇑b⇑------------------------------------------------"
);
console.log(
    "c:-----> ",
    c,
    "\n",
    "c.val----->",
    c.val,
    "\n",
    "c.neighbours----->",
    c.neighbors,
    "\n"
);
console.log(
    "----------------------------⇑c⇑------------------------------------------------"
);
console.log(
    "d:-----> ",
    d,
    "\n",
    "d.val----->",
    d.val,
    "\n",
    "d.neighbours----->",
    d.neighbors,
    "\n"
);
console.log(
    "----------------------------⇑d⇑------------------------------------------------"
);
console.log(
    "e:-----> ",
    e,
    "\n",
    "e.val----->",
    e.val,
    "\n",
    "e.neighbours----->",
    e.neighbors,
    "\n"
);
console.log(
    "-----------------------------⇑e⇑------------------------------------------------"
);
/*


╗ ~ graphs : (master) node graph.js
a:----->  GraphNode {
  val: 'a',
  neighbors:
   [ GraphNode { val: 'e', neighbors: [Array] },
     GraphNode { val: 'c', neighbors: [Array] },
     GraphNode { val: 'b', neighbors: [] } ] }
 a.val-----> a
 a.neighbours-----> [ GraphNode { val: 'e', neighbors: [ [GraphNode] ] },
  GraphNode { val: 'c', neighbors: [ [GraphNode], [GraphNode] ] },
  GraphNode { val: 'b', neighbors: [] } ]

---------------------------⇑a⇑-----------------------------------------------
b:----->  GraphNode { val: 'b', neighbors: [] }
 b.val-----> b
 b.neighbours-----> []

----------------------------⇑b⇑------------------------------------------------
c:----->  GraphNode {
  val: 'c',
  neighbors:
   [ GraphNode { val: 'b', neighbors: [] },
     GraphNode { val: 'd', neighbors: [] } ] }
 c.val-----> c
 c.neighbours-----> [ GraphNode { val: 'b', neighbors: [] },
  GraphNode { val: 'd', neighbors: [] } ]

----------------------------⇑c⇑------------------------------------------------
d:----->  GraphNode { val: 'd', neighbors: [] }
 d.val-----> d
 d.neighbours-----> []

----------------------------⇑d⇑------------------------------------------------
e:----->  GraphNode {
  val: 'e',
  neighbors: [ GraphNode { val: 'a', neighbors: [Array] } ] }
 e.val-----> e
 e.neighbours-----> [ GraphNode {
    val: 'a',
    neighbors: [ [GraphNode], [GraphNode], [GraphNode] ] } ]

-----------------------------⇑e⇑------------------------------------------------
*/
