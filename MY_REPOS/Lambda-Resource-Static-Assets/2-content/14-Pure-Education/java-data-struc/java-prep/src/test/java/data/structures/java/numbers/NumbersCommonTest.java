package data.structures.java.numbers;

import org.junit.Test;

import static org.junit.Assert.*;

public class NumbersCommonTest
{

  @Test
  public void digitsInNumber()
  {
    int n = 12345678;
    assertEquals(8, NumbersCommon.digitsInNumber(n));
  }

  @Test
  public void numericStringToNum()
  {
    String test = "1234567";
    assertEquals(1234567, NumbersCommon.numericStringToNum(test));
  }

  @Test
  public void isPalindrome()
  {
    int n1 = 2345432, n2 = 123456;
    assertTrue(NumbersCommon.isPalindrome(n1));
    assertFalse(NumbersCommon.isPalindrome(n2));
  }

  @Test
  public void toBinary()
  {
    int n = 121;
    assertEquals("1111001", NumbersCommon.toBinary(n));
  }

  @Test
  public void squareRoot()
  {
    assertEquals(25, NumbersCommon.squareRoot(625));
    assertEquals(2, NumbersCommon.squareRoot(4));
  }

  @Test
  public void fibonacci1()
  {
    // n =	0	1	2	3	4	5	6	 7	8	 9	10	11	12	 13	 14
    //xn =	0	1	1	2	3	5	8	13 21	34	55 89	 144	233	377
    assertEquals(377, NumbersCommon.fibonacci1(14));
  }

  @Test
  public void fibonacci2()
  {
    assertEquals(377, NumbersCommon.fibonacci2(14));
  }

  @Test
  public void makeBiggestNumberFromIntArray()
  {
    assertEquals( 991773, NumbersCommon.makeBiggestNumberFromIntArray(new int[] {7, 9, 91, 73}));
  }

  @Test
  public void romanNumeral()
  {
    assertEquals("MMMMCMXCVIII", NumbersCommon.romanNumeral(4998));
  }

  @Test
  public void rand7usingRand5()
  {
    while(true ) {
      int num = NumbersCommon.rand7usingRand5();
      if (num == 6 || num == 7) {
        assertTrue(true);
        return;
      }
    }
  }


  @Test
  public void powerOfTen()
  {
    assertTrue(NumbersCommon.powerOfTen(1000000));
  }

}