package data.structures.java.trees;

import java.lang.reflect.Array;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;
import java.util.Stack;

public class FindMedian
{
  //  If number of nodes is:
  //  Odd:
  //    Median = TreeNode[(count + 1) / 2]
  //  Even:
  //    Median = (TreeNode[(count + 1) / 2] + TreeNode[count / 2]) / 2
  public static<T> int countNodesBF(TreeNode<T> root)
  {
    if(root == null)
    {
      return 0;
    }

    int count = 0;
    Queue<TreeNode> queue = new LinkedList<>();
    queue.add(root);
    while(!queue.isEmpty())
    {
      TreeNode node = queue.remove();
      count++;
      if(node.left != null)
      {
        queue.add(node.left);
      }
      if(node.right != null)
      {
        queue.add(node.right);
      }
    }
    return count;
  }

  static class IntWrapper
  {
    int value;
  }

  public static<T> int countNodesDF(TreeNode<T> root)
  {
    IntWrapper intWrapper = new IntWrapper();
    countNodesDF(root, intWrapper);
    return intWrapper.value;
  }

  private static<T> void countNodesDF(TreeNode<T> root, IntWrapper counter)
  {
    if(root == null)
    {
      return;
    }

    counter.value++;
    countNodesDF(root.left, counter);
    countNodesDF(root.right, counter);
  }

  private static<T> TreeNode<T> getKth(TreeNode<T> root, int k)
  {
    if(root == null)
    {
      return null;
    }

    Stack<TreeNode<T>> stack = new Stack<>();
    TreeNode<T> p = root;
    while(p != null || !stack.empty())
    {
      if(p != null)
      {
        stack.push(p);
        p = p.left;
      }
      else
      {
        p = stack.pop();
        k--;
        if(k == 0)
        {
          return p;
        }
        p = p.right;
      }
    }
    return null;
  }


  private static<T> TreeNode<T>[] asArray(Class<?> type, int size)
  {
    TreeNode<T>[] array = (TreeNode<T>[])Array.newInstance(type, size);
    return array;
  }

  public static<T> TreeNode<T>[] getMedian(TreeNode<T> root)
  {
    int count = countNodesDF(root);

    TreeNode<T>[] result;
    if(count % 2 == 1)
    {
      TreeNode<T> n1 = getKth(root, (count + 1) / 2);
      result = asArray(n1.getClass(), 1);
      result[0] = n1;
    }
    else
    {
      int mid1 = count / 2;
      int mid2 = mid1 + 1;
      TreeNode<T> n1 = getKth(root, mid1);
      TreeNode<T> n2 = getKth(root, mid2);
      result = asArray(n2.getClass(), 2);
      result[0] = n1;
      result[1] = n2;
    }

    return result;
  }
}
