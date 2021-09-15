package data.structures.java.trees;

public class SubTree
{
  private static<T extends Comparable<T>> boolean matches(TreeNode<T> t1, TreeNode<T> t2)
  {
    if(t1 == null && t2 == null)
    {
      return true;
    }
    if(t1 == null || t2 == null)
    {
      return false;
    }

    if(t1.data != t2.data)
    {
      return false;
    }

    return matches(t1.left, t2.left) && matches(t1.right, t2.right);
  }


  public static<T extends Comparable<T>> boolean subtree(TreeNode<T> t1, TreeNode<T> t2)
  {
    if(t1 == null)
    {
      return false;
    }
    if(t1.data == t2.data)
    {
      if(matches(t1, t2))
      {
        return true;
      }
    }
    return subtree(t1.left, t2) || subtree(t1.right, t2);
  }
}
