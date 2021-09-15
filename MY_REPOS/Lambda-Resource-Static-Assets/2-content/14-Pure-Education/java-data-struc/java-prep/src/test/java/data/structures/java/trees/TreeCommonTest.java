package data.structures.java.trees;

import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.*;

public class TreeCommonTest
{

  @Test
  public void iterate()
  {
    Tree<Integer> tree = new Tree(new Integer [] { 4, 2, 6, 8, 1, 9, 3, 7, 5});
    Tree.Iterator iter = tree.iterator();
    assertEquals(Integer.valueOf(1), iter.next().data);
    assertEquals(Integer.valueOf(2), iter.next().data);
    assertEquals(Integer.valueOf(3), iter.next().data);
    assertEquals(Integer.valueOf(4), iter.next().data);
    assertEquals(Integer.valueOf(5), iter.next().data);
    assertEquals(Integer.valueOf(6), iter.next().data);
    assertEquals(Integer.valueOf(7), iter.next().data);
    assertEquals(Integer.valueOf(8), iter.next().data);
    assertEquals(Integer.valueOf(9), iter.next().data);
  }

  @Test
  public void getHeight()
  {
    Tree<Integer> tree = new Tree(new Integer[]{4, 2, 6, 8, 1, 9, 3, 7, 5});
    assertEquals(4, TreeCommon.getHeight(tree.root));
  }

  @Test
  public void isBalanced()
  {
    Tree<Integer> tree = new Tree(new Integer [] { 4, 2, 6, 8, 1, 9, 3, 7, 5});
    assertTrue(TreeCommon.isBalanced(tree.root));
  }


  @Test
  public void printBF1()
  {
    Tree<Integer> tree = new Tree(new Integer [] { 4, 2, 6, 8, 1, 9, 3, 7, 5});
    List<List<TreeNode<Integer>>> result = TreeCommon.printBF1(tree.root);
    assertEquals(4, result.size());

    List<TreeNode<Integer>> l1 = result.get(0);
    assertEquals(1, l1.size());
    assertEquals(Integer.valueOf(4), l1.get(0).data);

    List<TreeNode<Integer>> l2 = result.get(1);
    assertEquals(2, l2.size());
    assertEquals(Integer.valueOf(2), l2.get(0).data);
    assertEquals(Integer.valueOf(6), l2.get(1).data);

    List<TreeNode<Integer>> l3 = result.get(2);
    assertEquals(4, l3.size());
    assertEquals(Integer.valueOf(1), l3.get(0).data);
    assertEquals(Integer.valueOf(3), l3.get(1).data);
    assertEquals(Integer.valueOf(5), l3.get(2).data);
    assertEquals(Integer.valueOf(8), l3.get(3).data);

    List<TreeNode<Integer>> l4 = result.get(3);
    assertEquals(2, l4.size());
    assertEquals(Integer.valueOf(7), l4.get(0).data);
    assertEquals(Integer.valueOf(9), l4.get(1).data);
  }

  @Test
  public void printBF2()
  {
    Tree<Integer> tree = new Tree(new Integer [] { 4, 2, 6, 8, 1, 9, 3, 7, 5});
    List<TreeNode<Integer>> result = TreeCommon.printBF2(tree.root);
    assertEquals(9, result.size());

    assertEquals(Integer.valueOf(4),result.get(0).data);
    assertEquals(Integer.valueOf(2),result.get(1).data);
    assertEquals(Integer.valueOf(6),result.get(2).data);
    assertEquals(Integer.valueOf(1),result.get(3).data);
    assertEquals(Integer.valueOf(3),result.get(4).data);
    assertEquals(Integer.valueOf(5),result.get(5).data);
    assertEquals(Integer.valueOf(8),result.get(6).data);
    assertEquals(Integer.valueOf(7),result.get(7).data);
    assertEquals(Integer.valueOf(9),result.get(8).data);
  }

