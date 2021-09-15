package data.structures.java.trees;

import org.junit.Test;

import static org.junit.Assert.*;

public class InvertTreeTest
{

  @Test
  public void invertRecursive()
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

    TreeNode<Integer> inverted = InvertTree.invertRecursive(n1);
    assertEquals(Integer.valueOf(4), inverted.data);
    assertEquals(Integer.valueOf(6), inverted.left.data);
    assertEquals(Integer.valueOf(2), inverted.right.data);
    assertEquals(Integer.valueOf(8), inverted.left.left.data);
    assertEquals(Integer.valueOf(5), inverted.left.right.data);
    assertEquals(Integer.valueOf(9), inverted.left.left.left.data);
    assertEquals(Integer.valueOf(7), inverted.left.left.right.data);
    assertEquals(Integer.valueOf(3), inverted.right.left.data);
    assertEquals(Integer.valueOf(1), inverted.right.right.data);
  }

  @Test
  public void invertIterative()
  {
    invertRecursive();
  }
}