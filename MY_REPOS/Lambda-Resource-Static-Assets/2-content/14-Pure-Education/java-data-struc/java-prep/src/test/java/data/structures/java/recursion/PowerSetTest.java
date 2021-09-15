package data.structures.java.recursion;

import org.junit.Test;

import java.util.Arrays;
import java.util.List;

import static org.junit.Assert.*;

public class PowerSetTest
{
  @Test
  public void powerSet()
  {
    PowerSet powerSet = new PowerSet("ABC");
    List<List<Character>> result = powerSet.powerSet();
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


  @Test
  public void genPowerSetWithBits()
  {
    List<char[]> powerSetList = PowerSet.genPowerSetWithBits("ABC");
    assertEquals(8, powerSetList.size());
    for(char[] x : powerSetList)
    {
      if(x.length == 3)
      {
        assertArrayEquals(x, new char[]{'A', 'B', 'C'});
      }
    }

  }
}