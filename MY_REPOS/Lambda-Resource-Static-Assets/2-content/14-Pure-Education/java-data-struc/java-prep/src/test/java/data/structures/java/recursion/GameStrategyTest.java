package data.structures.java.recursion;

import org.junit.Test;

import static org.junit.Assert.*;

public class GameStrategyTest
{

  @Test
  public void optimalStrategy()
  {
    assertEquals(15, GameStrategy.optimalStrategy(new int[] {5, 3, 7, 10}));
    assertEquals(22, GameStrategy.optimalStrategy(new int[] {8, 15, 3, 7}));
  }
}