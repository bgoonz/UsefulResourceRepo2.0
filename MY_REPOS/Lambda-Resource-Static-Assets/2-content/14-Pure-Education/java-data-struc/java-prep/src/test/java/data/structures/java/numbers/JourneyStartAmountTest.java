package data.structures.java.numbers;

import org.junit.Test;

import static org.junit.Assert.*;

public class JourneyStartAmountTest
{

  @Test
  public void amountAtStartOfJourney()
  {
    assertEquals(1, JourneyStartAmount.amountAtStartOfJourney(new int[] { 10, -5, 7, -8, 5, -9 }));

  }
}