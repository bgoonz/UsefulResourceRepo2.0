package data.structures.java.dynamic;

import org.junit.Test;

import static org.junit.Assert.*;

public class ApplyDiscountTest
{

  @Test
  public void totalAfterDiscounts()
  {
    assertEquals(8, ApplyDiscount.totalAfterDiscounts(new int[] {2, 3, 1, 2, 4, 2}));
  }
}