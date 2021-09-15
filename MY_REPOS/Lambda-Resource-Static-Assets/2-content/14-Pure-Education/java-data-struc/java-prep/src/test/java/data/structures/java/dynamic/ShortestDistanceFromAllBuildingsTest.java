package data.structures.java.dynamic;

import data.structures.java.dynamic.ShortestDistanceFromAllBuildings;
import org.junit.Test;

import static org.junit.Assert.*;

public class ShortestDistanceFromAllBuildingsTest
{

  @Test
  public void shortestDistance()
  {
    int[][] data = {
        {1, 0, 2, 0, 1},
        {0, 0, 0, 0, 0},
        {0, 0, 1, 0, 0},
    };

    ShortestDistanceFromAllBuildings shortestDistanceFromBuildings = new ShortestDistanceFromAllBuildings(data);
    assertEquals(7, shortestDistanceFromBuildings.computeDistances());
  }
}