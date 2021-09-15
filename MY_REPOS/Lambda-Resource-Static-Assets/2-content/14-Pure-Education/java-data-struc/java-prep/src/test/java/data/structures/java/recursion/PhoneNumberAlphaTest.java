package data.structures.java.recursion;

import org.junit.Test;

import java.util.List;
import static org.junit.Assert.*;

public class PhoneNumberAlphaTest
{

  @Test
  public void generate()
  {
    int[] num = {2, 3};
    PhoneNumberAlpha phoneNumber = new PhoneNumberAlpha(num, 2);
    List<String> result = phoneNumber.generate();
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

  @Test
  public void generateIteratively()
  {
    int[] num = {2, 3};
    List<String> result = PhoneNumberAlpha.generateIteratively(num, 2);
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
}