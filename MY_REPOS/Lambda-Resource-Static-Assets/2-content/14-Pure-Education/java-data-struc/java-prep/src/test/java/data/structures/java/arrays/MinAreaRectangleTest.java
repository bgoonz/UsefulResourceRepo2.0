package data.structures.java.arrays;

import org.junit.Test;

import static org.junit.Assert.*;

public class MinAreaRectangleTest
{

  @Test
  public void minArea()
  {
    int[][] points = {
        {2, 1},
        {2, 3},
        {3, 5},
        {5, 1},
        {5, 3},
        {7, 2},
        {8, 5},
        {2, 4},
        {2, 5},
        {5, 4},
        {5, 5},
    };
    assertEquals(3, MinAreaRectangle.minArea(points));
  }
}