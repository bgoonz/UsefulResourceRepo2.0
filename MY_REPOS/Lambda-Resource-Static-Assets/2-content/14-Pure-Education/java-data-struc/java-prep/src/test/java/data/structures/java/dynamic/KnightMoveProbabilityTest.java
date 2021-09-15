package data.structures.java.dynamic;

import org.junit.Test;

import static org.junit.Assert.*;

public class KnightMoveProbabilityTest
{

  @Test
  public void computeProbability()
  {
    KnightMoveProbability knightMoveProbability = new KnightMoveProbability();
    assertEquals(0.25, knightMoveProbability.computeProbability(0, 0, 1), 0.0);
    assertEquals(0.0625, knightMoveProbability.computeProbability(0, 0, 2), 0.0);
    assertEquals(0.015625, knightMoveProbability.computeProbability(0, 0, 3), 0.0);
    //assertEquals(0.1875, knightMoveProbability.computeProbability(4, 4, 3), 0.0);
    //assertEquals(0.046875, knightMoveProbability.computeProbability(4, 4, 4), 0.0);
  }
}