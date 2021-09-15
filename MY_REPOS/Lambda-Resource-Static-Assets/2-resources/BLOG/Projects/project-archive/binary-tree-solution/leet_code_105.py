"""
View the full problem and run the test cases at:
https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/
"""
from tree_node import TreeNode


def buildTree(preorder, inorder):
    """
  :type preorder: List[int]
  :type inorder: List[int]
  :rtype: TreeNode
  """
    if not preorder or not inorder:
        return None

    root_value = preorder.pop(0)
    root = TreeNode(root_value)
    root_index = inorder.index(root_value)

    left_inorder = inorder[:root_index]
    right_inorder = inorder[root_index + 1 :]

    root.left = buildTree(preorder, left_inorder)
    root.right = buildTree(preorder, right_inorder)
    return root


preorder_tree = [3, 9, 20, 15, 7]
inorder_tree = [9, 3, 15, 20, 7]
root_node = buildTree(preorder_tree, inorder_tree)
print(root_node.value)  # 3
print(root_node.left.value)  # 9
print(root_node.right.value)  # 20
print(root_node.right.left.value)  # 15
print(root_node.right.right.value)  # 7
# Returns the `root` node of the following binary tree:
#   3
#  / \
# 9  20
#   /  \
#  15   7
