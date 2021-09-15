package data.structures.java.recursion;

import org.junit.Test;

import static junit.framework.Assert.assertEquals;

public class BinarySearchTest
{

  @Test
  public void binarySearch()
  {
    int [] arr = {1, 3, 5, 7, 9, 11, 13, 15};
    int exists = BinarySearch.binarySearch(arr, 13);
    int notFound = BinarySearch.binarySearch(arr, 8);
    assertEquals(6, exists);
    assertEquals( -1, notFound);
  }

}