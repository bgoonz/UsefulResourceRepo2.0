package data.structures.java.trees;

import java.util.LinkedList;
import java.util.Queue;

public class MirrorTree
{
  public static<T> void mirrorDFS(TreeNode<T> node)
  {
    if(node == null)
    {
      return;
    }

    mirrorDFS(node.left);
    mirrorDFS(node.right);

    TreeNode<T> temp = node.left;
    node.left = node.right;
    node.right = temp;
  }

  public static<T> void mirrorBFS(TreeNode<T> node)
  {
    Queue<TreeNode> queue = new LinkedList<>();
    queue.offer(node);
    while(!queue.isEmpty())
    {
      TreeNode<T> n = queue.poll();
      TreeNode<T> left = n.left;
      TreeNode<T> right = n.right;
      if(left != null && right != null)
      {
        TreeNode<T> temp = left;
        n.left = n.right;
        n.right = temp;
      }
      if(left != null)
      {
        queue.offer(left);
      }
      if(right !=null)
      {
        queue.offer(right);
      }
    }
  }
}
