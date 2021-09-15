package data.structures.java.strings;

import data.structures.java.strings.ShortestWordDistance;
import org.junit.Test;

import static org.junit.Assert.*;

public class ShortestWordDistanceTest
{

  @Test
  public void shortestDistance()
  {
    assertEquals(3, ShortestWordDistance.shortestDistance(
        new String[] {"practice", "makes", "perfect", "coding", "makes"},
        "coding", "practice"));
  }
}