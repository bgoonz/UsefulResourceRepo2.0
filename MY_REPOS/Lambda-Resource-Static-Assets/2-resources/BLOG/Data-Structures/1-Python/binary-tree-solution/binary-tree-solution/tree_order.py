from tree_node import TreeNode

def in_order_traversal(root=None):
  """
  1. Define in_order_traversal function.
  2. If the root is null, return an empty list.
  3. Get the list of values for visiting the left node.
  4. Get the list of values for visiting the right node.
  5. Return the left list values concatenated with the root value, concatenated
     with the right list values.
  """
  if root is None:
    return []

  left_values = in_order_traversal(root.left)
  right_values = in_order_traversal(root.right)
  return left_values + [root.value] + right_values

def post_order_traversal(root=None):
  """
  1. Define post_order_traversal function.
  2. If the root is null, return an empty list.
  3. Get the list of values for visiting the left node.
  4. Get the list of values for visiting the right node.
  5. Return the left list values concatenated with the right list values,
     concatenated with the root value.
  """
  if root is None:
    return []

  left_values = post_order_traversal(root.left)
  right_values = post_order_traversal(root.right)
  return left_values + right_values + [root.value]

root = TreeNode('a')
b = TreeNode('b')
c = TreeNode('c')
d = TreeNode('d')
e = TreeNode('e')
f = TreeNode('f')

root.left = b
root.right = c
b.left = d
b.right = e
c.right = f

print(in_order_traversal())         # []
print(in_order_traversal(root))     # ['d', 'b', 'e', 'a', 'c', 'f']
print(post_order_traversal())       # []
print(post_order_traversal(root))   # ['d', 'e', 'b', 'f', 'c', 'a']
