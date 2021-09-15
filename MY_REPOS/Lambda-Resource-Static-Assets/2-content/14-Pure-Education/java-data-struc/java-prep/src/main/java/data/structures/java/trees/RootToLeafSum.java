package data.structures.java.trees;

public class RootToLeafSum
{
  /*
           6
       /      \
     3          5
   /   \          \
  2     5          4
      /   \
     7     4
  Path                    Number
  6->3->2                   632
  6->3->5->7               6357
  6->3->5->4               6354
  6->5>4                    654
  Answer = 632 + 6357 + 6354 + 654 = 13997
  */

  public static int treePathsSum(TreeNode<Integer> node)
  {
    return treePathsSum(node, 0);
  }

  private static int treePathsSum(TreeNode<Integer> node, int val)
  {
    if(node == null)
    {
      return 0;
    }

    val = val * 10 + node.data;

    if(node.left == null && node.right == null)
    {
      return val;
    }

    return treePathsSum(node.left, val) + treePathsSum(node.right, val);
  }
}
