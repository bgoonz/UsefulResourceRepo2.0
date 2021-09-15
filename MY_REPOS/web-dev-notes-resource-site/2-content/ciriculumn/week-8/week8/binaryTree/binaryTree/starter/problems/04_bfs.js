function bfs(root){
    let data = [];
    let queue = [root];

    if (!root) return [];


    while (queue.length) {
        let node = queue.shift();
        data.push(node.val)

        if (node.left ) queue.push(node.left)
        if (node.right) queue.push(node.right);

    }
    return data
    
}


module.exports = { bfs };
