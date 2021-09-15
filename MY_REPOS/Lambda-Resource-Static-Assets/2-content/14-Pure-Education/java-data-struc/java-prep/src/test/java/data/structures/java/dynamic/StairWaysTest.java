package data.structures.java.dynamic;

import org.junit.Test;

import static org.junit.Assert.*;

public class StairWaysTest
{

  @Test
  public void countWays()
  {
    assertEquals(274, StairWays.countWays(10));
  }

  @Test
  public void countWaysRecursive()
  {
    assertEquals(274, StairWays.countWaysRecursive(10));
  }
}