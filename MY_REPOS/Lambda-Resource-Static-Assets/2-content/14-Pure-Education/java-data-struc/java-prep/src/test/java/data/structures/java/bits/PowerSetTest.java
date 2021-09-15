package data.structures.java.bits;

import org.junit.Test;

import java.util.Arrays;
import java.util.List;

import static org.junit.Assert.*;

public class PowerSetTest
{

  @Test
  public void generate()
  {
    PowerSet ps = new PowerSet("ABC");

    List<char[]> powerSetList = ps.generate();
    assertEquals(8, powerSetList.size());
    for(char[] x : powerSetList)
    {
      if(x.length == 3)
      {
        assertArrayEquals(x, new char[]{'A', 'B', 'C'});
      }
    }
  }

  @Test
  public void powerSetWithRecursion()
  {
    List<List<Character>> result = PowerSet.powerSetWithRecursion("ABC");
    assertEquals(8, result.size());
    assertEquals(Arrays.asList('A', 'B', 'C'), result.get(0));
    assertEquals(Arrays.asList('B', 'C'), result.get(1));
    assertEquals(Arrays.asList('A', 'C'), result.get(2));
    assertEquals(Arrays.asList('C'), result.get(3));
    assertEquals(Arrays.asList('A', 'B'), result.get(4));
    assertEquals(Arrays.asList('B'), result.get(5));
    assertEquals(Arrays.asList('A'), result.get(6));
    assertEquals(Arrays.asList(), result.get(7));

  }
}