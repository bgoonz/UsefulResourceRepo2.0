package data.structures.java.trees;

import org.junit.Test;

import static org.junit.Assert.*;

public class CommonParentTest
{
  @Test
  public void commonParent()
  {
    TreeNode<Integer> n1 = new TreeNode<>(4);
    TreeNode<Integer> n2 = new TreeNode<>(2);
    TreeNode<Integer> n3 = new TreeNode<>(6);
    TreeNode<Integer> n4 = new TreeNode<>(8);
    TreeNode<Integer> n5 = new TreeNode<>(1);
    TreeNode<Integer> n6 = new TreeNode<>(9);
    TreeNode<Integer> n7 = new TreeNode<>(3);
    TreeNode<Integer> n8 = new TreeNode<>(7);
    TreeNode<Integer> n9 = new TreeNode<>(5);

    n1.left = n2; n1.right = n3;
    n2.left = n5; n2.right = n7;
    n3.left = n9; n3.right = n4;
    n4.left = n8; n4.right = n6;

    TreeNode<Integer> commonParent = CommonParent.commonParent(n1, n9, n6);
    assertEquals(Integer.valueOf(6), commonParent.data);
  }
}