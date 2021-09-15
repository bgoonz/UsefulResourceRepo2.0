package data.structures.java.recursion;

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
}