/*
  The Set constructor lets you create Set objects that store unique values of any type, whether primitive values or object references.
  const set1 = new Set([1, 2, 3, 4, 5]);

console.log(set1.has(1));
// expected output: true

console.log(set1.has(5));
// expected output: true

console.log(set1.has(6));
// expected output: false
  
  Syntax
new Set([iterable])
Parameters
iterable Optional
If an iterable object is passed, all of its elements will be added to the new Set.

If you don't specify this parameter, or its value is null, the new Set is empty.

Return value
A new Set object.
  

Using the Set object
let mySet = new Set()

mySet.add(1)           // Set [ 1 ]
mySet.add(5)           // Set [ 1, 5 ]
mySet.add(5)           // Set [ 1, 5 ]
mySet.add('some text') // Set [ 1, 5, 'some text' ]
let o = {a: 1, b: 2}
mySet.add(o)

//A SET ONLY STOES UNIQUE VALUES... IF YOU STORE THE SAME VALUE TWICE IT WILL ONLY SHOW UP ONCE
*/

/*
DFS: start at bottom left most node and trace the inside of the tree
                            Ⓐ 
                           ╱  ╲
                          Ⓑ   Ⓒ
                         ╱  ╲   ╲        
                        Ⓓ   Ⓔ   Ⓕ
Ⓖ
                        
                        function constructBalancedTree(){
  let a = new TreeNode('a');
  let b = new TreeNode('b');
  let c = new TreeNode('c');
  let d = new TreeNode('d');
  let e = new TreeNode('e');
  let f = new TreeNode('f');
  let g = new TreeNode('g');
    expect(dfs(new TreeNode('a'))).to.eql(['a']);
    expect(dfs(constructBalancedTree())).to.eql(['a', 'b', 'd', 'e', 'c', 'f', 'g']);
    //PREORDER
                                    Ⓐ 
                                   ╱  ╲
                                 Ⓑ     Ⓒ
                                ╱ ╲    ╱ ╲        
                               Ⓓ  Ⓔ  Ⓕ  Ⓖ
  
  expected : a, b, c, d, e, f, g
  actual : a, c, g, f, b, e, d
  second: d, e, b, f, g, c, a
  
  a.left = b;
  a.right = c;
  b.left = d;
  b.right = e;
  c.left = f;
  c.right = g;

  return a;
}

function constructUnbalancedTree(){
  let h = new TreeNode('h');
  let i = new TreeNode('i');
  let j = new TreeNode('j');
  let k = new TreeNode('k');
  let l = new TreeNode('l');
  let m = new TreeNode('m');
//PREORDER
                                   Ⓗ 
                                  ╱  ╲
                                 Ⓘ   Ⓚ
                                  ╲   ╱         
                                  Ⓙ  Ⓛ  
                                       ╲
                                        Ⓜ
  h.left = i;
  h.right = k;
  i.right = j;
  k.left = l;
  l.right = m;
expect(dfs(constructUnbalancedTree())).to.eql(['h', 'i', 'j', 'k', 'l', 'm']);
  return h;
}

  it('should return the values of a tree in dfs order', () => {
    expect(dfs(new TreeNode('a'))).to.eql(['a']);
    expect(dfs(constructBalancedTree())).to.eql(['a', 'b', 'd', 'e', 'c', 'f', 'g']);
    expect(dfs(constructUnbalancedTree())).to.eql(['h', 'i', 'j', 'k', 'l', 'm']);
  });
});
*/
/*
  function preOrderArray(root, tree = []) {
  
  if(!root) return tree;

  tree.push(root.val);
  preOrderArray(root.left, tree);
  preOrderArray(root.right, tree);

  return tree;
}
*/

//bfs--->que
//dfs--->stack

// root ... not this.root is parameter
function dfs(root, storage = new Array()) {
    //D->E->B->F->C->A
    //open test file and look at tree being passed in

    if (root === null) {
        return storage;
    } else {
        const leftArr = dfs(root.left);
        const rightArr = dfs(root.right);
        storage.push(root.val, ...leftArr, ...rightArr);
        return storage;
    }
}

module.exports = {
    dfs,
};
