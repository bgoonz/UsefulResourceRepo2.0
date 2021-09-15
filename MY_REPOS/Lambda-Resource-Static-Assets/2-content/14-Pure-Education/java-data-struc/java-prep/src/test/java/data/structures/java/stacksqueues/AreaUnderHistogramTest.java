package data.structures.java.stacksqueues;

import data.structures.java.stacksqueues.AreaUnderHistogram;
import org.junit.Test;

import static org.junit.Assert.*;

public class AreaUnderHistogramTest
{

  @Test
  public void compute()
  {
    int[] ar1 = {2, 1};
    AreaUnderHistogram areaUnderHistogram = new AreaUnderHistogram(ar1);
    assertEquals(2, areaUnderHistogram.compute());


    int[] ar2 = {2, 1, 5, 6, 2, 3};
    areaUnderHistogram = new AreaUnderHistogram(ar2);
    assertEquals(10, areaUnderHistogram.compute());

    int[] ar3 = {6, 2, 5, 4, 5, 2, 6};
    areaUnderHistogram = new AreaUnderHistogram(ar3);
    assertEquals(14, areaUnderHistogram.compute());

    int[] ar4 = {2, 3, 5, 6, 2, 3};
    areaUnderHistogram = new AreaUnderHistogram(ar4);
    assertEquals(12, areaUnderHistogram.compute());
  }
}