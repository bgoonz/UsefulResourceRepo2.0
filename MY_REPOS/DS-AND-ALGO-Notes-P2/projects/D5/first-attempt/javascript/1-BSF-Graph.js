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
