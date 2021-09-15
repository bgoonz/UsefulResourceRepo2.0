package data.structures.java.recursion;

import org.junit.Test;

import static org.junit.Assert.*;

public class SubsequenceTest
{
  @Test
  public void longestCommonSubsequenceLength()
  {
    String s1 = "abcdefg", s2 = "acefg";
    assertEquals(5, Subsequence.longestCommonSubsequenceLength(s1, s2));
  }

  @Test
  public void longestCommonSubsequenceLengthDynamic()
  {
    String s1 = "abcdefg", s2 = "acefg";
    assertEquals(5, Subsequence.longestCommonSubsequenceLengthDynamic(s1, s2));
  }

  @Test
  public void longestCommonSubsequence()
  {
    String s1 = "abcdefg", s2 = "acefg";
    assertEquals("acefg", Subsequence.longestCommonSubsequence(s1, s2));
  }


  @Test
  public void longestIncreasingSubsequence()
  {
    int [] data = {10, 22, 9, 33, 21, 50, 41, 60, 80};
    assertEquals(6, Subsequence.longestIncreasingSubsequence(data));
  }

  @Test
  public void longestIncreasingSubsequenceDynamic()
  {
    int [] data = {10, 22, 9, 33, 21, 50, 41, 60, 80};
    assertEquals(6, Subsequence.longestIncreasingSubsequenceDynamic(data));
  }

  @Test
  public void patternMatch()
  {
    String test = "Hello world", pat = "lo wo";
    assertTrue(Subsequence.patternMatch(test, pat));
  }
}