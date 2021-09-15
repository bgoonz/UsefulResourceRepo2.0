package data.structures.java.heaps;

import org.junit.Test;

import static org.junit.Assert.*;

public class SumNSmallestTest
{

  @Test
  public void sumOfNSmallest()
  {
    assertEquals(6,
        SumNSmallest.sumOfNSmallest(new int[] {3, 9, 5, 0, 1, 8, 2, 7, 4, 6}, 4));
  }
}