package data.structures.java.strings;

import org.junit.Assert;
import org.junit.Test;

import static org.junit.Assert.*;

public class StringsCommonTest
{
  @Test
  public void countWordsSeparatedByMultipleSpaces()
  {
    String test = "this  is   a t es   t";
    assertEquals(6, StringsCommon.countWordsSeparatedByMultipleSpaces(test));
  }

  @Test
  public void countWordsSeparatedByMultipleSpaces1()
  {
    String test = "this  is   a t es   t";
    assertEquals(6, StringsCommon.countWordsSeparatedByMultipleSpaces1(test));
  }

  @Test
  public void isUnique()
  {
    String allUnique = "abcdefghijklmnopq";
    String notAllUnique = "abcdefghidjklm";

    assertTrue(StringsCommon.isAllUnique(allUnique));
    assertFalse(StringsCommon.isAllUnique(notAllUnique));
  }

  @Test
  public void isAllUnique1()
  {
    String allUnique = "abcdefghijklmnopq";
    String notAllUnique = "abcdefghidjklm";

    assertTrue(StringsCommon.isAllUnique1(allUnique));
    assertFalse(StringsCommon.isAllUnique1(notAllUnique));
  }

  @Test
  public void isUniqueForLowerCase()
  {
    String s1 = "abcdefghijk", s2 = "abcdefgajk";

    Assert.assertTrue(StringsCommon.isAllUniqueForLowerCase(s1));
    assertFalse(StringsCommon.isAllUniqueForLowerCase(s2));
  }

  @Test
  public void removeChars()
  {
    String org = "Kill all vowels";
    String remove = "aeiou ";
    assertEquals("Kllllvwls", StringsCommon.removeChars(org, remove));
  }

  @Test
  public void removeChars1()
  {
    String org = "Kill all vowels";
    String remove = "aeiou ";
    assertEquals("Kllllvwls", StringsCommon.removeChars1(org, remove));
  }

  @Test
  public void isRotation()
  {
    String s1 = "abcdefgh";
    String s2 = "cdefghab";
    String s3 = "hgfedcba";
    assertTrue(StringsCommon.isRotation(s1, s2));
    assertTrue(StringsCommon.isRotation(s2, s1));
    assertFalse(StringsCommon.isRotation(s1, s3));
  }

  @Test
  public void lengthOfLongestUnique()
  {
    String test = "qwertyuiopqazxcvbnm";
    assertEquals(18, StringsCommon.lengthOfLongestUniqueSubstr(test));
  }

  @Test
  public void countAndSay()
  {
    assertEquals("111211", StringsCommon.countAndSay(121));
  }

  @Test
  public void numberToExcelColumn()
  {
    assertEquals("Z", StringsCommon.numberToExcelColumn(26));
    assertEquals("AY", StringsCommon.numberToExcelColumn(51));
    assertEquals("AZ", StringsCommon.numberToExcelColumn(52));
    assertEquals("CB", StringsCommon.numberToExcelColumn(80));
    assertEquals("YZ", StringsCommon.numberToExcelColumn(676));
    assertEquals("ZZ", StringsCommon.numberToExcelColumn(702));
    assertEquals("AAC", StringsCommon.numberToExcelColumn(705));
  }
}