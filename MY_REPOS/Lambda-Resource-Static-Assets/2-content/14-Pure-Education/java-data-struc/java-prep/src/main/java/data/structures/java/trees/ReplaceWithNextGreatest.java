package data.structures.java.trees;

import java.util.concurrent.atomic.AtomicInteger;

public class ReplaceWithNextGreatest
{
  //  Replace every element of an array with the least greater element on its right
  /*
  Input:  { 10, 100, 93, 32, 35, 65, 80, 90, 94,  6 }
  Output: { 32, -1,  94, 35, 65, 80, 90, 94, -1, -1 }
  */

  private static TreeNode<Integer> insert(TreeNode<Integer> root, int key, AtomicInteger successor)
  {
    if(root == null)
    {
      return new TreeNode<>(key);
    }

    if(key < root.data)
    {
      successor.set(root.data);
      root.left = insert(root.left, key, successor);
    }
    else if(key > root.data)
    {
      root.right = insert(root.right, key, successor);
    }
    return root;
  }

  public static void findInorderSuccessor(int[] a)
  {
    TreeNode<Integer> root = null;
    for(int i = a.length - 1; i >= 0; --i)
    {
      AtomicInteger successor = new AtomicInteger(-1);
      root = insert(root, a[i], successor);
      a[i] = successor.get();
    }
  }
}
