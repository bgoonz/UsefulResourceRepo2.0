package data.structures.java.numbers;

import org.junit.Test;

import static org.junit.Assert.*;

public class PrimesTest
{

  @Test
  public void isPrime()
  {
    assertTrue(Primes.isPrime(199));
    assertFalse(Primes.isPrime(147));
    assertFalse(Primes.isPrime(9));

  }

  @Test
  public void genPrimes()
  {
    assertArrayEquals(new int[] { 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61},
        Primes.genPrimes(18));
    assertEquals(0, Primes.genPrimes(0).length);
  }
}