package data.structures.java.stacksqueues;

import org.junit.Test;

import java.util.Arrays;
import java.util.List;

import static org.junit.Assert.*;

public class IntervalsTest
{
  @Test
  public void mergeIntervals()
  {
    int [][] intervals = {
        {8,10},
        {1,3},
        {15,18},
        {7,8},
        {4,5},
        {2,6}
    };

    List<int[]> result = Intervals.mergeIntervals(intervals);
    assertEquals(3, result.size());

    for(int i = 0; i < 3; ++i)
    {
      int[] val = result.get(i);
      assertTrue(Arrays.equals(new int[] {1, 6}, val) ||
          Arrays.equals(new int[] {7, 10}, val) ||
          Arrays.equals(new int[] {15, 18}, val));
    }
  }

  @Test
  public void areaOverlappingRectangle()
  {
    int[][] r1 = {
        {1, 1},
        {4, 4},
    };
    int [][] r2 = {
        {3, 3},
        {6, 5},
    };
    assertEquals(1, Intervals.areaOverlappingRectangle(r1, r2));
  }

}