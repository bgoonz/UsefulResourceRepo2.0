package data.structures.java.trees;

import org.junit.Test;

import static org.junit.Assert.*;

public class SubTreeTest
{

  @Test
  public void subtree()
  {
    Tree<Integer> tree1 = new Tree(new Integer [] { 4, 2, 6, 8, 1, 9, 3, 7, 5});
    Tree<Integer> tree2 = new Tree(new Integer [] { 8, 7, 9});
    assertTrue(SubTree.subtree(tree1.root, tree2.root));
  }
}