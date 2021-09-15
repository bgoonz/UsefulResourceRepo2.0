/*
Problem 1: Breadth First Search on a Graph
given the adjacency list below, how many friends would Joe visit if he were
trying to get to Jesse using Breadth-First Traversal?
NOTE: your function should return the number of friends visited, not including Joe himself
const adjacencyList = {
  'derek':['selam', 'dean'],
  'joe':['selam'],
  'selam': ['derek', 'joe', 'dean', 'evan'],
  'dean': ['derek', 'evan', 'selam'],
  'sam': ['jen'],
  'evan': ['selam', 'jesse', 'dean'],
  'jen':['sam', 'javier'],
  'javier':['jen'],
  'chris':[],
  'jesse': ['evan'],
};
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
//will be spreading the arrays... or pushing each element
// will visit each neighbour of the current node
//
//steps:
// write function for breadth first traversal of graph
// Use bfs to acess the nodes in an expanding manner
//pass in start,end,adjList
// set array to act as a queue
// create a set to contain the uniqueue values we have already acessed
// initialize whie loop to iterate until there are still nodes to search ..... manually later on....or we have acessed the target node
//in while loop we shift (dequeue) first element out of the queue
//!1.)  check if shifted value is already in set (if it is we would continue (restart while loop))
//!2.) ...... (if the shifted value === target value) ----> if it is ... add shifted value to set and break the loop (with break)
// if both conditions are false ... then we add the shifted value to the set
// then push the (spread out value of the adjacencey list) that correspond with the key that is the value we just shifted
//-----------END of Queue While loop-------------------------
// if our set contains target value (end) ...-----then---> return set.size-1
//if not return null or console.log("not found")
//!breadthFirst ==> Queue
//!DeapthFirst  ==> Stack
function functionbfsNumFriends(start, end, ajdList) {
    const curNeighboursQue = [start];
    const visited = new Set();
    while (curNeighboursQue.length) {
        // while loop is about itterating until a condition is met....
        let curNode = curNeighboursQue.shift(); //dequeue
        if (visited.has(curNode)) continue;
        if (curNode === end) {
            visited.add(curNode);
            break;
        }
        visited.add(curNode);
        curNeighboursQue.push(...ajdList[curNode]);
    }
    if (visited.has(end)) {
        console.log(visited);
        return visited.size - 1;
    } else {
        console.log("not found");
        return null;
    }
}

console.log(
    'functionbfsNumFriends("joe", "jesse", adjacencyList): ',
    functionbfsNumFriends("joe", "jesse", adjacencyList)
);

/*
   ~ javascript : (master) node 1-BSF-Graph.js 
Set { 'joe', 'selam', 'derek', 'dean', 'evan', 'jesse' }
functionbfsNumFriends("joe", "jesse", adjacencyList):  5
 ~ javascript : (master) 
*/

//-------------------------------------------------------------------------------------------
/*
!Wrong Solution
function bft(start, end, adjList) {
    const curNodeNeighbours = [start]; //queue
    const visited = new Set();
    let count = -1;
    while (curNodeNeighbours.length) {
        const curNode = curNodeNeighbours.shift();
        if (visited.has(curNode)) continue;
        if (adjList[curNode].includes(end)) return count;
        visited.add(curNode);
        curNodeNeighbours.push(...adjList[curNode]);
        count++;
    }
}
console.log(
    'bft("joe", "jesse", adjacencyList): ',
    bft("joe", "jesse", adjacencyList)
);
*/
