package data.structures.java.stacksqueues;

import data.structures.java.recursion.NSum;
import org.junit.Test;

import java.util.Arrays;
import java.util.List;

import static org.junit.Assert.*;

public class NSumTest
{

  @Test
  public void generateAllSums()
  {
    int [] data = {1, 3, 4, 5, 6, 8, 15};

    data.structures.java.recursion.NSum nSum = new NSum(data, 15);
    List<int[]> results = nSum.generateSubsets();

    assertEquals(5, results.size());

    for(int i = 0; i < 5; ++i)
    {
      int[] result = results.get(i);
      assertTrue(Arrays.equals(new int[] {15}, result) ||
          Arrays.equals(new int[] {1,3,5,6}, result) ||
          Arrays.equals(new int[] {1,6,8}, result) ||
          Arrays.equals(new int[] {3,4,8}, result) ||
          Arrays.equals(new int[] {4,5,6}, result));
    }

  }
}