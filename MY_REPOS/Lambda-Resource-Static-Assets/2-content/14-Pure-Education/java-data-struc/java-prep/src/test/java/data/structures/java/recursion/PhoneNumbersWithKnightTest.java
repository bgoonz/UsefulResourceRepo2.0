package data.structures.java.recursion;

import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.*;

public class PhoneNumbersWithKnightTest
{

  @Test
  public void count10Digits()
  {
    PhoneNumbersWithKnight phoneNumbersWithKnight = new PhoneNumbersWithKnight(10);
    assertEquals(4608, phoneNumbersWithKnight.count(0, 0));
  }

  @Test
  public void count2Digits()
  {
    PhoneNumbersWithKnight phoneNumbersWithKnight = new PhoneNumbersWithKnight(2);
    assertEquals(6, phoneNumbersWithKnight.count(0, 0));
  }


  @Test
  public void count2AndPrint()
  {
    PhoneNumbersWithKnight phoneNumbersWithKnight = new PhoneNumbersWithKnight(2);
    List<String> result = phoneNumbersWithKnight.countAndKeep(0, 0);
    assertEquals(6, result.size());
    assertEquals("40", result.get(0));
    assertEquals("43", result.get(1));
    assertEquals("49", result.get(2));
    assertEquals("61", result.get(3));
    assertEquals("67", result.get(4));
    assertEquals("60", result.get(5));
  }

  @Test
  public void count3AndPrint()
  {
    PhoneNumbersWithKnight phoneNumbersWithKnight = new PhoneNumbersWithKnight(3);
    List<String> result = phoneNumbersWithKnight.countAndKeep(0, 0);
    assertEquals(12, result.size());
    assertEquals("404", result.get(0));
    assertEquals("406", result.get(1));
    assertEquals("434", result.get(2));
    assertEquals("438", result.get(3));
    assertEquals("492", result.get(4));
    assertEquals("494", result.get(5));
    assertEquals("616", result.get(6));
    assertEquals("618", result.get(7));
    assertEquals("672", result.get(8));
    assertEquals("676", result.get(9));
    assertEquals("604", result.get(10));
    assertEquals("606", result.get(11));
  }
}