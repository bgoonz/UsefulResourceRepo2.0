package data.structures.java.strings;

import org.junit.Test;

import static org.junit.Assert.*;

public class PalindromeTest
{

  @Test
  public void isPalindrome()
  {
    String s1 = "abcddcba", s2 = "abcdcba", s3 = "abcdba";
    assertTrue(Palindrome.isPalindrome(s1));
    assertTrue(Palindrome.isPalindrome(s2));
    assertFalse(Palindrome.isPalindrome(s3));
  }

  @Test
  public void isPalindromeUsingStack()
  {
    String s1 = "abcddcba", s2 = "abcdcba", s3 = "abcdba";
    assertTrue(Palindrome.isPalindromeUsingStack(s1));
    assertTrue(Palindrome.isPalindromeUsingStack(s2));
    assertFalse(Palindrome.isPalindromeUsingStack(s3));
  }

  @Test
  public void lengthOfLongestPalindrome()
  {
    //  abcdedcba
    String test = "dfrabcdedcbaprewsg";
    assertEquals(9, Palindrome.lengthOfLongestPalindrome(test));
  }

  @Test
  public void longestPalindrome()
  {
    //  abcdedcba
    String test = "dfrabcdedcbaprewsg";
    assertEquals("abcdedcba", Palindrome.longestPalindrome(test));
  }

  @Test
  public void lengthOfShortestPalindrome()
  {
    String s = "abcd";
    assertEquals("dcbabcd", Palindrome.makeShortestPalindrome(s));

    s = "abc";
    assertEquals("cbabc", Palindrome.makeShortestPalindrome(s));

    s = "cbabcd";
    assertEquals("dcbabcd", Palindrome.makeShortestPalindrome(s));
  }

}