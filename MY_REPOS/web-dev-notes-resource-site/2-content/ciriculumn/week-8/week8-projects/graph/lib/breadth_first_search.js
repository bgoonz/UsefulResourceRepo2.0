function breadthFirstSearch(startingNode, targetVal) {
    let visited = new Set();
    let nodesToVisitArray = [startingNode];
  
    while (nodesToVisitArray.length > 0) {
      let node = nodesToVisitArray.shift();
      // if node has been visited>>skip
      if (visited.has(node.val)) continue;
      // add that visted node to our set
      visited.add(node.val);
  
      // logic for should return the GraphNode that has the targetVal
      if (targetVal === node.val) return node;
      // add neighbors to be explored by our BFS algo
      nodesToVisitArray.push(...node.neighbors);
    }
    return null;
  }
module.exports = {
    breadthFirstSearch
};