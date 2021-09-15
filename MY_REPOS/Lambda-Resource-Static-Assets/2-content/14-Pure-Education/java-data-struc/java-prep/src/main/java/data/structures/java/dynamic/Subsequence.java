package data.structures.java.dynamic;

import java.util.Arrays;

public class Subsequence
{
  public static int longestCommonSubsequenceLength(String s1, String s2)
  {
    //  For example, "abc", "abg', "bdf", "aeg", "acefg", .. etc are subsequences of "abcdefg"
  /*
      a b c d e f g
    0 1 2 3 4 5 6 7
  a 1
  c 2
  e 3
  f 4
  g 5
   */
    return longestCommonSubsequenceLength(s1.toCharArray(), s2.toCharArray(), s1.length(), s2.length());
  }

  private static int longestCommonSubsequenceLength(char[] a1, char[] a2, int len1, int len2)
  {
    int[][] dp = new int[len1 + 1][len2 + 1];

    for(int i = 1; i <= len1; ++i)
    {
      for(int j = 1; j <= len2; ++j)
      {
        if(a1[i - 1] == a2[j - 1])
        {
          dp[i][j] = dp[i - 1][j - 1] + 1;
        }
        else
        {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
      }
    }
    return dp[len1][len2];
  }

  public static int longestCommonSubsequenceLengthRecursive(String s1, String s2)
  {
    return data.structures.java.recursion.Subsequence.longestCommonSubsequenceLength(s1, s2);
  }

  //  =========================================================================================
  //  =========================================================================================
  //  =========================================================================================
  public static int[] longestIncreasingRun(int[] a)
  {
    //  Longest Increasing Run:
    //  {3, 4, 5, 1, 2, 3, 4, 6, 2, 7} - from index 3 to index 7
    int[] dp = new int[a.length];
    dp[0] = 1;

    for (int i = 1; i < a.length; ++i)
    {
      if (a[i] > a[i - 1])
      {
        dp[i] = dp[i - 1] + 1;
      }
      else
      {
        dp[i] = 1;
      }
    }

    int maxVal = Integer.MIN_VALUE, maxIndex = Integer.MIN_VALUE;
    for (int i = 0; i < dp.length; ++i)
    {
      if (dp[i] > maxVal)
      {
        maxVal = dp[i];
        maxIndex = i;
      }
    }

    int minIndex = maxIndex - maxVal + 1;

    return new int[] {minIndex, maxIndex};
  }


  //  =========================================================================================
  //  =========================================================================================
  //  =========================================================================================
  public static int longestIncreasingSubsequence(int[] a)
  {
    //  Longest Increasing Subsequence:
    //  {10, 22, 9, 33, 21, 50, 41, 60, 80} -> {10, 22, 33, 50, 60, 80}
    //  DP array
    //  Initial state:
    //  {1, 1, 1, 1, 1, 1, 1, 1, 1}
    //  Final State
    //  Data: {10, 22, 9, 33, 21, 50, 41, 60, 80}
    //  DP:   { 1,  2, 1,  3,  2,  4,  4,  5,  6}
    //  Construct DP array by hand to figure out the logic.
    int [] dp = new int[a.length];

    Arrays.fill(dp, 1);

    for(int i = 1; i < a.length; ++i)
    {
      for(int j = 0; j < i; ++j)
      {
        if(a[i] > a[j] && dp[i] <= dp[j])
        {
          dp[i] = dp[j] + 1;
        }
      }
    }

    return Arrays.stream(dp).max().getAsInt();
  }

  public static int longestIncreasingSubsequenceRecursive(int[] a)
  {
    return data.structures.java.recursion.Subsequence.longestIncreasingSubsequence(a);
  }

  //  =========================================================================================
  //  =========================================================================================
  //  =========================================================================================
  public static String longestCommonSubstring(String s1, String s2)
  {
    //  Finds a common substring in two strings, for example:
    //  Strings: "abxcxyze" and "jxyzkl" have "xyz" in common.
    int len1 = s1.length();
    int len2 = s2.length();

    int[][] dp = new int[len1][len2];

    boolean matchFound = false;
    for(int i = 0; i < len1; ++i)
    {
      for(int j = 0; j < len2; ++j)
      {
        if(s1.charAt(i) == s2.charAt(j))
        {
          dp[i][j] = 1;
          matchFound = true;
        }
      }
    }

    if(!matchFound)
    {
      return null;
    }

    int max = 0;
    int xPos = -1;
    for(int i = 0; i < dp.length; ++i)
    {
      for(int j = 0; j < dp[0].length; ++j)
      {
        if(dp[i][j] == 1)
        {
          int len = 1;
          for(int m = 1; m < dp.length - i; ++m)
          {
            if(dp[i + m][j + m] == 1)
            {
              len++;
            }
            else
            {
              break;
            }
          }
          if(len > max)
          {
            max = len;
            xPos = i;
          }
        }
      }
    }

    return s1.substring(xPos, xPos + max);
  }
}
