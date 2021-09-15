package data.structures.java.dynamic;

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
  public void longestCommonSubsequenceLengthRecursive()
  {
    String s1 = "abcdefg", s2 = "acefg";
    assertEquals(5, Subsequence.longestCommonSubsequenceLengthRecursive(s1, s2));
  }

  @Test
  public void longestIncreasingRun()
  {
    int[] arr = new int[] {3, 4, 5, 1, 2, 3, 4, 6, 2, 7};
    assertArrayEquals(new int[] {3, 7}, Subsequence.longestIncreasingRun(arr));
  }

  @Test
  public void longestIncreasingSubsequence()
  {
    int [] data = {10, 22, 9, 33, 21, 50, 41, 60, 80};
    assertEquals(6, Subsequence.longestIncreasingSubsequence(data));
  }

  @Test
  public void longestIncreasingSubsequenceRecursive()
  {
    int [] data = {10, 22, 9, 33, 21, 50, 41, 60, 80};
    assertEquals(6, Subsequence.longestIncreasingSubsequenceRecursive(data));
  }

  @Test
  public void longestCommonSubstring()
  {
    assertEquals("xyz", Subsequence.longestCommonSubstring("abxcxyze", "jxyzkl"));
    assertEquals("wxyz", Subsequence.longestCommonSubstring("abcdwxyz", "jklwxyz"));
  }

}