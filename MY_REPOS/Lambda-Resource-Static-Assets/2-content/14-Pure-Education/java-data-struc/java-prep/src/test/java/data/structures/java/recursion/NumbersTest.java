package data.structures.java.recursion;

import org.junit.Test;

import static org.junit.Assert.*;

public class NumbersTest
{

  @Test
  public void add()
  {
    assertEquals( 55, Numbers.add(20, 35));
  }

  @Test
  public void multiply()
  {
    assertEquals(55, Numbers.multiply(5, 11));
  }

  @Test
  public void exponent()
  {
    assertEquals(8, Numbers.exponent(2, 3));
  }

  @Test
  public void gcd()
  {
    assertEquals( 12, Numbers.gcd(24, 36));
  }

  @Test
  public void isPowerOfTen()
  {
    assertTrue(Numbers.isPowerOfTen(1000000));
  }

  @Test
  public void toBinary()
  {
    int n = 121;
    StringBuilder sb = new StringBuilder();
    String result = Numbers.toBinary(n, sb);
    assertEquals("1111001", result);
  }
}