package data.structures.java.dynamic;

import org.junit.Test;

import static org.junit.Assert.*;

public class MinPathSumTest
{
  @Test
  public void testMinPathSum()
  {
    int[][] data = {
        {1, 2, 0, 3},
        {0, 4, 3, 2},
        {0, 2, 1, 5},
        {3, 1, 0, 4}
    };

    MinPathSum mps = new MinPathSum(data);
    assertEquals(8, mps.minPathSum());
  }
}