  @Test
  public void printDF()
  {
    Tree<Integer> tree = new Tree(new Integer [] { 4, 2, 6, 8, 1, 9, 3, 7, 5});
    List<Integer> result = new ArrayList<>();
    TreeCommon.printDF(tree.root, result);

    assertEquals(9, result.size());

    assertEquals(Integer.valueOf(1),result.get(0));
    assertEquals(Integer.valueOf(2),result.get(1));
    assertEquals(Integer.valueOf(3),result.get(2));
    assertEquals(Integer.valueOf(4),result.get(3));
    assertEquals(Integer.valueOf(5),result.get(4));
    assertEquals(Integer.valueOf(6),result.get(5));
    assertEquals(Integer.valueOf(7),result.get(6));
    assertEquals(Integer.valueOf(8),result.get(7));
    assertEquals(Integer.valueOf(9),result.get(8));
  }

  @Test
  public void printDFReverse()
  {
    Tree<Integer> tree = new Tree(new Integer[]{4, 2, 6, 8, 1, 9, 3, 7, 5});
    List<TreeNode<Integer>> result = new ArrayList<>();
    TreeCommon.printDFReverse(tree.root, result);

    assertEquals(9, result.size());

    assertEquals(Integer.valueOf(9), result.get(0).data);
    assertEquals(Integer.valueOf(8), result.get(1).data);
    assertEquals(Integer.valueOf(7), result.get(2).data);
    assertEquals(Integer.valueOf(6), result.get(3).data);
    assertEquals(Integer.valueOf(5), result.get(4).data);
    assertEquals(Integer.valueOf(4), result.get(5).data);
    assertEquals(Integer.valueOf(3), result.get(6).data);
    assertEquals(Integer.valueOf(2), result.get(7).data);
    assertEquals(Integer.valueOf(1), result.get(8).data);
  }

  @Test
  public void printDFIterative()
  {
    Tree<Integer> tree = new Tree(new Integer [] { 4, 2, 6, 8, 1, 9, 3, 7, 5});
    List<Integer> result = TreeCommon.printDFIterative(tree.root);
    assertEquals(9, result.size());

    assertEquals(Integer.valueOf(1),result.get(0));
    assertEquals(Integer.valueOf(2),result.get(1));
    assertEquals(Integer.valueOf(3),result.get(2));
    assertEquals(Integer.valueOf(4),result.get(3));
    assertEquals(Integer.valueOf(5),result.get(4));
    assertEquals(Integer.valueOf(6),result.get(5));
    assertEquals(Integer.valueOf(7),result.get(6));
    assertEquals(Integer.valueOf(8),result.get(7));
    assertEquals(Integer.valueOf(9),result.get(8));
  }

  @Test
  public void kthSmallest()
  {
    Tree<Integer> tree = new Tree(new Integer[]{4, 2, 6, 8, 1, 9, 3, 7, 5});
    assertEquals(Integer.valueOf(3), TreeCommon.kthSmallest(tree.root, 3));
  }

  @Test
  public void copyToList()
  {
    Tree<Integer> tree = new Tree(new Integer[]{4, 2, 6, 8, 1, 9, 3, 7, 5});
    List<TreeNode<Integer>> list = new ArrayList<>();
    int size = TreeCommon.copyToList(tree.root, list);
    assertEquals(9, size);
    assertEquals(Integer.valueOf(1), list.get(0).data);
    assertEquals(Integer.valueOf(2), list.get(1).data);
    assertEquals(Integer.valueOf(3), list.get(2).data);
    assertEquals(Integer.valueOf(4), list.get(3).data);
    assertEquals(Integer.valueOf(5), list.get(4).data);
    assertEquals(Integer.valueOf(6), list.get(5).data);
    assertEquals(Integer.valueOf(7), list.get(6).data);
    assertEquals(Integer.valueOf(8), list.get(7).data);
    assertEquals(Integer.valueOf(9), list.get(8).data);
  }
}