package data.structures.java.dynamic;

import org.junit.Test;

import static org.junit.Assert.*;

public class RainWaterTest
{
  @Test
  public void trapAllRainWater()
  {
    int [] ar = {0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1};
    assertEquals(6, RainWater.trapAllRainWater(ar));

  }

  @Test
  public void containerWithMostWater()
  {
    int [] ar = {2, 3, 5, 3, 4, 3, 6, 3};
    assertEquals(20, RainWater.containerWithMostWater(ar));
  }
}