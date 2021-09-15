package data.structures.java.heaps;

import org.junit.Test;

import static org.junit.Assert.*;

public class SetPartitionTest
{

  @Test
  public void findMinDifference()
  {
    assertEquals(1, SetPartition.findMinDifference(new int[] {1, 6, 11, 5}));
    assertEquals(2, SetPartition.findMinDifference(new int[] {3, 8, 2, 5}));
    assertEquals(0, SetPartition.findMinDifference(new int[] {4, 1, 3, 2}));
  }

  @Test
  public void findMinDifferenceRecursive()
  {
    assertEquals(1, SetPartition.findMinDifferenceRecursive(new int[] {1, 6, 11, 5}));
    assertEquals(2, SetPartition.findMinDifferenceRecursive(new int[] {3, 8, 2, 5}));
    assertEquals(0, SetPartition.findMinDifferenceRecursive(new int[] {4, 1, 3, 2}));
  }
}