package data.structures.java.functional.numbers;

import org.junit.Test;

import java.util.List;
import java.util.Map;

import static org.junit.Assert.*;

public class GenPrimesTest
{

  @Test
  public void isPrime()
  {
    assertTrue(GenPrimes.isPrime(199));
    assertFalse(GenPrimes.isPrime(147));
  }

  @Test
  public void genPrimes()
  {
    assertArrayEquals(new int[] { 2, 3, 5, 7, 11, 13, 17},
        GenPrimes.genPrimes(18));
  }

  @Test
  public void partitionPrimesWithCustomCollector()
  {
    Map<Boolean, List<Integer>> map = GenPrimes.partitionPrimesWithCustomCollector(18);
    assertArrayEquals(new int[] { 2, 3, 5, 7, 11, 13, 17},
        map.get(true).stream().mapToInt(i -> i).toArray());
  }
}