package data.structures.java.arrays;

import org.junit.Test;

import static org.junit.Assert.*;

public class DuplicatesAndMissingTest
{

  @Test
  public void duplicateInRange1ToN_1()
  {
    int [] arr = {4, 2, 1, 3, 2};
    assertEquals(2, DuplicatesAndMissing.duplicateInRange1ToN_1(arr));
  }

  @Test
  public void duplicateInRange0ToN_2()
  {
    int [] arr = {0, 2, 1, 3, 2};
    assertEquals(2, DuplicatesAndMissing.duplicateInRange0ToN_2(arr));
  }

  @Test
  public void missingNumber()
  {
    int [] arr = {4, 5, 6, 8, 9, 10, 11, 12, 13, 14};
    assertEquals(7, DuplicatesAndMissing.missingNumber(arr));
  }

  @Test
  public void removeAllDuplicates()
  {
    int[] arr = {3, 2, 6, 2, 1, 4, 6, 3};
    assertArrayEquals(new int[] {3, 2, 6, 1, 4}, DuplicatesAndMissing.removeAllDuplicates(arr));
  }

  @Test
  public void removeAllDuplicates1()
  {
    int[] arr = {3, 2, 6, 2, 1, 4, 6, 3};
    assertArrayEquals(new int[] {3, 2, 6, 1, 4}, DuplicatesAndMissing.removeAllDuplicates1(arr));
  }

  @Test
  public void removeAllDuplicatesInString()
  {
    String s = "abcabcabc";
    assertEquals("abc", DuplicatesAndMissing.removeAllDuplicates(s));
  }

  @Test
  public void getLonelyNumber()
  {
    int [] arr = {1, 1, 2, 2, 3, 4, 4, 5, 5};
    assertEquals(3, DuplicatesAndMissing.getLonelyNumber(arr));
  }

}