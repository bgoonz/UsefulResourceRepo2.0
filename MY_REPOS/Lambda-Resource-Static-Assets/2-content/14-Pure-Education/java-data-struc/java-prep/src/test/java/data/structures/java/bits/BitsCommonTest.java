package data.structures.java.bits;

import org.junit.Test;

import static org.junit.Assert.*;

public class BitsCommonTest
{

  @Test
  public void polarity()
  {
    assertEquals(3, BitsCommon.polarity(7));
  }

  @Test
  public void isUniqueAllLowerCase()
  {
    String s1 = "abcdefghijk", s2 = "abcdefgajk";

    assertTrue(BitsCommon.isUniqueAllLowerCase(s1));
    assertFalse(BitsCommon.isUniqueAllLowerCase(s2));
  }

  @Test
  public void max()
  {
    assertEquals(3, BitsCommon.max(3, -40));
    assertEquals(20, BitsCommon.max( 2, 20));
    assertEquals( -5, BitsCommon.max(-9, -5));
  }
}