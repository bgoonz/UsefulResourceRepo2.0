// Given a binary tree, check whether it is a mirror of itself (ie, symmetric around its center).

// For example, this binary tree [1,2,2,3,4,4,3] is symmetric:

//     1
//    / \
//   2   2
//  / \ / \
// 3  4 4  3
// But the following [1,2,2,null,3,null,3] is not:
//     1
//    / \
//   2   2
//    \   \
//    3    3
// Note:
// Bonus points if you could solve it both recursively and iteratively.

// Hide Company Tags LinkedIn Bloomberg Microsoft
// Hide Tags Tree Depth-first Search Breadth-first Search



/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
const isSymmetric = root => {
    const queue = [];
    queue.push(root);
    
    while(queue.length !== 0) {
        const len = queue.length;
        
        if(!isLevelSymmetric(queue)) {
            return false;
        }
        
        for(let i = 0; i < len; i++) {
            const node = queue.shift();
            
            if(node !== null) {
                queue.push(node.left);
                queue.push(node.right);
            }
        }
    }
    
    return true;
};

function isLevelSymmetric(nodes) {
    const len = nodes.length;
    let beg = 0;
    let end = len - 1;
    
    while(beg < end) {
        if(nodes[beg] === null && nodes[end] === null || (nodes[beg] && nodes[end] && nodes[beg].val === nodes[end].val)) {
            beg++;
            end--;
        } else {
            return false;
        }
    }
    
    return true;
}
