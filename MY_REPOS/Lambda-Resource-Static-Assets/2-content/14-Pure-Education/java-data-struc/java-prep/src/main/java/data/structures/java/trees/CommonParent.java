package data.structures.java.trees;

public class CommonParent
{
  private static<T extends Comparable<T>> boolean rootCovers(TreeNode<T> n1, TreeNode<T> n2)
  {
    if(n1 == null)
    {
      return false;
    }
    if(n1.equals(n2))
    {
      return true;
    }
    return rootCovers(n1.left, n2) || rootCovers(n1.right, n2);
  }

  public static<T extends Comparable<T>> TreeNode<T> commonParent(TreeNode<T> root, TreeNode<T> first, TreeNode<T> second)
  {
    if(root == null)
    {
      return null;
    }
    if(root.equals(first) || root.equals(second))
    {
      return root;
    }

    boolean isFirstOnLeft = rootCovers(root.left, first);
    boolean isSecondOnLeft = rootCovers(root.left, second);
    if(isFirstOnLeft != isSecondOnLeft)
    {
      return root;
    }

    TreeNode<T> childTreeNode = isFirstOnLeft ? root.left : root.right;
    return commonParent(childTreeNode, first, second);
  }
}
