package data.structures.java.functional.numbers;

import org.junit.Test;

import static org.junit.Assert.*;

public class GeneralTest
{

  @Test
  public void generateRangeInReverse()
  {
    int[] reversed = General.generateRangeInReverse(1,10);
    assertArrayEquals(new int[] {10, 9, 8, 7, 6, 5, 4, 3, 2, 1}, reversed);
  }

  @Test
  public void generateRange()
  {
    int[] reversed = General.generateRange(1,10);
    assertArrayEquals(new int[] {1, 2, 3, 4, 5, 6, 7, 8, 9, 10}, reversed);
  }
}