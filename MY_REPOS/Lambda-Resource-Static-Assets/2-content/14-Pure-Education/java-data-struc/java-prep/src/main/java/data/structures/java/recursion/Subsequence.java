package data.structures.java.recursion;

import data.structures.java.strings.PatternMatch;

public class Subsequence
{
  public static boolean patternMatch(String str, String pat)
  {
    return PatternMatch.subsequenceMatch(str, pat);
  }

  // -----------------------------------------------------------------------------------------
  // -----------------------------------------------------------------------------------------
  // -----------------------------------------------------------------------------------------

  public static int longestCommonSubsequenceLength(String s1, String s2)
  {
    //  For example, "abc", "abg", "bdf", "aeg", "acefg", .. etc are subsequences of "abcdefg"
    //  If last characters of two strings match,
    //    L(n, m) = 1 + L(0..n-1, 0..m-1)
    //  If last characters to not match
    //    L(n, m) = MAX(L(0..n-1, 0..m), L(0..n, 0..m-1)
    return longestCommonSubsequenceLength(s1.toCharArray(), s2.toCharArray(), s1.length(), s2.length());
  }

  private static int longestCommonSubsequenceLength(char[] a1, char[] a2, int len1, int len2)
  {
    if(len1 == 0 || len2 == 0)
    {
      return 0;
    }

    if(a1[len1 - 1] == a2[len2 - 1])
    {
      return 1 + longestCommonSubsequenceLength(a1, a2, len1 - 1, len2 - 1);
    }
    else
    {
      return Math.max(longestCommonSubsequenceLength(a1, a2, len1 - 1, len2),
          longestCommonSubsequenceLength(a1, a2, len1, len2 - 1));
    }
  }

  public static int longestCommonSubsequenceLengthDynamic(String s1, String s2)
  {
    return data.structures.java.dynamic.Subsequence.longestCommonSubsequenceLength(s1, s2);
  }

  // -----------------------------------------------------------------------------------
  public static String longestCommonSubsequence(String s1, String s2)
  {
    return longestCommonSubsequence(s1.toCharArray(), s2.toCharArray(), s1.length(), s2.length());
  }

  private static String longestCommonSubsequence(char[] a1, char[] a2, int len1, int len2)
  {
    if(len1 == 0 || len2 == 0)
    {
      return "";
    }

    if(a1[len1 - 1] == a2[len2 - 1])
    {
      return longestCommonSubsequence(a1, a2, len1 - 1, len2 - 1) + a1[len1 - 1];
    }
    else
    {
      String s1 = longestCommonSubsequence(a1, a2, len1 - 1, len2);
      String s2 = longestCommonSubsequence(a1, a2, len1, len2 - 1);
      return s1.length() > s2.length() ? s1 : s2;
    }
  }
// ===================================================================================
// ===================================================================================
// ===================================================================================

  public static int longestIncreasingSubsequence(int[] a)
  {
    //  See DP solution to this problem which is easier to understand
    //  Longest Increasing Subsequence (LIS):
    //  {10, 22, 9, 33, 21, 50, 41, 60, 80} -> {10, 22, 33, 50, 60, 80}, LIS = 6
    IntWrapper max = new IntWrapper();
    longestIncreasingSubsequence(a, a.length, max);
    return max.value;
  }

  static class IntWrapper
  {
    int value;
  }

  private static int longestIncreasingSubsequence(int[] a, int len, IntWrapper totalMax)
  {
    if(len == 1)
    {
      return 1;
    }

    int result = 0;
    int max = 1;

    for(int i = 1; i < len; ++i)
    {
      result = longestIncreasingSubsequence(a, i, totalMax);
      if(a[i - 1] < a[len - 1] && result + 1 > max)
      {
        max = result + 1;
      }
    }

    totalMax.value = Math.max(totalMax.value, max);

    return max;
  }


  public static int longestIncreasingSubsequenceDynamic(int[] a)
  {
    return data.structures.java.dynamic.Subsequence.longestIncreasingSubsequence(a);
  }
}
