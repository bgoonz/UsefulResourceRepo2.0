package data.structures.java.heaps;

import org.junit.Test;

import static org.junit.Assert.*;

public class FindMedianTest
{

  @Test
  public void getMedian()
  {
    FindMedian findMedian = new FindMedian(new int[] {3, 9, 5, 0, 1, 8, 2, 7, 4, 6});
    findMedian.populate();
    assertEquals(4.5, findMedian.getMedian(), 0.0);
  }
}