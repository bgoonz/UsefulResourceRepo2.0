package data.structures.java.recursion;

import org.junit.Test;

import static org.junit.Assert.*;

public class StairWalkTest
{

  @Test
  public void countWaysToGoUpStairs1()
  {
    assertEquals(1, StairWalk.countWays1(0));
    assertEquals(1, StairWalk.countWays1(1));
    assertEquals(2, StairWalk.countWays1(2));
    assertEquals(4, StairWalk.countWays1(3));
    assertEquals(274, StairWalk.countWays1(10));
  }

  @Test
  public void countWaysToGoUpStairs2()
  {
    assertEquals(1, StairWalk.countWays2(0));
    assertEquals(1, StairWalk.countWays2(1));
    assertEquals(2, StairWalk.countWays2(2));
    assertEquals(4, StairWalk.countWays2(3));
    assertEquals(274, StairWalk.countWays2(10));
  }

  @Test
  public void countWaysDynamic()
  {
    assertEquals(1, StairWalk.countWaysDynamic(0));
    assertEquals(1, StairWalk.countWaysDynamic(1));
    assertEquals(2, StairWalk.countWaysDynamic(2));
    assertEquals(4, StairWalk.countWaysDynamic(3));
    assertEquals(274, StairWalk.countWaysDynamic(10));
  }
}