package data.structures.java.trees;

import org.junit.Test;

import static org.junit.Assert.*;

public class BSTTest
{

  @Test
  public void isBST1()
  {
    Tree<Integer> tree = new Tree(new Integer[]{4, 2, 6, 8, 1, 9, 3, 7, 5});
    assertTrue(BST.isBST1(tree.root));
  }

  @Test
  public void isBST2()
  {
    Tree<Integer> tree = new Tree(new Integer[]{4, 2, 6, 8, 1, 9, 3, 7, 5});
    assertTrue(BST.isBST1(tree.root));
  }
}