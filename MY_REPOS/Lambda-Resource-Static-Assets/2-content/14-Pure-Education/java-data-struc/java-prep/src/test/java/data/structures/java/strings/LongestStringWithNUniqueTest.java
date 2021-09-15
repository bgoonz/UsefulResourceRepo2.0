package data.structures.java.strings;

import org.junit.Test;

import static org.junit.Assert.*;

public class LongestStringWithNUniqueTest
{

  @Test
  public void longestSubstringLengthWith2Unique()
  {
    //"abcbbbbcccbdddadacb" -> "bcbbbbcccb"
    assertEquals(10, LongestStringWithNUnique.longestSubstringLengthWithNUnique("abcbbbbcccbdddadacb", 2));
  }

  @Test
  public void longestSubstringWithNUnique()
  {
    assertEquals("bcbbbbcccb", LongestStringWithNUnique.longestSubstringWithNUnique("abcbbbbcccbdddadacb", 2));
    assertEquals("xxxyyy", LongestStringWithNUnique.longestSubstringWithNUnique("abcbbxxxyyybdddadacb", 2));
    assertEquals("cadcacacaca", LongestStringWithNUnique.longestSubstringWithNUnique("abcadcacacaca", 3));
  }


}