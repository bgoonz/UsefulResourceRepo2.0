package data.structures.java.numbers;

import org.junit.Test;

import static org.junit.Assert.*;

public class FractionToDecimalTest
{

  @Test
  public void fractionToDecimal()
  {
    assertEquals("0.(571428)", FractionToDecimal.fractionToDecimal(4, 7));
    assertEquals("0.(3)", FractionToDecimal.fractionToDecimal(1, 3));
  }
}