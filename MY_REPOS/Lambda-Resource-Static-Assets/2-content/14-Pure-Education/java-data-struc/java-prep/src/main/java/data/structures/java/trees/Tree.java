package data.structures.java.trees;

import java.util.Stack;

public class Tree<T extends Comparable<T>>
{
  public TreeNode<T> root;

  public Tree(T[] values)
  {
    for(T val : values)
    {
      add(val);
    }
  }

  void add(T value)
  {
    if(root == null)
    {
      root = new TreeNode<>(value);
    }
    else
    {
      add(root, value);
    }
  }

  private void add(TreeNode<T> treeNode, T value)
  {
    if(value.compareTo(treeNode.data) == -1)
    {
      if(treeNode.left == null)
      {
        treeNode.left = new TreeNode<>(value);
      }
      else
      {
        add(treeNode.left, value);
      }
    }
    else
    {
      if(treeNode.right == null)
      {
        treeNode.right = new TreeNode<>(value);
      }
      else
      {
        add(treeNode.right, value);
      }
    }
  }

  Iterator iterator()
  {
    return new Iterator(root);
  }

  class Iterator
  {
    private Stack<TreeNode<T>> stack = new Stack<>();

    Iterator(TreeNode<T> treeNode)
    {
      while(treeNode != null)
      {
        stack.push(treeNode);
        treeNode = treeNode.left;
      }
    }

    boolean hasNext()
    {
      return stack.empty();
    }

    TreeNode<T> next()
    {
      TreeNode<T> treeNode = stack.pop();

      if(treeNode.right != null)
      {
        TreeNode<T> tmp = treeNode.right;
        while(tmp != null)
        {
          stack.push(tmp);
          tmp = tmp.left;
        }
      }
      return treeNode;
    }
  }
}
