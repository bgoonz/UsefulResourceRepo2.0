package data.structures.java.recursion;

import org.junit.Test;

import java.util.Arrays;
import java.util.List;

import static org.junit.Assert.*;

public class NSumTest
{

  @Test
  public void generateSubset()
  {
    int [] data = {15, 8, 6, 5, 4, 3, 1};

    NSum nSum = new NSum(data, 15);
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

  @Test
  public void nSum()
  {
    assertEquals(5, NSum.nSum(new int[]{15, 8, 6, 5, 4, 3, 1}, 15));
  }
}