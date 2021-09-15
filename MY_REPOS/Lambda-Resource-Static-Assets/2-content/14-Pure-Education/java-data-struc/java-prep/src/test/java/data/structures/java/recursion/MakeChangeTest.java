package data.structures.java.recursion;

import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.*;

public class MakeChangeTest
{
  @Test
  public void makeChangeWithLeastCoins()
  {
    MakeChange.ChangeWithLeastCoins changeWithLeastCoins = new MakeChange.ChangeWithLeastCoins(99, new int[] {10, 5, 1});
    assertEquals(14, changeWithLeastCoins.makeChange());
  }

  @Test
  public void makeChangeForKnownCurrency()
  {
    assertEquals(242, MakeChange.makeChangeForKnownCurrency(100, 25));
  }

  @Test
  public void makeChangeForAnyCurrency()
  {
    assertEquals(5, MakeChange.makeChangeForAnyCurrency(5, new int[] {1, 2, 3}));
  }

  @Test
  public void makeChangeAndPrint()
  {
    List<int[]> result = MakeChange.makeChangeAndPrint(5, new int[] {1, 2, 3});
    assertEquals(5, result.size());
    assertArrayEquals(new int[] {1, 1, 1, 1, 1}, result.get(0));
    assertArrayEquals(new int[] {2, 1, 1, 1}, result.get(1));
    assertArrayEquals(new int[] {2, 2, 1}, result.get(2));
    assertArrayEquals(new int[] {3, 1, 1}, result.get(3));
    assertArrayEquals(new int[] {3, 2}, result.get(4));
  }
}