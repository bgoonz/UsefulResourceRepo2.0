function maxValue(node, visited = new Set(), maxVal = 0) {
    // if the node has already been visited retutn
    if (visited.has(node)) return;
    // set maxVal to node.val if its greater
    if (node.val > maxVal) maxVal = node.val;
    // add node to visited set
    visited.add(node);
    // for each neighbor of node >>> call upon maxValue function to search through tree and set maxval to the greater val
    node.neighbors.forEach((element) => {
      let nodeMax = maxValue(element, visited, maxVal);
      if (nodeMax > maxVal) maxVal = nodeMax;
    });
    return maxVal;
  }

module.exports = {
    maxValue
};