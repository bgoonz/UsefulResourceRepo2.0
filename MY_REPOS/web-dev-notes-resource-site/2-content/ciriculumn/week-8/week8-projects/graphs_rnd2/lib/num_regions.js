function numRegions(graph) {
    let visited = new Set();
    // regions count
    let regions = 0;
    // iterate through nodes in the graph
    for (let node in graph) {
      if (visited.has(node)) continue;
      // skip iteration if set has node otherwise call upon the function and increase the count a
      depthFirst(graph, node, visited);
      regions++;
    }
    return regions;
  }

  function depthFirst(graph, node, visited) {
    if (visited.has(node)) return;
    visited.add(node);
    // iterate through the neighbors and visit using the depthfirst function
    graph[node].forEach((neighbor) => {
      depthFirst(graph, neighbor, visited);
      // return true;
    });
  }

module.exports = {
    numRegions
};