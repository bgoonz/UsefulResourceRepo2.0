package data.structures.java.arrays;

import data.structures.java.arrays.MostCommonNumber;
import org.junit.Test;

import static org.junit.Assert.*;

public class MostCommonNumberTest
{
  @Test
  public void findMostCommon()
  {
    int[][] data = {
        {1, 6},
        {2, 5},
        {3, 8},
        {5, 7},
    };

    MostCommonNumber mostCommonNumber = new MostCommonNumber(data);
    assertEquals(5, mostCommonNumber.findMostCommon());
  }
}