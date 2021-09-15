package data.structures.java.sort;

import org.junit.Test;

import static org.junit.Assert.*;

public class BubbleSortTest
{

  @Test
  public void sort()
  {
    int [] input = new int[] {5, 2, 7, 0, 8, 3, 9, 1, 4, 6};
    BubbleSort bubbleSort = new BubbleSort(input);

    assertArrayEquals(new int[] {0, 1, 2, 3, 4, 5, 6, 7, 8, 9}, bubbleSort.sort());
  }
}