const BST = require('./BST')
const Node = require('../BinaryTreeNode')

it('should instantiate', () => {
    const bst = new BST()
    expect(bst).toBeDefined()
})

it('should insert first node with data - 10', () => {
    const bst = new BST()
    bst.insert(10)
    expect(bst.root.data).toBe(10)
})

it('should insert second node with data - 5 in left', () => {
    const bst = new BST()
    bst.insert(10)
    bst.insert(5)
    expect(bst.root.left.data).toBe(5)
})

it('should insert third node with data - 20 in right', () => {
    const bst = new BST()
    bst.insert(10)
    bst.insert(5)
    bst.insert(20)
    expect(bst.root.right.data).toBe(20)
})

it('should search existing node', () => {
    const bst = new BST()
    bst.insert(10)
    bst.insert(5)
    bst.insert(20)
    expect(bst.search(20)).toBe(bst.root.right)
})

it('should search existing node in left sub tree', () => {
    const bst = new BST()
    bst.insert(10)
    bst.insert(5)
    bst.insert(20)
    expect(bst.search(5)).toBe(bst.root.left)
})

it('should return null if searching nonexisting node', () => {
    const bst = new BST()
    bst.insert(10)
    bst.insert(5)
    bst.insert(20)
    expect(bst.search(30)).toBe(null)
})

it('should delete element with not children', () => {
    const bst = new BST()
    bst.insert(10)
    bst.insert(5)
    bst.insert(20)
    bst.delete(20)

    expect(bst.root.data).toBe(10)
    expect(bst.root.left.data).toBe(5)
    expect(bst.root.right).toBe(null)
})

it('should delete element with 1 child(right)', () => {
    const bst = new BST()
    bst.insert(10)
    bst.insert(5)
    bst.insert(20)
    bst.insert(30)

    bst.delete(20)
    bst.delete(100)

    /*
            10
        5       20
                    30
    */

    expect(bst.root.data).toBe(10)
    expect(bst.root.left.data).toBe(5)
    expect(bst.root.right.data).toBe(30)
})

it('should delete element with 1 child(right)', () => {
    const bst = new BST()
    bst.insert(10)
    bst.insert(5)
    bst.insert(20)
    bst.insert(30)

    bst.delete(5)

    /*
            10
        5       20
                    30
    */

    expect(bst.root.data).toBe(10)
    expect(bst.root.right.data).toBe(20)
    expect(bst.root.right.right.data).toBe(30)
})

it('should delete element with 1 child(left)', () => {
    const bst = new BST()
    bst.insert(10)
    bst.insert(5)
    bst.insert(20)
    bst.insert(15)

    bst.delete(20)

    /*
            10
        5       20
            15
    */

    expect(bst.root.data).toBe(10)
    expect(bst.root.left.data).toBe(5)
    expect(bst.root.right.data).toBe(15)
})

it('should delete element with both children', () => {
    const bst = new BST()
    bst.insert(10)
    bst.insert(5)
    bst.insert(20)
    bst.insert(15)
    bst.insert(30)
    bst.delete(20)

    /*
            10
        5       20
            15      30
    */

    expect(bst.root.data).toBe(10)
    expect(bst.root.left.data).toBe(5)
    expect(bst.root.right.data).toBe(30)
})

it('should delete element with both children with more nodes', () => {
    const bst = new BST()
    bst.insert(10)
    bst.insert(5)
    bst.insert(20)
    bst.insert(15)
    bst.insert(30)
    bst.insert(50)
    bst.delete(20)

    /*
    <- Before ->
            10
        5       20
            15      30
                        50

    <- After ->
            10
        5       30
            15      50
    */

    expect(bst.root.data).toBe(10)
    expect(bst.root.left.data).toBe(5)
    expect(bst.root.right.data).toBe(30)
    expect(bst.root.right.right.data).toBe(50)
})

it('should check isBST example 1', () => {
    const bst = new BST()
    bst.insert(10)
    bst.insert(5)
    bst.insert(20)

    /*
            10
        5       20

    */

    expect(bst.isBST()).toBe(true)
})

it('should check isBST example 2', () => {
    const bst = new BST()
    bst.insert(10)
    bst.insert(5)
    bst.insert(20)
    bst.insert(15)
    bst.insert(30)
    bst.insert(50)
    bst.delete(20)

    /*
    <- Before ->
            10
        5       20
            15      30
                        50
    */

    expect(bst.isBST()).toBe(true)
})

it('should check isBST example 3', () => {
    const bst = new BST()
    bst.root = new Node(4)
    bst.root.left = new Node(2)
    bst.root.right = new Node(5)
    bst.root.left.left = new Node(1)
    const node = new Node()
    node.data = 3
    bst.root.left.right = node

    /*
                    4
                2       5
            1       3
    */

    expect(bst.isBST()).toBe(true)
})

it('should check isBST example 4', () => {
    const bst = new BST()
    bst.root = new Node(3)
    bst.root.left = new Node(2)
    bst.root.right = new Node(5)
    bst.root.right.left = new Node(1)
    bst.root.right.right = new Node(4)

    /*
                    3
                2       5
            1       4
    */

    expect(bst.isBST()).toBe(false)
})

