package data.structures.java.arrays;

import org.junit.Test;

import static junit.framework.Assert.assertEquals;

public class KthElementTest
{

  @Test
  public void kthLargestUsingSort()
  {
    int[] a = {9, 8, 7, 6, 5, 4, 3, 2, 1};
    assertEquals(6, KthElement.kthLargestUsingSort(a, 4));
  }

  @Test
  public void kthLargestUsingPriorityQueue()
  {
    int[] a = {9, 8, 7, 6, 5, 4, 3, 2, 1};
    assertEquals(6, KthElement.kthLargestUsingPriorityQueue(a, 4));
  }

  @Test
  public void kthSmallestUsingPriorityQueue()
  {
    int[] a = {9, 8, 7, 6, 5, 4, 3, 2, 1};
    assertEquals(4, KthElement.kthSmallestUsingPriorityQueue(a, 4));
  }

  @Test
  public void kthLargestUsingPartition()
  {
    //int[] a = {8, 3, 5, 7, 9, 0, 6, 2, 4, 1};
    //assertEquals(7, KthElement.kthLargestUsingPartition(a, 3));

  }

}