package data.structures.java.numbers;

import data.structures.java.numbers.GCDForManyNumbers;
import org.junit.Test;

import static org.junit.Assert.*;

public class GCDForManyNumbersTest
{

  @Test
  public void gcd()
  {
    int [] a1 = {2, 3, 4, 5, 6};
    int [] a2 = {2, 4, 6, 8, 10};

    assertEquals(1, GCDForManyNumbers.gcd(a1));
    assertEquals(2, GCDForManyNumbers.gcd(a2));
  }
}