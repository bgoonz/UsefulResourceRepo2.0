package data.structures.java.trees;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class BSTFromArray
{
  private int[] data;

  public BSTFromArray(int[] data)
  {
    this.data = data;
  }

  public TreeNode<Integer> createBST()
  {
    Arrays.sort(data);
    return createBST(data, 0, data.length - 1);
  }

  private TreeNode<Integer> createBST(int[] arr, int start, int end)
  {
    if(end < start)
    {
      return null;
    }

    int mid = (start + end) / 2;
    TreeNode<Integer> root = new TreeNode(arr[mid]);
    root.left = createBST(arr, start, mid - 1);
    root.right = createBST(arr, mid + 1, end);
    return root;
  }
}
