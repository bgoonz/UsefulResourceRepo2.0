package data.structures.java.recursion;

import org.junit.Test;

import java.util.List;

import static org.junit.Assert.*;

public class AddUptoNTest
{
  @Test
  public void combinations()
  {
    List<int[]> result = AddUptoN.combinations(5);
    assertEquals(7, result.size());
    assertArrayEquals(new int[] {1, 1, 1, 1, 1}, result.get(0));
    assertArrayEquals(new int[] {2, 1, 1, 1}, result.get(1));
    assertArrayEquals(new int[] {2, 2, 1}, result.get(2));
    assertArrayEquals(new int[] {3, 1, 1}, result.get(3));
    assertArrayEquals(new int[] {3, 2}, result.get(4));
    assertArrayEquals(new int[] {4, 1}, result.get(5));
    assertArrayEquals(new int[] {5}, result.get(6));
  }
}