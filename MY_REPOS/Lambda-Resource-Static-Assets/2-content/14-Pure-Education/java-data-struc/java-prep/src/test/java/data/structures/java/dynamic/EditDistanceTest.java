package data.structures.java.dynamic;

import org.junit.Test;

import static org.junit.Assert.*;

public class EditDistanceTest
{

  @Test
  public void editDistance()
  {
    String s1 = "saturday";
    String s2 = "sunday";
    assertEquals(3, EditDistance.editDistance(s1, s2));
  }

  @Test
  public void recursiveEditDistance()
  {
    String s1 = "saturday";
    String s2 = "sunday";
    assertEquals(3, EditDistance.recursiveEditDistance(s1, s2));
  }
}