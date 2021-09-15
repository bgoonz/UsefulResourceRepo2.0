package data.structures.java.trees;

import org.junit.Test;

import static org.junit.Assert.*;

public class BSTFromArrayTest
{

  @Test
  public void createBST()
  {
    BSTFromArray bstFromArray = new BSTFromArray(new int [] { 4, 2, 6, 8, 1, 9, 3, 7, 5});
    TreeNode<Integer> root = bstFromArray.createBST();
    assertTrue(BST.isBST1(root));
  }
 }