package data.structures.java.sort;

import org.junit.Test;

import static org.junit.Assert.*;

public class RadixSortTest
{

  @Test
  public void sort()
  {
    int [] a = { 170, 45, 75, 90, 802, 2, 66 };
    RadixSort radixSort = new RadixSort(a);
    assertArrayEquals( new int[] {2, 45, 66, 75, 90, 170, 802}, radixSort.sort());
  }
}