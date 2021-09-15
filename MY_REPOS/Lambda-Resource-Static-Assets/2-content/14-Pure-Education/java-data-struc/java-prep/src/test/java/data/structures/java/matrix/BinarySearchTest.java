package data.structures.java.matrix;

import org.junit.Test;

import static org.junit.Assert.*;

public class BinarySearchTest
{

  @Test
  public void binarySearch()
  {
    int[][] data = {
        {1, 2, 3},
        {4, 5, 6},
        {7, 8, 9},
    };

    assertEquals(4, BinarySearch.binarySearch(data, 5));
    assertEquals(5, BinarySearch.binarySearch(data, 6));
    assertEquals(6, BinarySearch.binarySearch(data, 7));
    assertEquals(-1, BinarySearch.binarySearch(data, 0));
  }
}