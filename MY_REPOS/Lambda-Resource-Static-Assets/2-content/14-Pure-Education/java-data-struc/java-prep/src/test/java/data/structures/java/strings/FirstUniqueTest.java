package data.structures.java.strings;

import org.junit.Test;

import static org.junit.Assert.*;

public class FirstUniqueTest
{


  @Test
  public void findFirstUnique()
  {
    assertEquals('d', FirstUnique.findFirstUnique("abcdabc"));
    assertEquals('a', FirstUnique.findFirstUnique("abcdefg"));
    assertEquals(0, FirstUnique.findFirstUnique("abcddcba"));
  }

  @Test
  public void findFirstUnique1()
  {
    assertEquals('d', FirstUnique.findFirstUnique1("abcdabc"));
    assertEquals('a', FirstUnique.findFirstUnique1("abcdefg"));
    assertEquals(0, FirstUnique.findFirstUnique1("abcddcba"));
  }
}