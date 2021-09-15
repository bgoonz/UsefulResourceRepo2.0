package data.structures.java.dynamic;

import org.junit.Test;

import static org.junit.Assert.*;

public class CandyTest
{
  @Test
  public void giveMinumumCandies()
  {
    Candy candy = new Candy(new int[] {2, 4, 2, 6, 1, 7, 8, 9, 2, 1});
    assertEquals(14, candy.giveMinimumCandies());
  }
}