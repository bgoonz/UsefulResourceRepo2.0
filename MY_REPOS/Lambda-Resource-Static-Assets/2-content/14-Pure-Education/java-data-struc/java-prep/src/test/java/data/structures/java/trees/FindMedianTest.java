package data.structures.java.trees;

import org.junit.Test;

import static org.junit.Assert.*;

public class FindMedianTest
{

  @Test
  public void countNodesBF()
  {
    Tree<Integer> tree = new Tree(new Integer[]{4, 2, 6, 8, 1, 9, 3, 7, 5});
    assertEquals(9, FindMedian.countNodesBF(tree.root));
  }

  @Test
  public void countNodesDF()
  {
    Tree<Integer> tree = new Tree(new Integer[]{4, 2, 6, 8, 1, 9, 3, 7, 5});
    assertEquals(9, FindMedian.countNodesDF(tree.root));
  }

  @Test
  public void getMedian()
  {
    Tree<Integer> oddTree = new Tree(new Integer[]{4, 2, 6, 8, 1, 9, 3, 7, 5});
    TreeNode<Integer>[] nodeArray = FindMedian.getMedian(oddTree.root);
    assertEquals(1, nodeArray.length);
    assertEquals(Integer.valueOf(5), nodeArray[0].data);

    Tree<Integer> evenTree = new Tree(new Integer[]{4, 2, 6, 8, 1, 9, 3, 7, 5, 10});
    nodeArray = FindMedian.getMedian(evenTree.root);
    assertEquals(2, nodeArray.length);
    assertEquals(Integer.valueOf(5), nodeArray[0].data);
    assertEquals(Integer.valueOf(6), nodeArray[1].data);
  }
}