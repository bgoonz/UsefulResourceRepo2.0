package data.structures.java.recursion;

import data.structures.java.trees.Tree;
import data.structures.java.trees.TreeCommon;
import org.junit.Test;

import static org.junit.Assert.*;

public class TreeTest
{

  @Test
  public void kthSmallest()
  {
    data.structures.java.trees.Tree<Integer> tree = new Tree(new Integer[]{4, 2, 6, 8, 1, 9, 3, 7, 5});
    assertEquals(Integer.valueOf(3), TreeCommon.kthSmallest(tree.root, 3));

  }
}