it('should check isBST example 5', () => {
    const bst = new BST()
    bst.root = new Node(6)
    bst.root.left = new Node(2)
    bst.root.right = new Node(8)
    bst.root.left.left = new Node(1)
    bst.root.left.right = new Node(9)

    /*
                6
            2       8
        1       9
    */

    expect(bst.isBST()).toBe(false)
})

test('min should return null in empty tree', () => {
    const bst = new BST()
    expect(bst.min()).toBe(null)
})

it('should get min node in BST', () => {
    const bst = new BST()
    bst.insert(10)
    bst.insert(5)
    bst.insert(20)
    bst.insert(15)
    bst.insert(30)
    bst.insert(50)

    /*
    <- Before ->
            10
        5       20
            15      30
                        50
    */

    expect(bst.min().data).toBe(5)
})

it('should get max node in BST', () => {
    const bst = new BST()
    bst.insert(10)
    bst.insert(5)
    bst.insert(20)
    bst.insert(15)
    bst.insert(30)
    bst.insert(50)

    /*
    <- Before ->
            10
        5       20
            15      30
                        50
    */

    expect(bst.max().data).toBe(50)
})

test('max should return null in empty tree', () => {
    const bst = new BST()
    expect(bst.max()).toBe(null)
})

it('should get correct LCA of existing two numbers', () => {
    const bst = new BST()
    expect(bst.lca()).toEqual(null)

    bst.insert(10)
    bst.insert(5)
    bst.insert(2)
    bst.insert(20)
    bst.insert(15)
    bst.insert(30)
    bst.insert(50)

    /*
    <- Before ->
            10
        5       20
    2        15      30
                        50
    */

    expect(bst.lca()).toBe(null)
    expect(bst.lca(15)).toBe(null)
    expect(bst.lca(15, undefined)).toBe(null)

    expect(bst.lca(5, 2).data).toBe(5)
    expect(bst.lca(15, 50).data).toBe(20)
    expect(bst.lca(15, 50).data).toBe(20)
    expect(bst.lca(50, 15).data).toBe(20)
    expect(bst.lca(5, 50).data).toBe(10)
    expect(bst.lca(30, 50).data).toBe(30)
    expect(bst.lca(15, 30).data).toBe(20)
})

it('should get shortest path between two nodes', () => {
    const bst = new BST()
    bst.insert(10)
    bst.insert(5)
    bst.insert(20)
    bst.insert(15)
    bst.insert(30)
    bst.insert(50)
    bst.insert(2)

    /*
    <- Before ->
            10
        5        20
    2        15      30
                         50
    */

    expect(bst.shortestPath(15, 50)).toEqual([15, 20, 30, 50])
    expect(bst.shortestPath(15, 30)).toEqual([15, 20, 30])
    expect(bst.shortestPath(50, 15)).toEqual([15, 20, 30, 50])
    expect(bst.shortestPath(5, 50)).toEqual([5, 10, 20, 30, 50])
    expect(bst.shortestPath(10, 10)).toEqual([10])
    expect(bst.shortestPath(10, 20)).toEqual([10, 20])
    expect(bst.shortestPath(20, 50)).toEqual([20, 30, 50])
    expect(bst.shortestPath(2, 50)).toEqual([2, 5, 10, 20, 30, 50])
    expect(bst.shortestPath(2, 15)).toEqual([2, 5, 10, 20, 15])
    expect(bst.shortestPath(5, 15)).toEqual([5, 10, 20, 15])
})

it('should insert alphabets correctly', () => {
    const bst = new BST((a, b) => {
        return a.charCodeAt() - b.charCodeAt()
    })
    bst.insert('B')
        .insert('A')
        .insert('C')
        .insert('D')
    /*
            B
        A       C
                    D
    */
    expect(bst.root.data).toBe('B')
    expect(bst.root.left.data).toBe('A')
    expect(bst.root.right.data).toBe('C')
    expect(bst.root.right.right.data).toBe('D')
})

it('should run in-order traverse correctly', () => {
    const bst = new BST((a, b) => {
        return a.charCodeAt() - b.charCodeAt()
    })
    bst.insert('B')
        .insert('A')
        .insert('C')
        .insert('D')
    /*
            B
        A       C
                    D
    */
    expect(bst.traverse('inorder')).toBe('A B C D')
})

it('should run pre-order traverse correctly', () => {
    const bst = new BST((a, b) => {
        return a.charCodeAt() - b.charCodeAt()
    })
    bst.insert('B')
        .insert('A')
        .insert('C')
        .insert('D')
    /*
            B
        A       C
                    D
    */
    expect(bst.traverse('preorder')).toBe('B A C D')
})

it('should run post-order traverse correctly', () => {
    const bst = new BST((a, b) => {
        return a.charCodeAt() - b.charCodeAt()
    })
    bst.insert('B')
        .insert('A')
        .insert('C')
        .insert('D')
    /*
            B
        A       C
                    D
    */
    expect(bst.traverse('postorder')).toBe('A D C B')
})

it('should return in-order traverse on toString call', () => {
    const bst = new BST((a, b) => {
        return a.charCodeAt() - b.charCodeAt()
    })
    bst.insert('B')
        .insert('A')
        .insert('C')
        .insert('D')
    /*
            B
        A       C
                    D
    */
    expect(bst.toString()).toBe('A,B,C,D')
})
