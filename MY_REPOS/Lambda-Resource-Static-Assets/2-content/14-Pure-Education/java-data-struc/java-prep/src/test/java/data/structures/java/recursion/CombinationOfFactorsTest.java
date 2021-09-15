package data.structures.java.recursion;

import org.junit.Test;

import java.util.List;

import static org.junit.Assert.*;

public class CombinationOfFactorsTest
{

  @Test
  public void combinations()
  {
    List<List<Integer>> result = CombinationOfFactors.combinations(16);
    assertEquals(4, result.size());
    assertArrayEquals(new int[] {2, 2, 2, 2}, result.get(0).stream().mapToInt(e -> e).toArray());
    assertArrayEquals(new int[] {2, 2, 4}, result.get(1).stream().mapToInt(e -> e).toArray());
    assertArrayEquals(new int[] {2, 8}, result.get(2).stream().mapToInt(e -> e).toArray());
    assertArrayEquals(new int[] {4, 4}, result.get(3).stream().mapToInt(e -> e).toArray());
  }
}