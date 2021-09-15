package data.structures.java.recursion;

import org.junit.Test;

import static org.junit.Assert.*;

public class EditDistanceTest
{

  @Test
  public void editDistance()
  {
    String s1 = "sunday";
    String s2 = "saturday";
    assertEquals(3, EditDistance.editDistance(s1, s2));
    assertEquals(1, EditDistance.editDistance("sa", "s"));
    assertEquals(1, EditDistance.editDistance("s", "s1"));
  }

  @Test
  public void dynamicEditDistance()
  {
    String s1 = "sunday";
    String s2 = "saturday";
    assertEquals(3, EditDistance.editDistanceDynamic(s1, s2));

  }
}