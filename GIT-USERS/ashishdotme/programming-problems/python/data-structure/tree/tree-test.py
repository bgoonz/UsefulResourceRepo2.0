from binarytree import tree, bst

my_tree = bst(height=2, is_perfect=True)

print(my_tree)

print("Inorder Traversel -->")
print(my_tree.inorder)

print("Preorder Traversel -->")
print(my_tree.preorder)

print("Postoder Traversel -->")
print(my_tree.postorder)
