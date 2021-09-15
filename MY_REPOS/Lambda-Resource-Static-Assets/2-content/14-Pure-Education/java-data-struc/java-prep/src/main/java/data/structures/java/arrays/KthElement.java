package data.structures.java.arrays;

import java.util.Arrays;
import java.util.Collections;
import java.util.PriorityQueue;

public class KthElement
{
  static int kthLargestUsingSort(int[] a, int k)
  {
    Arrays.sort(a);
    return a[a.length - k];
  }

  public static int kthLargestUsingPriorityQueue(int[] a, int k)
  {
    PriorityQueue<Integer> pq = new PriorityQueue<>();
    for(int v : a)
    {
      pq.offer(v);
      if(pq.size() > k)
      {
        pq.poll();
      }
    }
    return pq.peek();
  }

  public static int kthSmallestUsingPriorityQueue(int[] a, int k)
  {
    PriorityQueue<Integer> pq = new PriorityQueue<>(Collections.reverseOrder());
    for(int v : a)
    {
      pq.offer(v);
      if(pq.size() > k)
      {
        pq.poll();
      }
    }
    return pq.peek();
  }

  public static int kthLargestUsingPartition(int[] a, int k)
  {
    return getKth(k, a, 0, a.length - 1);
  }

  private static int getKth(int k, int[] arr, int start, int end)
  {
    int left = start;
    int right = end;
    int pivot = arr[(left + right) / 2];

    while(left <= right)
    {
      while(arr[left] < pivot) left++;
      while(arr[right] > pivot) right--;
      if(left <= right)
      {
        swap(arr, left++, right--);
      }
    }

    if(k == left + 1)
    {
      return pivot;
    }
    else if(k < left + 1)
    {
      return getKth(k, arr, start, left - 1);
    }
    else
    {
      return getKth(k, arr, left + 1, end);
    }
  }

  private static void swap(int[] data, int x, int y)
  {
    int tmp = data[x];
    data[x] = data[y];
    data[y] = tmp;
  }
}
