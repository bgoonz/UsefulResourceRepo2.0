package data.structures.java.strings;

import org.junit.Test;

import static org.junit.Assert.*;

public class RemoveDupsTest
{

  @Test
  public void removeDups()
  {
    String s1 = "abcdacbdabcd";
    assertEquals("abcd", RemoveDups.removeDups(s1));
  }

  @Test
  public void removeDups1()
  {
    String s1 = "abcdacbdabcd";
    assertEquals("abcd", RemoveDups.removeDups1(s1));
  }


  @Test
  public void removeDupsInArray()
  {
    int[] arr = {3, 2, 6, 2, 1, 4, 6, 3};
    assertArrayEquals(new int[] {3, 2, 6, 1, 4}, RemoveDups.removeDups(arr));
  }

  @Test
  public void removeAdjacentDuplicates()
  {
    String org = "aaabbbbcccb";
    assertEquals("abcb", RemoveDups.removeAdjacentDuplicates(org));
  }

}