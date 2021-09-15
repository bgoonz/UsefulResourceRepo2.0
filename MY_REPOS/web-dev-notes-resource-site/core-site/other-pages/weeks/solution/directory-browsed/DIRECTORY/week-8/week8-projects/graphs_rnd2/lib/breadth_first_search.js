function breadthFirstSearch(startingNode, targetVal) {
  // creating an object of unique vals
  let visited = new Set();
  // we will shift this to visit next nodes
  let nodesToVisitArray = [startingNode];

  // iterate while their is node to visit
  while (nodesToVisitArray.length > 0) {
    let node = nodesToVisitArray.shift();
    if (visited.has(node.val)) continue;

    visited.add(node.val);

    if (targetVal === node.val) return node;
    // add neighbors to be explored by our BFS algo
    nodesToVisitArray.push(...node.neighbors);
  }

  return null;
}

module.exports = {
  breadthFirstSearch,
};
