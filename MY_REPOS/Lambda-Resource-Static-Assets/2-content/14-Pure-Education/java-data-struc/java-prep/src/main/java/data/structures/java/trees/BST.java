package data.structures.java.trees;

import java.util.ArrayList;
import java.util.List;

public class BST
{
  public static <T extends Comparable<T>> boolean isBST1(TreeNode<T> treeNode)
  {
    if(treeNode == null)
    {
      return true;
    }

    if((treeNode.left != null && treeNode.left.data.compareTo(treeNode.data) == 1) ||
        (treeNode.right != null && treeNode.right.data.compareTo(treeNode.data) == -1))
    {
      return false;
    }

    return isBST1(treeNode.left) && isBST1(treeNode.right);
  }

  public static<T extends Comparable<T>> boolean isBST2(TreeNode<T> treeNode)
  {
    List<T> result = new ArrayList<>();
    copyToList(treeNode, result);
    for(int i = 1; i < result.size(); ++i)
    {
      if(result.get(i).compareTo(result.get(i - 1)) == -1)
      {
        return false;
      }
    }
    return true;
  }

  private static <T extends Comparable<T>> void copyToList(TreeNode<T> treeNode, List<T> result)
  {
    if(treeNode == null)
    {
      return;
    }
    copyToList(treeNode.left, result);
    result.add(treeNode.data);
    copyToList(treeNode.right, result);
  }
}
