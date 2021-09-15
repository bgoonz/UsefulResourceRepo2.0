package data.structures.java.trees;

import java.util.ArrayList;
import java.util.List;
import java.util.Stack;
import java.util.stream.Collectors;

public class TreeCommon
{
  public static<T extends Comparable<T>> int getHeight(TreeNode<T> treeNode)
  {
    if(treeNode == null)
    {
      return 0;
    }

    return Math.max(getHeight(treeNode.left), getHeight(treeNode.right)) + 1;
  }

  public static <T extends Comparable<T>> boolean isBalanced (TreeNode<T> treeNode)
  {
    if(treeNode == null)
    {
      return true;
    }

    int diff = getHeight(treeNode.left) - getHeight(treeNode.right);
    if(Math.abs(diff) > 1)
    {
      return false;
    }
    else {
      return isBalanced(treeNode.left) && isBalanced(treeNode.right);
    }
  }

  public static<T extends Comparable<T>> int copyToList(TreeNode<T> treeNode, List<TreeNode<T>> result)
  {
    if(treeNode == null)
    {
      return result.size();
    }
    copyToList(treeNode.left, result);
    result.add(treeNode);
    copyToList(treeNode.right,result);

    return result.size();
  }

  public static<T extends Comparable<T>> List<List<TreeNode<T>>> printBF1(TreeNode<T> treeNode)
  {
    if(treeNode == null)
    {
      return null;
    }

    List<List<TreeNode<T>>> result = new ArrayList<>();

    List<TreeNode<T>> current = new ArrayList<>();
    current.add(treeNode);
    while(!current.isEmpty())
    {
      result.add(current);

      List<TreeNode<T>> parents = current;
      current = new ArrayList<>();
      for(TreeNode<T> parent : parents)
      {
        if(parent.left != null)
        {
          current.add(parent.left);
        }
        if(parent.right != null)
        {
          current.add(parent.right);
        }
      }
    }
    return result;
  }

  public static<T extends Comparable<T>> List<TreeNode<T>> printBF2(TreeNode<T> treeNode)
  {
    List<List<TreeNode<T>>> result = printBF1(treeNode);
    return result.stream().flatMap(List::stream).collect(Collectors.toList());
  }

  public static<T extends Comparable<T>> void printDF(TreeNode<T> treeNode, List<T> result)
  {
    if(treeNode == null)
    {
      return;
    }
    printDF(treeNode.left, result);
    result.add(treeNode.data);
    printDF(treeNode.right, result);
  }

  public static<T extends Comparable<T>> void printDFReverse(TreeNode<T> treeNode, List<TreeNode<T>> result)
  {
    if(treeNode == null)
    {
      return;
    }
    printDFReverse(treeNode.right, result);
    result.add(treeNode);
    printDFReverse(treeNode.left, result);
  }

  public static<T extends Comparable<T>> List<T> printDFIterative(TreeNode<T> treeNode)
  {
    List<T> result = new ArrayList<>();

    if(treeNode == null)
    {
      return result;
    }

    Stack<TreeNode<T>> stack = new Stack<>();

    TreeNode<T> p = treeNode;
    while(!stack.empty() || p != null)
    {
      if(p != null)
      {
        stack.push(p);
        p = p.left;
      }
      else
      {
        TreeNode<T> t = stack.pop();
        result.add(t.data);
        p = t.right;
      }
    }

    return result;
  }

  public static<T extends Comparable<T>> T kthSmallest(TreeNode<T> treeNode, int k)
  {
    if(treeNode == null)
    {
      return null;
    }

    Stack<TreeNode<T>> stack = new Stack<>();

    TreeNode<T> p = treeNode;
    while(!stack.empty() || p != null)
    {
      if(p != null)
      {
        stack.push(p);
        p = p.left;
      }
      else
      {
        TreeNode<T> t = stack.pop();
        k--;
        if(k == 0)
        {
          return t.data;
        }
        p = t.right;
      }
    }

    return null;
  }


}
