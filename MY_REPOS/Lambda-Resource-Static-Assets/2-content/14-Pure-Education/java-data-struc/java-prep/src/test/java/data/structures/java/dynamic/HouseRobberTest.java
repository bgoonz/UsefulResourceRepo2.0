package data.structures.java.dynamic;

import org.junit.Test;

import static org.junit.Assert.*;

public class HouseRobberTest
{

  @Test
  public void houseRobber()
  {
    int[] data = {1, 2, 3, 4, 10, 5, 6, 4};
    assertEquals(20, HouseRobber.houseRobber(data));
  }
}