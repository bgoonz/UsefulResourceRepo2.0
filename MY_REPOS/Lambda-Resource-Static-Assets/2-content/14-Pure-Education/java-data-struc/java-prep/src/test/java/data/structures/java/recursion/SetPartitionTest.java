package data.structures.java.recursion;

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
  public void findMinDifferenceHeaps()
  {
    assertEquals(1, SetPartition.findMinDifferenceHeaps(new int[] {1, 6, 11, 5}));
    assertEquals(2, SetPartition.findMinDifferenceHeaps(new int[] {3, 8, 2, 5}));
    assertEquals(0, SetPartition.findMinDifferenceHeaps(new int[] {4, 1, 3, 2}));
  }

  @Test
  public void partitionWithEqualSums()
  {
    assertEquals(true, SetPartition.partitionWithEqualSums(new int[] {1, 5, 11, 5}));
  }

}