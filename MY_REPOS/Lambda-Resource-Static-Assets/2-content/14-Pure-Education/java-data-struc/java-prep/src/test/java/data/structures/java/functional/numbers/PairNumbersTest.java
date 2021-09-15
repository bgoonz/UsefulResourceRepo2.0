package data.structures.java.functional.numbers;

import org.junit.Test;

import java.util.List;

import static org.junit.Assert.*;

public class PairNumbersTest
{

  @Test
  public void pairNumbers()
  {
    int [] a1 = {1, 2, 3};
    int [] a2 = {3, 4};

    List<int[]> result = PairNumbers.pairNumbers(a1, a2);
    assertEquals(6, result.size());
    assertArrayEquals(new int[] {1, 3}, result.get(0));
    assertArrayEquals(new int[] {1, 4}, result.get(1));
    assertArrayEquals(new int[] {2, 3}, result.get(2));
    assertArrayEquals(new int[] {2, 4}, result.get(3));
    assertArrayEquals(new int[] {3, 3}, result.get(4));
    assertArrayEquals(new int[] {3, 4}, result.get(5));
  }
}