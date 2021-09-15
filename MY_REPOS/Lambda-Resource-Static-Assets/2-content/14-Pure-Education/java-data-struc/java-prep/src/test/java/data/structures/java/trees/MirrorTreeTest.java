package data.structures.java.trees;

import org.junit.Test;

import static org.junit.Assert.*;

public class MirrorTreeTest
{

  @Test
  public void mirrorDFS()
  {
    TreeNode<Integer> n1 = new TreeNode<>(1);
    TreeNode<Integer> n2 = new TreeNode<>(2);
    TreeNode<Integer> n3 = new TreeNode<>(3);
    TreeNode<Integer> n4 = new TreeNode<>(4);
    TreeNode<Integer> n5 = new TreeNode<>(5);

    n1.left = n3;
    n1.right = n2;
    n2.left = n5;
    n2.right = n4;

    MirrorTree.mirrorDFS(n1);

    assertEquals(Integer.valueOf(2), n1.left.data);
    assertEquals(Integer.valueOf(3), n1.right.data);
    assertEquals(Integer.valueOf(4), n2.left.data);
    assertEquals(Integer.valueOf(5), n2.right.data);
  }

  @Test
  public void mirrorBFS()
  {
    TreeNode<Integer> n1 = new TreeNode<>(1);
    TreeNode<Integer> n2 = new TreeNode<>(2);
    TreeNode<Integer> n3 = new TreeNode<>(3);
    TreeNode<Integer> n4 = new TreeNode<>(4);
    TreeNode<Integer> n5 = new TreeNode<>(5);

    n1.left = n3;
    n1.right = n2;
    n2.left = n5;
    n2.right = n4;

    MirrorTree.mirrorBFS(n1);

    assertEquals(Integer.valueOf(2), n1.left.data);
    assertEquals(Integer.valueOf(3), n1.right.data);
    assertEquals(Integer.valueOf(4), n2.left.data);
    assertEquals(Integer.valueOf(5), n2.right.data);
  }
}