class TreeNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None


node_a = TreeNode("a")
# print(node_a.value)         # 'a'
# print(node_a.right)         # None
# print(node_a.left)          # None

node_b = TreeNode("b")
node_a.left = node_b
# print(node_a.left.value)    # 'b'
# print(node_a.right)         # None
