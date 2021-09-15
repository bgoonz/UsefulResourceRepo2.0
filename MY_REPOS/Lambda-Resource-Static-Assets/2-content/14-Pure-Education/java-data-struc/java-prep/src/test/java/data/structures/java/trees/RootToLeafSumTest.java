package data.structures.java.trees;

import org.junit.Test;

import static org.junit.Assert.*;

public class RootToLeafSumTest
{

  @Test
  public void treePathsSum()
  {
    TreeNode<Integer> n1 = new TreeNode<>(6);
    TreeNode<Integer> n2 = new TreeNode<>(3);
    TreeNode<Integer> n3 = new TreeNode<>(5);
    TreeNode<Integer> n4 = new TreeNode<>(2);
    TreeNode<Integer> n5 = new TreeNode<>(5);
    TreeNode<Integer> n6 = new TreeNode<>(4);
    TreeNode<Integer> n7 = new TreeNode<>(7);
    TreeNode<Integer> n8 = new TreeNode<>(4);

    n1.left = n2;
    n1.right = n3;
    n2.left = n4;
    n2.right = n5;
    n5.left = n7;
    n5.right = n8;
    n3.right = n6;

    assertEquals(13997, RootToLeafSum.treePathsSum(n1));

  }
}