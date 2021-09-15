function maxValue(node, visited=new Set()) {
    //base case
//      already in set        return
    if(visited.has(node)) return -Infinity;


    visited.add(node); //if not in set add the node to it

    let max = node.neighbors.map((x) => maxValue(x, visited));
    return Math.max(node.val, ...max);

}

module.exports = {
    maxValue
};
