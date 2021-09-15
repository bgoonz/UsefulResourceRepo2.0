package data.structures.java.stacksqueues;

import org.junit.Test;

import static org.junit.Assert.*;

public class ShortestKnightWalkTest
{

  @Test
  public void walk()
  {
    ShortestKnightWalk knightWalk = new ShortestKnightWalk(new int[] {4, 5}, new int[] {0, 0});
    assertEquals(3, knightWalk.walk());
  }
}