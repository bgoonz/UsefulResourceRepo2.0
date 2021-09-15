package data.structures.java.dynamic;

import org.junit.Test;

import static org.junit.Assert.*;

public class RodCuttingTest
{

  @Test
  public void maxValue()
  {
    int[] prices = {1, 5, 8, 9};
    assertEquals(10, RodCutting.maxValue(prices));
  }

  @Test
  public void maxValueRecursion()
  {
    int[] prices = {1, 5, 8, 9};
    assertEquals(10, RodCutting.maxValueRecursion(prices));

  }
}