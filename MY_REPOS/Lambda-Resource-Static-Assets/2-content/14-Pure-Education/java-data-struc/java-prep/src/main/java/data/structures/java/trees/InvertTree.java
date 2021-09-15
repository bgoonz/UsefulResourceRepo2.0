package data.structures.java.trees;

import java.util.LinkedList;
import java.util.Queue;

public class InvertTree
{
  public static<T> TreeNode<T> invertRecursive(TreeNode<T> root)
  {
    if(root == null)
    {
      return root;
    }

    invertRecursive(root.left);
    invertRecursive(root.right);

    TreeNode<T> tmp = root.left;
    root.left = root.right;
    root.right = tmp;
    return root;
  }

  public static<T> TreeNode<T> invertIterative(TreeNode<T> root)
  {
    Queue<TreeNode<T>> queue = new LinkedList<>();
    queue.add(root);
    while(!queue.isEmpty())
    {
      TreeNode<T> node = queue.poll();
      if(node.left != null)
      {
        queue.add(node.left);
      }
      if(node.right != null)
      {
        queue.add(node.right);
      }

      TreeNode<T> tmp = node.left;
      node.left = node.right;
      node.right = tmp;
    }

    return root;
  }
}
