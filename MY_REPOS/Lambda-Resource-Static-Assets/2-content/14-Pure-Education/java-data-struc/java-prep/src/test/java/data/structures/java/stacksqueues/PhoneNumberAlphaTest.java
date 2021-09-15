package data.structures.java.stacksqueues;

import org.junit.Test;

import java.util.List;

import static org.junit.Assert.*;

public class PhoneNumberAlphaTest
{
  @Test
  public void generateCombinations()
  {
    PhoneNumberAlpha phoneNumberAlpha = new PhoneNumberAlpha(new int[] {2, 3});
    List<String> result = phoneNumberAlpha.generateCombinations();
    assertEquals(9, result.size());
    assertEquals("ad", result.get(0));
    assertEquals("ae", result.get(1));
    assertEquals("af", result.get(2));
    assertEquals("bd", result.get(3));
    assertEquals("be", result.get(4));
    assertEquals("bf", result.get(5));
    assertEquals("cd", result.get(6));
    assertEquals("ce", result.get(7));
    assertEquals("cf", result.get(8));
  }

  @Test
  public void generateCombinationsRecursive()
  {
    List<String> result = PhoneNumberAlpha.letterCombinationsRecursive(new int[] {2, 3}, 2);
    assertEquals(9, result.size());
    assertEquals("AD", result.get(0));
    assertEquals("AE", result.get(1));
    assertEquals("AF", result.get(2));
    assertEquals("BD", result.get(3));
    assertEquals("BE", result.get(4));
    assertEquals("BF", result.get(5));
    assertEquals("CD", result.get(6));
    assertEquals("CE", result.get(7));
    assertEquals("CF", result.get(8));
  }
}